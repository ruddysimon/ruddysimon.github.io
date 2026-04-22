import { useEffect, useState } from "react";
import { ArrowLeft, Play } from "lucide-react";
import Minesweeper from "./games/Minesweeper";
import Snake from "./games/Snake";

type GameId = "minesweeper" | "snake";

type Game = {
  id: GameId;
  label: string;
  file: string;
  tagline: string;
  blurb: string;
  controls: string;
  Component: React.ComponentType;
};

const GAMES: Game[] = [
  {
    id: "snake",
    label: "Snake",
    file: "snake.exe",
    tagline: "Classic arcade · CRT edition",
    blurb: "Grow longer on every apple. Don't hit the wall. Don't hit yourself.",
    controls: "Arrows / WASD · Space pauses",
    Component: Snake,
  },
  {
    id: "minesweeper",
    label: "Minesweeper",
    file: "minesweeper.exe",
    tagline: "The 1989 classic · three difficulties",
    blurb: "Clear every safe tile. Flag the mines. Chase the best time.",
    controls: "Left-click reveals · Right-click flags",
    Component: Minesweeper,
  },
];

function readBestSnake(): number {
  try {
    const raw = localStorage.getItem("ruddyos.snake.best");
    if (!raw) return 0;
    const v = JSON.parse(raw);
    return Math.max(v.slow ?? 0, v.normal ?? 0, v.fast ?? 0);
  } catch { return 0; }
}
function readBestMines(): number | null {
  try {
    const raw = localStorage.getItem("ruddyos.minesweeper.best");
    if (!raw) return null;
    const v = JSON.parse(raw);
    return v.beginner ?? null;
  } catch { return null; }
}

export default function GamesApp() {
  const [openId, setOpenId] = useState<GameId | null>(null);
  const current = GAMES.find((g) => g.id === openId);

  return (
    <div className="flex flex-col h-full" style={{ background: "hsl(var(--cream-soft))" }}>
      {/* Path bar */}
      <div
        className="flex items-center gap-2 px-3 py-1.5 text-[12px]"
        style={{
          background: "hsl(var(--cream))",
          borderBottom: "1px solid hsl(var(--bevel-dark))",
          fontFamily: "var(--font-win98)",
        }}
      >
        <button
          onClick={() => setOpenId(null)}
          disabled={!current}
          className="btn-ghost !py-0.5 !px-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-3 h-3" />
          Back
        </button>
        <span style={{ color: "hsl(var(--ink-soft))" }}>
          C:\Games{current ? `\\${current.file}` : ""}
        </span>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-auto win-scroll">
        {!current ? <Launcher onOpen={setOpenId} /> : <current.Component />}
      </div>

      {/* Status bar */}
      <div
        className="flex items-center justify-between px-3 py-1 text-[11px]"
        style={{
          background: "hsl(var(--cream))",
          borderTop: "1px solid hsl(var(--bevel-dark))",
          fontFamily: "var(--font-win98)",
          color: "hsl(var(--ink-soft))",
        }}
      >
        <span>{current ? "1 object running" : `${GAMES.length} games available`}</span>
        <span style={{ letterSpacing: "0.06em" }}>
          {current ? current.label : "Games"}
        </span>
      </div>
    </div>
  );
}

function Launcher({ onOpen }: { onOpen: (id: GameId) => void }) {
  return (
    <div className="p-6">
      {/* Marquee header */}
      <div
        className="mb-5 px-4 py-3 flex items-center justify-between"
        style={{
          background: "linear-gradient(180deg, hsl(var(--ink)) 0%, hsl(245 40% 10%) 100%)",
          color: "hsl(var(--cream))",
          border: "2px solid hsl(var(--bevel-light))",
          borderRightColor: "hsl(var(--bevel-dark))",
          borderBottomColor: "hsl(var(--bevel-dark))",
          fontFamily: "var(--font-win98)",
          boxShadow: "inset 0 0 40px rgba(255,200,100,0.08)",
        }}
      >
        <div>
          <div style={{ fontSize: "11px", letterSpacing: "0.3em", opacity: 0.6 }}>
            RUDDYOS ▸ ARCADE
          </div>
          <div style={{ fontSize: "22px", letterSpacing: "0.04em", marginTop: 2 }}>
            Insert coin.
          </div>
        </div>
        <BlinkingCoin />
      </div>

      {/* Cabinet grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {GAMES.map((g) => (
          <Cabinet key={g.id} game={g} onOpen={() => onOpen(g.id)} />
        ))}
      </div>

      <p
        className="mt-5 text-center"
        style={{
          fontFamily: "var(--font-win98)",
          fontSize: "11px",
          fontStyle: "italic",
          color: "hsl(var(--ink-soft))",
        }}
      >
        Best scores save locally in your browser.
      </p>
    </div>
  );
}

function Cabinet({ game, onOpen }: { game: Game; onOpen: () => void }) {
  const bestSnake = game.id === "snake" ? readBestSnake() : 0;
  const bestMines = game.id === "minesweeper" ? readBestMines() : null;

  return (
    <div
      className="flex flex-col"
      style={{
        background: "hsl(var(--cream))",
        border: "3px solid hsl(var(--bevel-light))",
        borderRightColor: "hsl(var(--bevel-dark))",
        borderBottomColor: "hsl(var(--bevel-dark))",
        boxShadow: "3px 3px 0 hsl(var(--ink) / 0.18)",
      }}
    >
      {/* Screen */}
      <div
        className="relative"
        style={{
          height: 180,
          overflow: "hidden",
          border: "3px solid hsl(var(--bevel-dark))",
          borderRightColor: "hsl(var(--bevel-light))",
          borderBottomColor: "hsl(var(--bevel-light))",
          margin: 10,
        }}
      >
        {game.id === "snake" ? <SnakeAnim /> : <MinesAnim />}
        {/* Scanlines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(180deg, rgba(0,0,0,0.15) 0 1px, transparent 1px 3px)",
          }}
        />
        {/* Corner tag */}
        <div
          className="absolute top-2 left-2 px-1.5 py-0.5"
          style={{
            background: "rgba(0,0,0,0.7)",
            color: "#9EFF9E",
            fontSize: "9px",
            letterSpacing: "0.2em",
            fontFamily: "monospace",
          }}
        >
          LIVE
        </div>
      </div>

      {/* Metadata */}
      <div className="px-4 pb-4 flex flex-col gap-2" style={{ fontFamily: "var(--font-win98)" }}>
        <div className="flex items-baseline justify-between">
          <h3
            style={{
              fontSize: "20px",
              fontWeight: 400,
              letterSpacing: "0.02em",
              color: "hsl(var(--ink))",
            }}
          >
            {game.label}
          </h3>
          <span
            style={{
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "hsl(var(--ink-soft))",
            }}
          >
            {game.id === "snake"
              ? `Best ${String(bestSnake).padStart(3, "0")}`
              : `Best ${bestMines === null ? "—" : bestMines + "s"}`}
          </span>
        </div>
        <div
          style={{
            fontSize: "11px",
            fontStyle: "italic",
            color: "hsl(var(--ink-soft))",
            letterSpacing: "0.03em",
          }}
        >
          {game.tagline}
        </div>
        <p style={{ fontSize: "13px", color: "hsl(var(--ink))", lineHeight: 1.5 }}>
          {game.blurb}
        </p>
        <div
          className="flex items-center justify-between mt-1"
          style={{ fontSize: "11px", color: "hsl(var(--ink-soft))" }}
        >
          <span>{game.controls}</span>
          <button
            onClick={onOpen}
            className="flex items-center gap-1.5 px-3 py-1.5"
            style={{
              background: "hsl(var(--ink))",
              color: "hsl(var(--cream))",
              border: "2px solid hsl(var(--bevel-light))",
              borderRightColor: "hsl(var(--bevel-dark))",
              borderBottomColor: "hsl(var(--bevel-dark))",
              fontFamily: "var(--font-win98)",
              fontSize: "12px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            <Play className="w-3 h-3" fill="currentColor" />
            Play
          </button>
        </div>
      </div>
    </div>
  );
}

function BlinkingCoin() {
  return (
    <div
      style={{
        fontFamily: "monospace",
        fontSize: "11px",
        letterSpacing: "0.2em",
        color: "#FFD66B",
        animation: "blink 1.1s steps(2,end) infinite",
        textShadow: "0 0 8px rgba(255,214,107,0.6)",
      }}
    >
      ● PRESS PLAY
      <style>{`@keyframes blink { 50% { opacity: 0.25 } }`}</style>
    </div>
  );
}

/* ---------- Snake animated preview ---------- */
function SnakeAnim() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 140);
    return () => clearInterval(id);
  }, []);
  // snake moves in a lissajous-like loop
  const segs = 8;
  const cx = 160, cy = 80;
  const snake = Array.from({ length: segs }, (_, i) => {
    const phase = (tick - i * 3) * 0.15;
    return {
      x: cx + Math.cos(phase) * 80,
      y: cy + Math.sin(phase * 1.3) * 40,
    };
  });
  const foodPhase = tick * 0.05;
  const fx = cx + Math.cos(foodPhase + 2) * 90;
  const fy = cy + Math.sin(foodPhase * 1.7 + 1) * 45;

  return (
    <div
      className="absolute inset-0"
      style={{
        background: "radial-gradient(ellipse at center, #113E13 0%, #061A06 95%)",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
        backgroundSize: "16px 16px, 16px 16px",
      }}
    >
      {snake.map((p, i) => {
        const t = i / (segs - 1);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x - 7,
              top: p.y - 7,
              width: 14,
              height: 14,
              background: `hsl(110 ${70 - t * 20}% ${58 - t * 18}%)`,
              border: "1px solid rgba(0,0,0,0.35)",
              borderRadius: i === 0 ? 5 : 3,
              boxShadow: i === 0 ? "0 0 6px rgba(120,255,120,0.6)" : undefined,
            }}
          />
        );
      })}
      <div
        style={{
          position: "absolute",
          left: fx - 5,
          top: fy - 5,
          width: 10,
          height: 10,
          background: "#E83A3A",
          border: "1px solid #7A0000",
          borderRadius: 2,
          boxShadow: "0 0 8px rgba(255,80,80,0.6)",
        }}
      />
    </div>
  );
}

/* ---------- Minesweeper animated preview ---------- */
function MinesAnim() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 500);
    return () => clearInterval(id);
  }, []);
  const COLS = 14, ROWS = 8;
  // pseudo-random reveal pattern based on tick
  const revealed = new Set<number>();
  for (let i = 0; i < (tick % (COLS * ROWS + 6)); i++) revealed.add(i);
  return (
    <div
      className="absolute inset-0"
      style={{
        background: "hsl(var(--cream))",
        display: "grid",
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        gap: 0,
        padding: 2,
      }}
    >
      {Array.from({ length: COLS * ROWS }).map((_, i) => {
        const r = Math.floor(i / COLS), c = i % COLS;
        const isRevealed = revealed.has(i);
        const n = ((r * 3 + c * 7) % 5);
        const isMine = (i % 13) === 0;
        return (
          <div
            key={i}
            style={{
              background: isRevealed ? "hsl(var(--cream-soft))" : "hsl(var(--cream))",
              border: isRevealed
                ? "1px solid hsl(var(--bevel-dark) / 0.3)"
                : "1.5px solid hsl(var(--bevel-light))",
              borderRightColor: isRevealed ? undefined : "hsl(var(--bevel-dark))",
              borderBottomColor: isRevealed ? undefined : "hsl(var(--bevel-dark))",
              fontFamily: "monospace",
              fontSize: "10px",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: ["", "#1D4FD8", "#1F7A1F", "#D01B1B", "#1A1466", "#7A1B1B"][n] || "#000",
              transition: "background 200ms",
            }}
          >
            {isRevealed ? (isMine ? "💣" : n > 0 ? n : "") : ""}
          </div>
        );
      })}
    </div>
  );
}
