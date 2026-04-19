import { useEffect, useRef } from "react";
import { LogOut } from "lucide-react";
import { useWM, AppId } from "./WindowManager";

const LAUNCH_ORDER: AppId[] = [
  "about",
  "experience",
  "projects",
  "books",
  "travel",
  "games",
  "resume",
  "contact",
  "chatbot",
  "terminal",
  "settings",
];

export default function StartMenu({
  open,
  onClose,
  anchorRef,
}: {
  open: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLButtonElement>;
}) {
  const { apps, openApp } = useWM();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (ref.current?.contains(t)) return;
      if (anchorRef.current?.contains(t)) return;
      onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, anchorRef]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="fixed z-[10002] flex"
      style={{
        left: 4,
        bottom: 46,
        background: "hsl(var(--cream))",
        border: "2px solid hsl(var(--bevel-light))",
        borderRightColor: "hsl(var(--bevel-dark))",
        borderBottomColor: "hsl(var(--bevel-dark))",
        boxShadow: "2px 2px 0 0 hsl(var(--ink) / 0.45)",
        fontFamily: "var(--font-win98)",
        minWidth: 240,
      }}
    >
      {/* Left banner */}
      <div
        className="flex items-end justify-start"
        style={{
          width: 28,
          background: "linear-gradient(180deg, hsl(var(--ink)) 0%, hsl(var(--ink-soft)) 100%)",
          color: "hsl(var(--cream-soft))",
          padding: "8px 0",
        }}
      >
        <div
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            fontFamily: "var(--font-win98)",
            fontSize: "14px",
            fontWeight: 700,
            letterSpacing: "0.04em",
            paddingLeft: 6,
            paddingBottom: 8,
          }}
        >
          Ruddy<span style={{ fontWeight: 400 }}>OS</span>
        </div>
      </div>

      {/* Menu list */}
      <div className="flex-1 py-1" style={{ background: "hsl(var(--cream))" }}>
        {LAUNCH_ORDER.map((id) => {
          const app = apps[id];
          if (!app) return null;
          const Icon = app.icon;
          return (
            <button
              key={id}
              onClick={() => {
                openApp(id);
                onClose();
              }}
              className="group w-full flex items-center gap-3 px-3 py-1.5 text-left"
              style={{
                fontFamily: "var(--font-win98)",
                fontSize: "13px",
                color: "hsl(var(--ink))",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "hsl(var(--ink))";
                e.currentTarget.style.color = "hsl(var(--cream))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "hsl(var(--ink))";
              }}
            >
              <Icon className="w-4 h-4" />
              <span>{app.title}</span>
            </button>
          );
        })}

        <div
          style={{
            height: 1,
            margin: "4px 6px",
            background: "hsl(var(--bevel-dark))",
            borderBottom: "1px solid hsl(var(--bevel-light))",
          }}
        />
        <button
          onClick={() => {
            onClose();
            alert("You can't really shut down RuddyOS — just close the tab.");
          }}
          className="w-full flex items-center gap-3 px-3 py-1.5 text-left"
          style={{
            fontFamily: "var(--font-win98)",
            fontSize: "13px",
            color: "hsl(var(--ink))",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "hsl(var(--ink))";
            e.currentTarget.style.color = "hsl(var(--cream))";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "hsl(var(--ink))";
          }}
        >
          <LogOut className="w-4 h-4" />
          <span>Shut Down…</span>
        </button>
      </div>
    </div>
  );
}
