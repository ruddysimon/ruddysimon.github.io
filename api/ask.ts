/**
 * Vercel serverless function — Ask Simon backend.
 *
 * Pipeline:
 *   1. Receive { question, history } from the browser.
 *   2. Embed the question with OpenAI text-embedding-3-small.
 *   3. Cosine-search in-memory against public/ask-simon.json (top-k).
 *   4. Build a grounded system prompt + context block.
 *   5. Stream GPT-4o-mini's answer back as a plain text stream.
 *
 * Env vars required (Vercel dashboard → Settings → Environment Variables):
 *   OPENAI_API_KEY  — used for both embeddings and chat
 */

import { createRequire } from "node:module";
import type { IncomingMessage, ServerResponse } from "node:http";
import OpenAI from "openai";

export const config = { runtime: "nodejs" };

const require = createRequire(import.meta.url);
const kbData = require("../public/ask-simon.json");

type Chunk = {
  id: string;
  title: string;
  text: string;
  embedding: number[];
};

type KnowledgeBase = {
  model: string;
  dim: number;
  generatedAt: string;
  chunks: Chunk[];
};

type Msg = { role: "user" | "assistant"; content: string };

const TOP_K = 4;
const EMBED_MODEL = "text-embedding-3-small";
const CHAT_MODEL = "gpt-4o-mini";
const MAX_TOKENS = 600;

const kb = kbData as KnowledgeBase;

function cosine(a: number[], b: number[]): number {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB) || 1);
}

function topK(queryVec: number[], kb: KnowledgeBase, k: number): Chunk[] {
  return kb.chunks
    .map((c) => ({ c, score: cosine(queryVec, c.embedding) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map((x) => x.c);
}

const SYSTEM_PROMPT = `You are **Simon**, the Ask-Simon assistant for Ruddy Simonpour's portfolio.

You answer questions from visitors about Ruddy — his work, projects, experience, skills, interests, and how to contact him.

Rules:
- Answer ONLY from the context provided below. If the context doesn't cover it, say so honestly ("I don't have that in my notes — you could ask Ruddy directly at ruddy.simonpour@gmail.com") instead of guessing.
- Be concise and direct. 1–3 short paragraphs or a tight bullet list is usually enough.
- Use a warm, first-person-adjacent tone — refer to Ruddy by name or as "he", never as "I".
- Don't fabricate numbers, dates, company names, or technologies. If a user asks for something specific you can't find, admit it.
- When relevant, point the visitor to specific apps in the portfolio (Projects, Experience, Books, Contact) or to Ruddy's email/LinkedIn.
- No preamble ("Great question!" etc.). Just answer.`;

async function readBody(req: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const c of req) chunks.push(c as Buffer);
  return Buffer.concat(chunks).toString("utf8");
}

function sendJson(res: ServerResponse, status: number, data: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== "POST") return sendJson(res, 405, { error: "Method not allowed" });
  if (!process.env.OPENAI_API_KEY) return sendJson(res, 500, { error: "Server missing OPENAI_API_KEY" });

  let body: { question?: string; history?: Msg[] };
  try {
    const raw = await readBody(req);
    body = raw ? JSON.parse(raw) : {};
  } catch {
    return sendJson(res, 400, { error: "Invalid JSON" });
  }

  const question = (body.question ?? "").trim();
  if (!question || question.length > 1000) {
    return sendJson(res, 400, { error: "Question is required (max 1000 chars)" });
  }
  const history = Array.isArray(body.history) ? body.history.slice(-6) : [];

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const embedResp = await openai.embeddings.create({ model: EMBED_MODEL, input: question });
  const queryVec = embedResp.data[0].embedding;
  const retrieved = topK(queryVec, kb, TOP_K);

  const contextBlock = retrieved.map((c, i) => `[${i + 1}] ${c.text}`).join("\n\n---\n\n");
  const userTurn =
    `Context from Ruddy's portfolio knowledge base:\n\n${contextBlock}\n\n` +
    `---\nVisitor's question: ${question}`;

  const messages = [
    { role: "system" as const, content: SYSTEM_PROMPT },
    ...history.map((m) => ({ role: m.role, content: m.content })),
    { role: "user" as const, content: userTurn },
  ];

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Accel-Buffering", "no");

  try {
    const response = await openai.chat.completions.create({
      model: CHAT_MODEL,
      max_tokens: MAX_TOKENS,
      messages,
      stream: true,
    });
    for await (const chunk of response) {
      const delta = chunk.choices[0]?.delta?.content;
      if (delta) res.write(delta);
    }
    res.end();
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    res.write(`\n\n[error: ${msg}]`);
    res.end();
  }
}
