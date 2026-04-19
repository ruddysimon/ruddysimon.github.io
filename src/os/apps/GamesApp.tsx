import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Minesweeper from "./games/Minesweeper";
import Snake from "./games/Snake";

type GameId = "minesweeper" | "snake";

type Game = {
  id: GameId;
  label: string;
  file: string;
  blurb: string;
  Component: React.ComponentType;
};

const GAMES: Game[] = [
  {
    id: "minesweeper",
    label: "Minesweeper",
    file: "minesweeper.exe",
    blurb: "9×9 · 10 mines",
    Component: Minesweeper,
  },
  {
    id: "snake",
    label: "Snake",
    file: "snake.exe",
    blurb: "Arrow keys",
    Component: Snake,
  },
];

function GameTile({ game, onOpen }: { game: Game; onOpen: () => void }) {
  return (
    <button
      onDoubleClick={onOpen}
      onClick={onOpen}
      className="flex flex-col items-center gap-2 p-3 hover:bg-accent/15"
      style={{ borderRadius: 0 }}
    >
      <GameIcon id={game.id} />
      <span
        className="text-[13px] text-center"
        style={{ fontFamily: "var(--font-win98)", color: "hsl(var(--ink))" }}
      >
        {game.label}
      </span>
      <span className="text-[10px] text-ink-soft">{game.blurb}</span>
    </button>
  );
}

function GameIcon({ id }: { id: GameId }) {
  if (id === "minesweeper") {
    return (
      <div
        className="relative flex items-center justify-center"
        style={{
          width: 56,
          height: 56,
          background: "hsl(var(--cream))",
          border: "2px solid hsl(var(--bevel-light))",
          borderRightColor: "hsl(var(--bevel-dark))",
          borderBottomColor: "hsl(var(--bevel-dark))",
        }}
      >
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: "#111",
            boxShadow: "inset 2px 2px 0 #444, inset -2px -2px 0 #000",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            width: 6,
            height: 6,
            background: "#C11",
          }}
        />
      </div>
    );
  }
  // snake
  return (
    <div
      className="relative"
      style={{
        width: 56,
        height: 56,
        background: "#0B2A0B",
        border: "2px solid hsl(var(--bevel-dark))",
        borderTopColor: "hsl(var(--bevel-light))",
        borderLeftColor: "hsl(var(--bevel-light))",
      }}
    >
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 8 + i * 10,
            top: 22,
            width: 9,
            height: 9,
            background: i === 3 ? "#6BE86B" : "#2FA82F",
            border: "1px solid #0B4A0B",
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          left: 42,
          top: 10,
          width: 7,
          height: 7,
          background: "#E33",
          border: "1px solid #8A0000",
        }}
      />
    </div>
  );
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
        <span className="text-ink-soft">
          C:\Games{current ? `\\${current.file}` : ""}
        </span>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-auto win-scroll">
        {!current && (
          <div className="grid grid-cols-3 gap-4 p-4">
            {GAMES.map((g) => (
              <GameTile key={g.id} game={g} onOpen={() => setOpenId(g.id)} />
            ))}
          </div>
        )}
        {current && <current.Component />}
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
        <span>{current ? "1 object" : `${GAMES.length} games`}</span>
        <span>{current ? current.label : "Games"}</span>
      </div>
    </div>
  );
}
