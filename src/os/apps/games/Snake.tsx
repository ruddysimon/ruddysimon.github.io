import { useCallback, useEffect, useRef, useState } from "react";

const COLS = 20;
const ROWS = 15;
const CELL = 20;
const TICK_MS = 130;

type Pt = { x: number; y: number };
type Dir = "up" | "down" | "left" | "right";

const DIRS: Record<Dir, Pt> = {
  up:    { x: 0, y: -1 },
  down:  { x: 0, y: 1 },
  left:  { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

function randomFood(snake: Pt[]): Pt {
  while (true) {
    const p = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
    if (!snake.some((s) => s.x === p.x && s.y === p.y)) return p;
  }
}

function initialSnake(): Pt[] {
  const cx = Math.floor(COLS / 2);
  const cy = Math.floor(ROWS / 2);
  return [
    { x: cx, y: cy },
    { x: cx - 1, y: cy },
    { x: cx - 2, y: cy },
  ];
}

export default function Snake() {
  const [snake, setSnake] = useState<Pt[]>(initialSnake);
  const [food, setFood] = useState<Pt>(() => randomFood(initialSnake()));
  const [dir, setDir] = useState<Dir>("right");
  const [pending, setPending] = useState<Dir>("right");
  const [running, setRunning] = useState(false);
  const [dead, setDead] = useState(false);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  const dirRef = useRef(dir);
  dirRef.current = dir;
  const pendingRef = useRef(pending);
  pendingRef.current = pending;

  const reset = useCallback(() => {
    const s = initialSnake();
    setSnake(s);
    setFood(randomFood(s));
    setDir("right");
    setPending("right");
    setDead(false);
    setScore(0);
    setRunning(false);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key;
      const map: Record<string, Dir> = {
        ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right",
        w: "up", s: "down", a: "left", d: "right",
        W: "up", S: "down", A: "left", D: "right",
      };
      const next = map[k];
      if (!next) return;
      e.preventDefault();
      const cur = dirRef.current;
      if (
        (next === "up" && cur === "down") ||
        (next === "down" && cur === "up") ||
        (next === "left" && cur === "right") ||
        (next === "right" && cur === "left")
      ) return;
      setPending(next);
      if (!running && !dead) setRunning(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [running, dead]);

  useEffect(() => {
    if (!running || dead) return;
    const id = window.setInterval(() => {
      setSnake((prev) => {
        const nextDir = pendingRef.current;
        setDir(nextDir);
        const d = DIRS[nextDir];
        const head = { x: prev[0].x + d.x, y: prev[0].y + d.y };

        if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
          setDead(true);
          setRunning(false);
          return prev;
        }
        if (prev.some((p, i) => i !== prev.length - 1 && p.x === head.x && p.y === head.y)) {
          setDead(true);
          setRunning(false);
          return prev;
        }

        const ate = head.x === food.x && head.y === food.y;
        const next = [head, ...prev];
        if (!ate) next.pop();
        else {
          setScore((s) => {
            const ns = s + 1;
            setBest((b) => Math.max(b, ns));
            return ns;
          });
          setFood(randomFood(next));
        }
        return next;
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, [running, dead, food]);

  return (
    <div
      className="flex flex-col items-center p-5 h-full"
      style={{ background: "hsl(var(--cream-soft))", fontFamily: "var(--font-win98)" }}
    >
      {/* HUD */}
      <div
        className="flex items-center justify-between mb-3 px-3 py-2"
        style={{
          background: "hsl(var(--cream))",
          border: "2px solid hsl(var(--bevel-light))",
          borderRightColor: "hsl(var(--bevel-dark))",
          borderBottomColor: "hsl(var(--bevel-dark))",
          width: COLS * CELL + 8,
          fontSize: "13px",
        }}
      >
        <span>Score <strong>{score}</strong></span>
        <button
          onClick={reset}
          className="px-2 py-0.5"
          style={{
            background: "hsl(var(--cream))",
            border: "2px solid hsl(var(--bevel-light))",
            borderRightColor: "hsl(var(--bevel-dark))",
            borderBottomColor: "hsl(var(--bevel-dark))",
            fontFamily: "var(--font-win98)",
            fontSize: "12px",
          }}
        >
          Reset
        </button>
        <span>Best <strong>{best}</strong></span>
      </div>

      {/* Board */}
      <div
        className="relative"
        style={{
          width: COLS * CELL,
          height: ROWS * CELL,
          background: "#0B2A0B",
          border: "3px solid hsl(var(--bevel-dark))",
          borderRightColor: "hsl(var(--bevel-light))",
          borderBottomColor: "hsl(var(--bevel-light))",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: `${CELL}px ${CELL}px, ${CELL}px ${CELL}px`,
        }}
      >
        {/* food */}
        <div
          style={{
            position: "absolute",
            left: food.x * CELL + 2,
            top: food.y * CELL + 2,
            width: CELL - 4,
            height: CELL - 4,
            background: "#E33",
            border: "1px solid #8A0000",
          }}
        />
        {/* snake */}
        {snake.map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x * CELL + 1,
              top: p.y * CELL + 1,
              width: CELL - 2,
              height: CELL - 2,
              background: i === 0 ? "#6BE86B" : "#2FA82F",
              border: "1px solid #0B4A0B",
            }}
          />
        ))}

        {/* Overlay states */}
        {!running && !dead && score === 0 && (
          <div
            className="absolute inset-0 flex items-center justify-center text-center"
            style={{ background: "rgba(0,0,0,0.55)", color: "#EFEFEF", fontSize: "13px", lineHeight: 1.5 }}
          >
            <div>
              Press any arrow key to start<br />
              <span style={{ opacity: 0.7 }}>↑ ↓ ← →  or  W A S D</span>
            </div>
          </div>
        )}
        {dead && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2"
            style={{ background: "rgba(0,0,0,0.65)", color: "#FFF" }}
          >
            <div style={{ fontSize: "18px" }}>Game Over</div>
            <div style={{ fontSize: "13px", opacity: 0.85 }}>Score: {score}</div>
            <button
              onClick={reset}
              className="mt-1 px-3 py-1"
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
        )}
      </div>

      <div
        className="mt-3 text-center"
        style={{ fontSize: "12px", color: "hsl(var(--ink-soft))" }}
      >
        Arrow keys / WASD to move · don't hit walls or yourself
      </div>
    </div>
  );
}
