import { useEffect, useRef, useState } from "react";
import { useWM } from "./WindowManager";
import StartMenu from "./StartMenu";

function WinLogo() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" shapeRendering="crispEdges" aria-hidden>
      <rect x="1" y="2"  width="6" height="5" fill="#E33" />
      <rect x="8" y="2"  width="6" height="5" fill="#2FA82F" />
      <rect x="1" y="8"  width="6" height="5" fill="#1D4FD8" />
      <rect x="8" y="8"  width="6" height="5" fill="#E6A400" />
      <rect x="0" y="2"  width="1" height="11" fill="hsl(var(--ink))" opacity="0.25" />
      <rect x="1" y="7"  width="13" height="1" fill="hsl(var(--cream))" />
      <rect x="7" y="2"  width="1" height="11" fill="hsl(var(--cream))" />
    </svg>
  );
}

export default function Taskbar() {
  const { apps, windows, focusWindow, toggleMinimize, activeId } = useWM();
  const [now, setNow] = useState(new Date());
  const [startOpen, setStartOpen] = useState(false);
  const startBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 15 * 1000);
    return () => clearInterval(t);
  }, []);

  const time = now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  const weekday = now.toLocaleDateString(undefined, { weekday: "short" });
  const date = now.toLocaleDateString(undefined, { month: "short", day: "numeric" });

  const sorted = [...windows].sort((a, b) => a.id.localeCompare(b.id));

  return (
    <>
      <StartMenu open={startOpen} onClose={() => setStartOpen(false)} anchorRef={startBtnRef} />

      <div
        className="fixed bottom-0 inset-x-0 z-[10001] flex items-center gap-1.5 px-1.5"
        style={{
          height: 42,
          background: "hsl(var(--cream))",
          borderTop: "1px solid hsl(var(--bevel-light))",
          boxShadow: "inset 0 1px 0 hsl(var(--cream-soft))",
          fontFamily: "var(--font-win98)",
        }}
      >
        {/* Start button */}
        <button
          ref={startBtnRef}
          onClick={() => setStartOpen((v) => !v)}
          className="flex items-center gap-2 h-[34px] px-3"
          style={{
            background: "hsl(var(--cream))",
            border: "2px solid hsl(var(--bevel-light))",
            borderRightColor: "hsl(var(--bevel-dark))",
            borderBottomColor: "hsl(var(--bevel-dark))",
            fontFamily: "var(--font-win98)",
            fontSize: "14px",
            fontWeight: 700,
            color: "hsl(var(--ink))",
            ...(startOpen
              ? {
                  borderColor: "hsl(var(--bevel-dark))",
                  borderRightColor: "hsl(var(--bevel-light))",
                  borderBottomColor: "hsl(var(--bevel-light))",
                }
              : null),
          }}
        >
          <WinLogo />
          <span>Start</span>
        </button>

        {/* Divider */}
        <div
          style={{
            width: 2,
            height: 28,
            marginLeft: 4,
            marginRight: 4,
            borderLeft: "1px solid hsl(var(--bevel-dark))",
            borderRight: "1px solid hsl(var(--bevel-light))",
          }}
        />

        {/* Open windows */}
        <div className="flex items-center gap-1 flex-1 overflow-hidden">
          {sorted.map((w) => {
            const app = apps[w.appId];
            if (!app) return null;
            const Icon = app.icon;
            const isFocused = activeId === w.id && !w.minimized;
            return (
              <button
                key={w.id}
                onClick={() => {
                  if (isFocused) toggleMinimize(w.id);
                  else focusWindow(w.id);
                }}
                title={w.title}
                className="flex items-center gap-2 h-[34px] px-2.5 min-w-0"
                style={{
                  maxWidth: 200,
                  background: "hsl(var(--cream))",
                  border: isFocused
                    ? "2px solid hsl(var(--bevel-dark))"
                    : "2px solid hsl(var(--bevel-light))",
                  borderRightColor: isFocused ? "hsl(var(--bevel-light))" : "hsl(var(--bevel-dark))",
                  borderBottomColor: isFocused ? "hsl(var(--bevel-light))" : "hsl(var(--bevel-dark))",
                  fontFamily: "var(--font-win98)",
                  fontSize: "13px",
                  color: "hsl(var(--ink))",
                  backgroundImage: isFocused
                    ? "repeating-linear-gradient(135deg, hsl(var(--cream-soft)) 0 2px, hsl(var(--cream)) 2px 4px)"
                    : undefined,
                }}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate" style={{ fontWeight: isFocused ? 600 : 400 }}>
                  {w.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tray / clock */}
        <div
          className="flex items-center h-[34px] px-3 gap-2"
          style={{
            border: "1px solid hsl(var(--bevel-dark))",
            borderTopColor: "hsl(var(--bevel-light))",
            borderLeftColor: "hsl(var(--bevel-light))",
            fontSize: "13px",
            color: "hsl(var(--ink))",
          }}
          title={now.toLocaleString()}
        >
          <span style={{ opacity: 0.75 }}>{weekday}</span>
          <span style={{ opacity: 0.5 }}>·</span>
          <span className="tabular-nums">{time}</span>
          <span style={{ opacity: 0.5 }}>·</span>
          <span className="tabular-nums" style={{ opacity: 0.7 }}>{date}</span>
        </div>
      </div>
    </>
  );
}
