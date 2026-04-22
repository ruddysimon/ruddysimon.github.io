/**
 * Build-time embedder for Ask Simon.
 *
 * Reads content/simon.md, splits into chunks by `##` headings, sends each
 * chunk to OpenAI text-embedding-3-small, and writes the result to
 * public/ask-simon.json so the serverless API route can cosine-search it.
 *
 * Usage:  npm run embed
 * Requires: OPENAI_API_KEY in .env.local
 */

import { config as loadEnv } from "dotenv";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import OpenAI from "openai";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// Load .env.local first (Vite convention), then fall back to .env.
loadEnv({ path: resolve(ROOT, ".env.local") });
loadEnv({ path: resolve(ROOT, ".env") });

const MODEL = "text-embedding-3-small"; // 1536-dim, $0.02 / 1M tokens
const SOURCE_FILE = resolve(ROOT, "content/simon.md");
const OUT_FILE = resolve(ROOT, "public/ask-simon.json");

type Chunk = {
  id: string;
  title: string;
  text: string;
  embedding: number[];
};

function chunkMarkdown(md: string): { title: string; text: string }[] {
  // Split on lines that start with exactly `## ` (h2). Drop the file intro.
  const sections = md.split(/\n## /g);
  // sections[0] is the preamble before the first ##
  const out: { title: string; text: string }[] = [];
  for (let i = 1; i < sections.length; i++) {
    const raw = sections[i].trim();
    if (!raw) continue;
    const newlineIdx = raw.indexOf("\n");
    const title = (newlineIdx === -1 ? raw : raw.slice(0, newlineIdx)).trim();
    const body = (newlineIdx === -1 ? "" : raw.slice(newlineIdx + 1))
      .replace(/\n{3,}/g, "\n\n")
      .trim();
    if (!body) continue;
    out.push({ title, text: `## ${title}\n\n${body}` });
  }
  return out;
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.error("✗ OPENAI_API_KEY missing. Add it to .env.local.");
    process.exit(1);
  }

  console.log(`→ reading ${SOURCE_FILE}`);
  const md = await readFile(SOURCE_FILE, "utf8");
  const sections = chunkMarkdown(md);
  console.log(`→ found ${sections.length} sections`);

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  // Single batched call — OpenAI embeddings accept up to 2048 inputs per call.
  console.log(`→ embedding with ${MODEL}`);
  const inputs = sections.map((s) => s.text);
  const resp = await client.embeddings.create({ model: MODEL, input: inputs });

  const chunks: Chunk[] = resp.data.map((d, i) => ({
    id: `chunk-${i}`,
    title: sections[i].title,
    text: sections[i].text,
    embedding: d.embedding,
  }));

  const payload = {
    model: MODEL,
    dim: chunks[0]?.embedding.length ?? 0,
    generatedAt: new Date().toISOString(),
    chunks,
  };

  await mkdir(dirname(OUT_FILE), { recursive: true });
  await writeFile(OUT_FILE, JSON.stringify(payload));

  const kb = (JSON.stringify(payload).length / 1024).toFixed(1);
  console.log(`✓ wrote ${OUT_FILE}`);
  console.log(`  ${chunks.length} chunks · ${payload.dim} dims · ${kb} KB`);
  console.log(`  estimated token cost: <$0.001`);
}

main().catch((err) => {
  console.error("✗ embed failed:", err);
  process.exit(1);
});
