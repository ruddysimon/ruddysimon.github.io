/**
 * Client-side helper for the Ask Simon API.
 * Streams the response back token-by-token via an async iterator.
 */

export type AskMessage = { role: "user" | "assistant"; content: string };

type AskOptions = {
  question: string;
  history?: AskMessage[];
  signal?: AbortSignal;
};

export async function* askSimon({
  question,
  history = [],
  signal,
}: AskOptions): AsyncGenerator<string, void, unknown> {
  const resp = await fetch("/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, history }),
    signal,
  });

  if (!resp.ok) {
    let detail = "";
    try {
      detail = (await resp.json()).error ?? "";
    } catch {}
    throw new Error(detail || `Request failed (${resp.status})`);
  }
  if (!resp.body) throw new Error("No response body");

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    if (value) yield decoder.decode(value, { stream: true });
  }
}
