import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

type Msg = { from: "bot" | "me"; text: string; id: number };

// Simple keyword-based responder. Swap with a real API later.
function respond(input: string): string {
  const t = input.toLowerCase();
  if (/hi|hello|hey/.test(t)) return "hey 👋 — what do you want to know about Ruddy?";
  if (/what.*(do|does)/.test(t) || /who.*ruddy/.test(t))
    return "Ruddy is a Data Scientist at Rivo Holdings. He designs, trains, and deploys ML systems for lending decisions — end-to-end, from data pipelines to production APIs.";
  if (/(project|work|build|model)/.test(t))
    return "His flagship: a BERT-based NLP pipeline that detects payroll transactions from raw bank text, paired with rule-based logic for pay-frequency verification. Lands at 85–90% accuracy.";
  if (/(stack|tech|tool|language)/.test(t))
    return "Python · SQL · Tableau · XGBoost · CatBoost · BERT · Flask · React · LangChain · Azure. Comfortable across the full ML lifecycle.";
  if (/(contact|email|reach|hire)/.test(t))
    return "Easiest way: ruddy.simonpour@gmail.com. Or open the Contact app — LinkedIn + GitHub are linked there.";
  if (/(experience|job|company|rivo|palo alto|usd)/.test(t))
    return "4 roles: Data Scientist @ Rivo (current), Data Analyst I @ Rivo, Data Analyst @ USD, AI/Data Analyst Intern @ City of Palo Alto. Open the Experience app for the full record.";
  if (/(book|read|learn|library)/.test(t))
    return "Check the Library app — currently reading ISL (Statistical Learning) and NLP with Transformers.";
  if (/(resume|cv|pdf)/.test(t)) return "Grab it: open the resume.pdf app on the desktop — one-page download.";
  return "Interesting question. Try asking about his projects, tech stack, or experience — or open a desktop app for the details.";
}

export default function ChatbotApp() {
  const [messages, setMessages] = useState<Msg[]>([
    { from: "bot", text: "Hi, I'm Simon. Ask me anything about Ruddy's work, projects, or experience.", id: 1 },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(2);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const myId = idRef.current++;
    setMessages((m) => [...m, { from: "me", text: trimmed, id: myId }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      const botId = idRef.current++;
      setMessages((m) => [...m, { from: "bot", text: respond(trimmed), id: botId }]);
      setThinking(false);
    }, 600 + Math.random() * 500);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-3 border-b border-ink/15 bg-cream-soft">
        <div className="text-sm font-semibold leading-tight">Simon</div>
        <div className="text-[10px] text-ink-soft">usually replies in seconds · keyword-based demo</div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-auto p-4 space-y-3 win-scroll">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[78%] text-[13px] leading-relaxed px-3 py-2 rounded-md border ${
                m.from === "me"
                  ? "bg-accent text-cream border-accent"
                  : "bg-cream-soft text-ink border-ink/15"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {thinking && (
          <div className="flex justify-start">
            <div className="bg-cream-soft border border-ink/15 rounded-md px-3 py-2 flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-ink/50 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-ink/50 animate-bounce" style={{ animationDelay: "0.15s" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-ink/50 animate-bounce" style={{ animationDelay: "0.3s" }} />
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); send(input); }}
        className="flex gap-2 p-3 border-t border-ink/15 bg-cream-soft"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Simon…"
          className="flex-1 px-3 py-2 text-sm rounded-sm bg-surface border border-ink/20 outline-none focus:border-accent"
        />
        <button type="submit" className="btn-os" disabled={!input.trim()}>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
