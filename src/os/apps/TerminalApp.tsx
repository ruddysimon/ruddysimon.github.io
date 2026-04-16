import { useEffect, useRef, useState } from "react";

type Line = { kind: "in" | "out"; text: string };

const HELP = `Available commands:
  whoami      — who is this
  skills      — tech stack
  open <app>  — about | experience | projects | books | resume | contact | settings
  clear       — clear the screen
  help        — this message`;

export default function TerminalApp() {
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: "RuddyOS terminal v1.0" },
    { kind: "out", text: "Type 'help' to get started." },
  ]);
  const [input, setInput] = useState("");
  const viewRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    viewRef.current?.scrollTo({ top: viewRef.current.scrollHeight });
  }, [lines]);

  const run = (cmd: string) => {
    const c = cmd.trim();
    const push = (text: string) => setLines((p) => [...p, { kind: "out", text }]);
    setLines((p) => [...p, { kind: "in", text: c }]);

    if (!c) return;
    const [head, ...rest] = c.split(/\s+/);

    switch (head) {
      case "help": push(HELP); break;
      case "whoami": push("ruddy — data scientist @ rivo holdings. san diego."); break;
      case "skills": push("python · sql · tableau · xgboost · bert · flask · react · langchain"); break;
      case "clear": setLines([]); break;
      case "open": {
        const target = rest[0];
        const valid = ["about","experience","projects","books","resume","contact","settings"];
        if (!valid.includes(target)) { push(`unknown app: ${target || "(empty)"}`); break; }
        window.dispatchEvent(new CustomEvent("ruddyos:open", { detail: target }));
        push(`opening ${target}…`);
        break;
      }
      default: push(`command not found: ${head}. try 'help'.`);
    }
  };

  return (
    <div
      className="font-mono text-xs bg-ink text-cream h-full flex flex-col cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={viewRef} className="flex-1 overflow-auto p-4 space-y-1 win-scroll">
        {lines.map((l, i) => (
          <pre key={i} className="whitespace-pre-wrap leading-relaxed">
            {l.kind === "in" ? (
              <><span className="text-accent">ruddy@os</span> <span className="opacity-60">~</span> $ {l.text}</>
            ) : (
              l.text
            )}
          </pre>
        ))}
        <div className="flex items-center gap-1 pt-1">
          <span className="text-accent">ruddy@os</span>
          <span className="opacity-60">~</span>
          <span>$</span>
          <input
            ref={inputRef}
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { run(input); setInput(""); }
            }}
            className="flex-1 bg-transparent outline-none text-cream caret-accent"
          />
          <span className="blink text-accent">▊</span>
        </div>
      </div>
    </div>
  );
}
