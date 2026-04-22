import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const COLS = 20;
const ROWS = 15;
const CELL = 22;

type Pt = { x: number; y: number };
type Dir = "up" | "down" | "left" | "right";
type Speed = "slow" | "normal" | "fast";

const DIRS: Record<Dir, Pt> = {
  up:    { x: 0, y: -1 },
  down:  { x: 0, y: 1 },
  left:  { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const SPEED_MS: Record<Speed, number> = { slow: 170, normal: 115, fast: 75 };
const BEST_KEY = "ruddyos.snake.best";

function loadBest(): Record<Speed, number> {
  try {
    const raw = localStorage.getItem(BEST_KEY);
    if (raw) return { slow: 0, normal: 0, fast: 0, ...JSON.parse(raw) };
  } catch {}
  return { slow: 0, normal: 0, fast: 0 };
}
function saveBest(b: Record<Speed, number>) {
  try { localStorage.setItem(BEST_KEY, JSON.stringify(b)); } catch {}
}

function randomFood(snake: Pt[]): Pt {
  while (true) {
    const p = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
    if (!snake.some((s) => s.x === p.x && s.y === p.y)) return p;
  }
}
function initialSnake(): Pt[] {
  const cx = Math.floor(COLS / 2);
  const cy = Math.floor(ROWS / 2);
  return [{ x: cx, y: cy }, { x: cx - 1, y: cy }, { x: cx - 2, y: cy }];
}

export default function Snake() {
  const [snake, setSnake] = useState<Pt[]>(initialSnake);
  const [food, setFood] = useState<Pt>(() => randomFood(initialSnake()));
  const [dir, setDir] = useState<Dir>("right");
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [dead, setDead] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState<Speed>("normal");
  const [bests, setBests] = useState<Record<Speed, number>>(loadBest);
  const [countdown, setCountdown] = useState<number | null>(null);

  const dirRef = useRef(dir);
  dirRef.current = dir;
  const pendingRef = useRef<Dir>("right");
  const queueRef = useRef<Dir[]>([]);

  const best = bests[speed];

  const reset = useCallback(() => {
    const s = initialSnake();
    setSnake(s);
    setFood(randomFood(s));
    setDir("right");
    pendingRef.current = "right";
    queueRef.current = [];
    setDead(false);
    setPaused(false);
    setScore(0);
    setRunning(false);
    setCountdown(null);
  }, []);

  // reset when difficulty changes
  useEffect(() => { reset(); }, [speed, reset]);

  const startWithCountdown = useCallback(() => {
    if (running || dead) return;
    setCountdown(3);
  }, [running, dead]);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      setCountdown(null);
      setRunning(true);
      return;
    }
    const id = window.setTimeout(() => setCountdown((c) => (c === null ? null : c - 1)), 650);
    return () => clearTimeout(id);
  }, [countdown]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key;
      if (k === " ") {
        e.preventDefault();
        if (dead) return;
        if (!running && countdown === null) { startWithCountdown(); return; }
        setPaused((p) => !p);
        return;
      }
      const map: Record<string, Dir> = {
        ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right",
        w: "up", s: "down", a: "left", d: "right",
        W: "up", S: "down", A: "left", D: "right",
      };
      const next = map[k];
      if (!next) return;
      e.preventDefault();
      // queue up to 2 inputs so fast 90° turns don't get lost
      const last = queueRef.current.length
        ? queueRef.current[queueRef.current.length - 1]
        : dirRef.current;
      const opp =
        (next === "up" && last === "down") ||
        (next === "down" && last === "up") ||
        (next === "left" && last === "right") ||
        (next === "right" && last === "left");
      if (opp || next === last) return;
      if (queueRef.current.length < 2) queueRef.current.push(next);
      if (!running && !dead && countdown === null) startWithCountdown();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [running, dead, countdown, startWithCountdown]);

  useEffect(() => {
    if (!running || dead || paused) return;
    const id = window.setInterval(() => {
      setSnake((prev) => {
        const nextDir = queueRef.current.shift() ?? dirRef.current;
        setDir(nextDir);
        const d = DIRS[nextDir];
        const head = { x: prev[0].x + d.x, y: prev[0].y + d.y };
        if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
          setDead(true); setRunning(false); return prev;
        }
        if (prev.some((p, i) => i !== prev.length - 1 && p.x === head.x && p.y === head.y)) {
          setDead(true); setRunning(false); return prev;
        }
        const ate = head.x === food.x && head.y === food.y;
        const next = [head, ...prev];
        if (!ate) next.pop();
        else {
          setScore((s) => {
            const ns = s + 1;
            setBests((b) => {
              if (ns > b[speed]) {
                const nb = { ...b, [speed]: ns };
                saveBest(nb);
                return nb;
              }
              return b;
            });
            return ns;
          });
          setFood(randomFood(next));
        }
        return next;
      });
    }, SPEED_MS[speed]);
    return () => clearInterval(id);
  }, [running, dead, paused, food, speed]);

  const boardW = COLS * CELL;
  const boardH = ROWS * CELL;

  return (
    <div
      className="flex flex-col items-center p-4 h-full"
      style={{ background: "hsl(var(--cream-soft))", fontFamily: "var(--font-win98)" }}
    >
      {/* HUD */}
      <div
        className="flex items-center gap-3 mb-3 px-3 py-2"
        style={{
          background: "hsl(var(--cream))",
          border: "2px solid hsl(var(--bevel-light))",
          borderRightColor: "hsl(var(--bevel-dark))",
          borderBottomColor: "hsl(var(--bevel-dark))",
          width: boardW + 10,
          fontSize: "12px",
        }}
      >
        <LedBox label="SCORE" value={score} />
        <div className="flex-1 flex items-center justify-center gap-1">
          {(["slow","normal","fast"] as Speed[]).map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className="px-2 py-0.5"
              style={{
                background: speed === s ? "hsl(var(--ink))" : "hsl(var(--cream))",
                color: speed === s ? "hsl(var(--cream))" : "hsl(var(--ink))",
                border: "2px solid hsl(var(--bevel-light))",
                borderRightColor: "hsl(var(--bevel-dark))",
                borderBottomColor: "hsl(var(--bevel-dark))",
                fontFamily: "var(--font-win98)",
                fontSize: "11px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {s}
            </button>
          ))}
          <button
            onClick={reset}
            className="px-2 py-0.5 ml-1"
            style={{
              background: "hsl(var(--cream))",
              border: "2px solid hsl(var(--bevel-light))",
              borderRightColor: "hsl(var(--bevel-dark))",
              borderBottomColor: "hsl(var(--bevel-dark))",
              fontFamily: "var(--font-win98)",
              fontSize: "11px",
            }}
          >
            ↻
          </button>
        </div>
        <LedBox label="BEST" value={best} />
      </div>

      {/* Board */}
      <div
        className="relative"
        style={{
          width: boardW,
          height: boardH,
          background: "radial-gradient(ellipse at center, #113E13 0%, #061A06 95%)",
          border: "3px solid hsl(var(--bevel-dark))",
          borderRightColor: "hsl(var(--bevel-light))",
          borderBottomColor: "hsl(var(--bevel-light))",
          boxShadow: "inset 0 0 24px rgba(0,0,0,0.55), inset 0 0 60px rgba(0,255,80,0.04)",
          overflow: "hidden",
        }}
      >
        {/* grid + scanlines overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              `linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
               linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px),
               repeating-linear-gradient(180deg, rgba(0,0,0,0.18) 0 1px, transparent 1px 3px)`,
            backgroundSize: `${CELL}px ${CELL}px, ${CELL}px ${CELL}px, 100% 3px`,
          }}
        />

        {/* Food */}
        <Food x={food.x * CELL} y={food.y * CELL} />

        {/* Snake */}
        {snake.map((p, i) => (
          <SnakeSegment
            key={i}
            x={p.x * CELL}
            y={p.y * CELL}
            isHead={i === 0}
            isTail={i === snake.length - 1}
            dir={dir}
            index={i}
            total={snake.length}
          />
        ))}

        {/* Overlays */}
        {countdown !== null && countdown > 0 && (
          <Overlay>
            <div
              key={countdown}
              style={{
                fontSize: "72px",
                color: "#B9FFB9",
                textShadow: "0 0 24px rgba(120,255,120,0.7)",
                fontFamily: "var(--font-win98)",
                animation: "snakePop 650ms ease-out",
              }}
            >
              {countdown}
            </div>
          </Overlay>
        )}
        {!running && !dead && countdown === null && score === 0 && (
          <Overlay>
            <div style={{ color: "#CFFFD0", textAlign: "center", lineHeight: 1.6 }}>
              <div style={{ fontSize: "18px", letterSpacing: "0.15em" }}>READY</div>
              <div style={{ fontSize: "12px", opacity: 0.75, marginTop: 6 }}>
                ↑ ↓ ← →  or  WASD · Space to pause
              </div>
              <button
                onClick={startWithCountdown}
                className="mt-3 px-3 py-1"
                style={{
                  background: "hsl(var(--cream))",
                  border: "2px solid hsl(var(--bevel-light))",
                  borderRightColor: "hsl(var(--bevel-dark))",
                  borderBottomColor: "hsl(var(--bevel-dark))",
                  color: "hsl(var(--ink))",
                  fontFamily: "var(--font-win98)",
                  fontSize: "12px",
                }}
              >
                ▶ Start
              </button>
            </div>
          </Overlay>
        )}
        {paused && !dead && (
          <Overlay>
            <div style={{ color: "#CFFFD0", fontSize: "22px", letterSpacing: "0.2em" }}>PAUSED</div>
          </Overlay>
        )}
        {dead && (
          <Overlay>
            <div style={{ textAlign: "center", color: "#FFE3E3" }}>
              <div style={{ fontSize: "22px", letterSpacing: "0.15em" }}>GAME OVER</div>
              <div style={{ fontSize: "13px", marginTop: 4, opacity: 0.8 }}>
                Score {score} {score > 0 && score === best && "· NEW BEST"}
              </div>
              <button
                onClick={reset}
                className="mt-3 px-3 py-1"
                style={{
                  background: "hsl(var(--cream))",
                  border: "2px solid hsl(var(--bevel-light))",
                  borderRightColor: "hsl(var(--bevel-dark))",
                  borderBottomColor: "hsl(var(--bevel-dark))",
                  color: "hsl(var(--ink))",
                  fontFamily: "var(--font-win98)",
                  fontSize: "12px",
                }}
              >
                Play again
              </button>
            </div>
          </Overlay>
        )}
      </div>

      <div
        className="mt-3 text-center"
        style={{ fontSize: "11px", color: "hsl(var(--ink-soft))", letterSpacing: "0.04em" }}
      >
        Arrows / WASD to move · Space to pause · Don't bite yourself
      </div>

      <style>{`
        @keyframes snakePop {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes foodPulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 2px rgba(255,80,80,0.6)); }
          50% { transform: scale(1.12); filter: drop-shadow(0 0 8px rgba(255,80,80,0.9)); }
        }
      `}</style>
    </div>
  );
}

function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(1px)" }}
    >
      {children}
    </div>
  );
}

function LedBox({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <span style={{ fontSize: "9px", letterSpacing: "0.18em", color: "hsl(var(--ink-soft))" }}>
        {label}
      </span>
      <div
        className="tabular-nums"
        style={{
          background: "#000",
          color: "#6BFF6B",
          fontFamily: "monospace",
          fontSize: "16px",
          fontWeight: 700,
          padding: "1px 8px",
          minWidth: "46px",
          textAlign: "center",
          border: "1px solid hsl(var(--bevel-dark))",
          letterSpacing: "2px",
          textShadow: "0 0 6px rgba(107,255,107,0.7)",
        }}
      >
        {String(value).padStart(3, "0")}
      </div>
    </div>
  );
}

function Food({ x, y }: { x: number; y: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: CELL,
        height: CELL,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "foodPulse 1.1s ease-in-out infinite",
      }}
    >
      <svg width={CELL - 4} height={CELL - 4} viewBox="0 0 20 20">
        <circle cx="10" cy="12" r="7" fill="#E83A3A" stroke="#7A0000" strokeWidth="1" />
        <circle cx="7.5" cy="9.5" r="1.8" fill="#FF9C9C" opacity="0.9" />
        <path d="M10 5 Q12 3 14 4" stroke="#3A8F3A" strokeWidth="1.3" fill="none" />
        <rect x="9.3" y="3" width="1.4" height="3" fill="#5B3A1A" />
      </svg>
    </div>
  );
}

function SnakeSegment({
  x, y, isHead, dir, index, total,
}: {
  x: number; y: number; isHead: boolean; isTail: boolean; dir: Dir; index: number; total: number;
}) {
  const t = total > 1 ? index / (total - 1) : 0;
  // lighter at head, darker toward tail
  const light = `hsl(110 ${70 - t * 20}% ${62 - t * 18}%)`;
  const dark = `hsl(110 ${70 - t * 20}% ${42 - t * 18}%)`;

  const eyeOffset = useMemo(() => {
    switch (dir) {
      case "up":    return { a: { x: 5, y: 4 }, b: { x: 12, y: 4 } };
      case "down":  return { a: { x: 5, y: 12 }, b: { x: 12, y: 12 } };
      case "left":  return { a: { x: 4, y: 5 }, b: { x: 4, y: 12 } };
      default:      return { a: { x: 12, y: 5 }, b: { x: 12, y: 12 } };
    }
  }, [dir]);

  return (
    <div
      style={{
        position: "absolute",
        left: x + 1,
        top: y + 1,
        width: CELL - 2,
        height: CELL - 2,
        background: `linear-gradient(135deg, ${light} 0%, ${dark} 100%)`,
        border: "1px solid rgba(0,0,0,0.35)",
        borderRadius: isHead ? 6 : 3,
        boxShadow: isHead ? "0 0 6px rgba(120,255,120,0.5)" : "inset -1px -1px 0 rgba(0,0,0,0.2)",
        transition: "background 120ms linear",
      }}
    >
      {isHead && (
        <svg
          width={CELL - 2}
          height={CELL - 2}
          viewBox={`0 0 ${CELL} ${CELL}`}
          style={{ position: "absolute", inset: 0 }}
        >
          <circle cx={eyeOffset.a.x} cy={eyeOffset.a.y} r="2" fill="#fff" />
          <circle cx={eyeOffset.b.x} cy={eyeOffset.b.y} r="2" fill="#fff" />
          <circle cx={eyeOffset.a.x} cy={eyeOffset.a.y} r="1" fill="#111" />
          <circle cx={eyeOffset.b.x} cy={eyeOffset.b.y} r="1" fill="#111" />
        </svg>
      )}
    </div>
  );
}
