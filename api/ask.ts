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

import OpenAI from "openai";
import kbData from "../public/ask-simon.json";

export const config = { runtime: "nodejs" };

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

/* ---------- Cosine similarity ---------- */
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

/* ---------- System prompt ---------- */
const SYSTEM_PROMPT = `You are **Simon**, the Ask-Simon assistant for Ruddy Simonpour's portfolio.

You answer questions from visitors about Ruddy — his work, projects, experience, skills, interests, and how to contact him.

Rules:
- Answer ONLY from the context provided below. If the context doesn't cover it, say so honestly ("I don't have that in my notes — you could ask Ruddy directly at ruddy.simonpour@gmail.com") instead of guessing.
- Be concise and direct. 1–3 short paragraphs or a tight bullet list is usually enough.
- Use a warm, first-person-adjacent tone — refer to Ruddy by name or as "he", never as "I".
- Don't fabricate numbers, dates, company names, or technologies. If a user asks for something specific you can't find, admit it.
- When relevant, point the visitor to specific apps in the portfolio (Projects, Experience, Books, Contact) or to Ruddy's email/LinkedIn.
- No preamble ("Great question!" etc.). Just answer.`;

/* ---------- HTTP handler ---------- */
export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  if (!process.env.OPENAI_API_KEY) {
    return json({ error: "Server missing OPENAI_API_KEY" }, 500);
  }

  let body: { question?: string; history?: Msg[] };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const question = (body.question ?? "").trim();
  if (!question || question.length > 1000) {
    return json({ error: "Question is required (max 1000 chars)" }, 400);
  }
  const history = Array.isArray(body.history) ? body.history.slice(-6) : [];

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  // 1. Embed query + retrieve top-k
  const embedResp = await openai.embeddings.create({
    model: EMBED_MODEL,
    input: question,
  });
  const queryVec = embedResp.data[0].embedding;
  const retrieved = topK(queryVec, kb, TOP_K);

  const contextBlock = retrieved
    .map((c, i) => `[${i + 1}] ${c.text}`)
    .join("\n\n---\n\n");

  // 2. Build the user turn with context prepended
  const userTurn =
    `Context from Ruddy's portfolio knowledge base:\n\n${contextBlock}\n\n` +
    `---\nVisitor's question: ${question}`;

  const messages = [
    { role: "system" as const, content: SYSTEM_PROMPT },
    ...history.map((m) => ({ role: m.role, content: m.content })),
    { role: "user" as const, content: userTurn },
  ];

  // 3. Stream GPT's response as a plain text stream
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        const response = await openai.chat.completions.create({
          model: CHAT_MODEL,
          max_tokens: MAX_TOKENS,
          messages,
          stream: true,
        });
        for await (const chunk of response) {
          const delta = chunk.choices[0]?.delta?.content;
          if (delta) controller.enqueue(encoder.encode(delta));
        }
        controller.close();
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        controller.enqueue(encoder.encode(`\n\n[error: ${msg}]`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
