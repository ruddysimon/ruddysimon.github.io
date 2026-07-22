import { useEffect, useRef, useState } from "react";
import { Send, Square } from "lucide-react";
import { askSimon, AskMessage } from "@/lib/askSimon";

type Msg = {
  id: number;
  role: "user" | "assistant";
  content: string;
  error?: boolean;
};

const SUGGESTIONS = [
  "What's Ruddy working on right now?",
  "Tell me about the BERT project",
  "How do I contact him?",
  "What's his tech stack?",
];

export default function ChatbotApp() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Hi, I'm Ruddy. I can help you explore my work, background, and the best way to get in touch.",
    },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(2);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, streaming]);

  const stop = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    setStreaming(false);
  };

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;

    const userId = idRef.current++;
    const botId = idRef.current++;

    // Build the history snapshot BEFORE appending the new user turn.
    const history: AskMessage[] = messages
      .filter((m) => !m.error)
      .map((m) => ({ role: m.role, content: m.content }))
      .slice(-6);

    setMessages((m) => [
      ...m,
      { id: userId, role: "user", content: trimmed },
      { id: botId, role: "assistant", content: "" },
    ]);
    setInput("");
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      let acc = "";
      for await (const chunk of askSimon({
        question: trimmed,
        history,
        signal: controller.signal,
      })) {
        acc += chunk;
        setMessages((m) =>
          m.map((msg) => (msg.id === botId ? { ...msg, content: acc } : msg))
        );
      }
    } catch (err: unknown) {
      const isAbort = err instanceof DOMException && err.name === "AbortError";
      if (!isAbort) {
        const msg = err instanceof Error ? err.message : "Something went wrong.";
        setMessages((m) =>
          m.map((x) =>
            x.id === botId
              ? { ...x, content: `Couldn't reach the assistant — ${msg}`, error: true }
              : x
          )
        );
      }
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  };

  const firstTurn = messages.length === 1;

  return (
    <div className="flex flex-col h-full" style={{ background: "hsl(var(--cream-soft))" }}>
      {/* A quiet status rail keeps the window title as the single Simon label. */}
      <div
        className="px-4 py-2 flex items-center justify-between"
        style={{
          background: "hsl(var(--cream))",
          borderBottom: "1px solid hsl(var(--bevel-dark))",
          fontFamily: "var(--font-win98)",
        }}
      >
        <span
          style={{
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: "hsl(var(--ink-soft))",
          }}
        >
          PORTFOLIO GUIDE
        </span>
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 is-round"
            style={{
              background: streaming ? "#E33" : "#2FA82F",
              boxShadow: `0 0 0 3px ${streaming ? "rgb(227 51 51 / 0.12)" : "rgb(47 168 47 / 0.12)"}`,
            }}
          />
          <span style={{ fontSize: "10px", fontWeight: 600, color: "hsl(var(--ink-soft))" }}>
            {streaming ? "typing" : "online"}
          </span>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto px-4 py-4 space-y-3 win-scroll"
        style={{ fontFamily: "var(--font-win98)", fontSize: "13px" }}
      >
        {messages.map((m, i) => (
          <Bubble key={m.id} msg={m} showCursor={streaming && i === messages.length - 1} />
        ))}
      </div>

      {/* Suggestion chips */}
      {firstTurn && !streaming && (
        <div className="px-4 pb-3 flex flex-wrap gap-1.5">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="px-2.5 py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--accent))]"
              style={{
                fontFamily: "var(--font-win98)",
                fontSize: "11px",
                background: "hsl(var(--cream))",
                color: "hsl(var(--ink))",
                border: "1px solid hsl(var(--ink) / 0.25)",
                boxShadow: "2px 2px 0 hsl(var(--ink) / 0.12)",
                cursor: "pointer",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex gap-2 p-3"
        style={{
          background: "hsl(var(--cream))",
          borderTop: "1px solid hsl(var(--bevel-dark))",
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={streaming}
          placeholder={streaming ? "Thinking…" : "Ask about Ruddy's work…"}
          className="flex-1 px-3 py-2 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[hsl(var(--accent))]"
          style={{
            fontFamily: "var(--font-win98)",
            fontSize: "13px",
            background: "hsl(var(--cream-soft))",
            color: "hsl(var(--ink))",
            border: "2px solid hsl(var(--bevel-dark))",
            borderRightColor: "hsl(var(--bevel-light))",
            borderBottomColor: "hsl(var(--bevel-light))",
          }}
        />
        {streaming ? (
          <button
            type="button"
            onClick={stop}
            className="flex items-center gap-1.5 px-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--accent))]"
            style={{
              fontFamily: "var(--font-win98)",
              fontSize: "12px",
              background: "hsl(var(--cream))",
              color: "hsl(var(--ink))",
              border: "2px solid hsl(var(--bevel-light))",
              borderRightColor: "hsl(var(--bevel-dark))",
              borderBottomColor: "hsl(var(--bevel-dark))",
              cursor: "pointer",
            }}
          >
            <Square className="w-3 h-3" fill="currentColor" />
            Stop
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim()}
            className="flex items-center gap-1.5 px-3 disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--accent))]"
            style={{
              fontFamily: "var(--font-win98)",
              fontSize: "12px",
              background: "hsl(var(--ink))",
              color: "hsl(var(--cream))",
              border: "2px solid hsl(var(--bevel-light))",
              borderRightColor: "hsl(var(--bevel-dark))",
              borderBottomColor: "hsl(var(--bevel-dark))",
              cursor: input.trim() ? "pointer" : "not-allowed",
            }}
          >
            <Send className="w-3 h-3" />
            Ask
          </button>
        )}
      </form>
    </div>
  );
}

function Bubble({ msg, showCursor }: { msg: Msg; showCursor: boolean }) {
  const isUser = msg.role === "user";
  const isWelcome = msg.id === 1;
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className="max-w-[86%] px-3 py-2.5 leading-relaxed whitespace-pre-wrap"
        style={{
          background: isUser
            ? "hsl(var(--ink))"
            : msg.error
            ? "hsl(0 50% 92%)"
            : "hsl(var(--cream))",
          color: isUser ? "hsl(var(--cream))" : "hsl(var(--ink))",
          border: `2px solid ${isUser ? "hsl(var(--ink))" : "hsl(var(--bevel-light))"}`,
          borderRightColor: isUser ? "hsl(var(--ink))" : "hsl(var(--bevel-dark))",
          borderBottomColor: isUser ? "hsl(var(--ink))" : "hsl(var(--bevel-dark))",
          boxShadow: isUser ? "2px 2px 0 hsl(var(--ink) / 0.18)" : "3px 3px 0 hsl(var(--ink) / 0.1)",
        }}
      >
        {isWelcome && (
          <div
            className="mb-2 flex items-center gap-2"
            aria-hidden="true"
            style={{ color: "hsl(var(--ink-soft))" }}
          >
            <span
              className="block w-1.5 h-1.5 is-round"
              style={{ background: "hsl(var(--accent))" }}
            />
            <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em" }}>
              START HERE
            </span>
          </div>
        )}
        {msg.content ? <MessageText content={msg.content} /> : showCursor ? <Thinking /> : ""}
        {msg.content && showCursor && <BlinkCursor />}
      </div>
    </div>
  );
}

const MARKDOWN_LINK = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

function MessageText({ content }: { content: string }) {
  const parts = content.split(MARKDOWN_LINK);

  return (
    <>
      {parts.map((part, index) => {
        const position = index % 3;

        if (position === 2) return null;
        if (position === 1 && parts[index + 1]) {
          return (
            <a
              key={`${part}-${index}`}
              href={parts[index + 1]}
              target="_blank"
              rel="noreferrer"
              style={{
                color: "inherit",
                fontWeight: 700,
                textDecoration: "underline",
                textDecorationColor: "hsl(var(--accent))",
                textDecorationThickness: "2px",
                textUnderlineOffset: "2px",
              }}
            >
              {part}
            </a>
          );
        }

        return <span key={`${part}-${index}`}>{part}</span>;
      })}
    </>
  );
}

function Thinking() {
  return (
    <span className="inline-flex items-center gap-1">
      <Dot delay={0} />
      <Dot delay={0.15} />
      <Dot delay={0.3} />
    </span>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <span
      className="w-1.5 h-1.5 rounded-full"
      style={{
        background: "hsl(var(--ink) / 0.5)",
        animation: "askSimonBounce 1s ease-in-out infinite",
        animationDelay: `${delay}s`,
        display: "inline-block",
      }}
    />
  );
}

function BlinkCursor() {
  return (
    <>
      <span
        aria-hidden
        style={{
          display: "inline-block",
          width: "0.5em",
          height: "1em",
          marginLeft: "2px",
          verticalAlign: "-0.15em",
          background: "currentColor",
          animation: "askSimonBlink 1s steps(2, end) infinite",
        }}
      />
      <style>{`
        @keyframes askSimonBlink { 50% { opacity: 0 } }
        @keyframes askSimonBounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
}
