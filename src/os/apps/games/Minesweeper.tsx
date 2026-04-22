import { useEffect, useMemo, useState } from "react";

type Cell = {
  isMine: boolean;
  adjacent: number;
  revealed: boolean;
  flagged: boolean;
};

type Diff = "beginner" | "intermediate" | "expert";
const LEVELS: Record<Diff, { rows: number; cols: number; mines: number; label: string }> = {
  beginner:     { rows: 9,  cols: 9,  mines: 10, label: "Beginner" },
  intermediate: { rows: 16, cols: 16, mines: 40, label: "Intermediate" },
  expert:       { rows: 16, cols: 30, mines: 99, label: "Expert" },
};

const CELL_SIZE = 26;
const BEST_KEY = "ruddyos.minesweeper.best";

const NUM_COLORS = ["", "#1D4FD8", "#1F7A1F", "#D01B1B", "#1A1466", "#7A1B1B", "#1F7A7A", "#000", "#666"];

function loadBest(): Record<Diff, number | null> {
  try {
    const raw = localStorage.getItem(BEST_KEY);
    if (raw) return { beginner: null, intermediate: null, expert: null, ...JSON.parse(raw) };
  } catch {}
  return { beginner: null, intermediate: null, expert: null };
}
function saveBest(b: Record<Diff, number | null>) {
  try { localStorage.setItem(BEST_KEY, JSON.stringify(b)); } catch {}
}

function emptyGrid(rows: number, cols: number): Cell[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      isMine: false, adjacent: 0, revealed: false, flagged: false,
    }))
  );
}

function placeMines(grid: Cell[][], avoidR: number, avoidC: number, mines: number): Cell[][] {
  const rows = grid.length, cols = grid[0].length;
  const g = grid.map((row) => row.map((c) => ({ ...c })));
  const safe = new Set<string>();
  for (let dr = -1; dr <= 1; dr++)
    for (let dc = -1; dc <= 1; dc++) safe.add(`${avoidR + dr},${avoidC + dc}`);

  let placed = 0;
  while (placed < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (safe.has(`${r},${c}`) || g[r][c].isMine) continue;
    g[r][c].isMine = true;
    placed++;
  }
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      if (g[r][c].isMine) continue;
      let n = 0;
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr, nc = c + dc;
          if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
          if (g[nr][nc].isMine) n++;
        }
      g[r][c].adjacent = n;
    }
  return g;
}

function reveal(grid: Cell[][], r: number, c: number): Cell[][] {
  const rows = grid.length, cols = grid[0].length;
  const g = grid.map((row) => row.map((c) => ({ ...c })));
  const stack: [number, number][] = [[r, c]];
  while (stack.length) {
    const [rr, cc] = stack.pop()!;
    if (rr < 0 || rr >= rows || cc < 0 || cc >= cols) continue;
    const cell = g[rr][cc];
    if (cell.revealed || cell.flagged) continue;
    cell.revealed = true;
    if (!cell.isMine && cell.adjacent === 0) {
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          stack.push([rr + dr, cc + dc]);
        }
    }
  }
  return g;
}

function checkWin(g: Cell[][]): boolean {
  for (const row of g) for (const c of row) if (!c.isMine && !c.revealed) return false;
  return true;
}

export default function Minesweeper() {
  const [diff, setDiff] = useState<Diff>("beginner");
  const cfg = LEVELS[diff];
  const [grid, setGrid] = useState<Cell[][]>(() => emptyGrid(cfg.rows, cfg.cols));
  const [started, setStarted] = useState(false);
  const [state, setState] = useState<"playing" | "won" | "lost">("playing");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [pressing, setPressing] = useState(false);
  const [bests, setBests] = useState<Record<Diff, number | null>>(loadBest);

  const flags = useMemo(() => grid.flat().filter((c) => c.flagged).length, [grid]);

  useEffect(() => {
    setGrid(emptyGrid(cfg.rows, cfg.cols));
    setStarted(false);
    setState("playing");
    setStartTime(null);
    setElapsed(0);
  }, [diff, cfg.rows, cfg.cols]);

  useEffect(() => {
    if (state !== "playing" || !startTime) return;
    const id = window.setInterval(() => {
      setElapsed(Math.min(999, Math.floor((Date.now() - startTime) / 1000)));
    }, 500);
    return () => clearInterval(id);
  }, [state, startTime]);

  const onLeft = (r: number, c: number) => {
    if (state !== "playing") return;
    if (grid[r][c].flagged || grid[r][c].revealed) return;
    let g = grid;
    if (!started) {
      g = placeMines(g, r, c, cfg.mines);
      setStarted(true);
      setStartTime(Date.now());
    }
    if (g[r][c].isMine) {
      const lost = g.map((row) => row.map((cc) => ({ ...cc, revealed: cc.isMine || cc.revealed })));
      setGrid(lost);
      setState("lost");
      return;
    }
    const next = reveal(g, r, c);
    setGrid(next);
    if (checkWin(next)) {
      setState("won");
      const finalElapsed = Math.floor((Date.now() - (startTime ?? Date.now())) / 1000);
      setElapsed(finalElapsed);
      setBests((b) => {
        const prev = b[diff];
        if (prev === null || finalElapsed < prev) {
          const nb = { ...b, [diff]: finalElapsed };
          saveBest(nb);
          return nb;
        }
        return b;
      });
    }
  };

  const onRight = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (state !== "playing") return;
    if (grid[r][c].revealed) return;
    const g = grid.map((row) => row.map((cc) => ({ ...cc })));
    g[r][c].flagged = !g[r][c].flagged;
    setGrid(g);
  };

  const reset = () => {
    setGrid(emptyGrid(cfg.rows, cfg.cols));
    setStarted(false);
    setState("playing");
    setStartTime(null);
    setElapsed(0);
  };

  const face = state === "won" ? "😎" : state === "lost" ? "😵" : pressing ? "😮" : "🙂";
  const remaining = Math.max(-99, cfg.mines - flags);
  const boardW = cfg.cols * CELL_SIZE;
  const best = bests[diff];

  return (
    <div
      className="flex flex-col items-center p-4 h-full overflow-auto win-scroll"
      style={{ background: "hsl(var(--cream-soft))", fontFamily: "var(--font-win98)" }}
    >
      {/* Difficulty selector */}
      <div className="flex items-center gap-1 mb-3">
        {(Object.keys(LEVELS) as Diff[]).map((d) => (
          <button
            key={d}
            onClick={() => setDiff(d)}
            className="px-2.5 py-1"
            style={{
              background: diff === d ? "hsl(var(--ink))" : "hsl(var(--cream))",
              color: diff === d ? "hsl(var(--cream))" : "hsl(var(--ink))",
              border: "2px solid hsl(var(--bevel-light))",
              borderRightColor: "hsl(var(--bevel-dark))",
              borderBottomColor: "hsl(var(--bevel-dark))",
              fontFamily: "var(--font-win98)",
              fontSize: "11px",
              letterSpacing: "0.06em",
            }}
          >
            {LEVELS[d].label}
            <span style={{ opacity: 0.7, marginLeft: 6, fontSize: "10px" }}>
              {LEVELS[d].rows}×{LEVELS[d].cols} · {LEVELS[d].mines}💣
            </span>
          </button>
        ))}
      </div>

      {/* HUD */}
      <div
        className="flex items-center justify-between mb-3 px-3 py-2"
        style={{
          background: "hsl(var(--cream))",
          border: "2px solid hsl(var(--bevel-light))",
          borderRightColor: "hsl(var(--bevel-dark))",
          borderBottomColor: "hsl(var(--bevel-dark))",
          width: boardW + 12,
          minWidth: 260,
        }}
      >
        <LcdBox value={remaining} />
        <button
          onClick={reset}
          onMouseDown={() => setPressing(true)}
          onMouseUp={() => setPressing(false)}
          onMouseLeave={() => setPressing(false)}
          className="flex items-center justify-center"
          style={{
            width: 40,
            height: 40,
            background: "hsl(var(--cream))",
            border: "2px solid hsl(var(--bevel-light))",
            borderRightColor: "hsl(var(--bevel-dark))",
            borderBottomColor: "hsl(var(--bevel-dark))",
            fontSize: "20px",
            lineHeight: 1,
            cursor: "pointer",
          }}
        >
          {face}
        </button>
        <LcdBox value={elapsed} />
      </div>

      {/* Best time banner */}
      <div
        className="mb-2"
        style={{
          fontSize: "11px",
          color: "hsl(var(--ink-soft))",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        Best · {best === null ? "—" : `${best}s`}
        {state === "won" && best === elapsed && elapsed > 0 && (
          <span style={{ color: "#C11", marginLeft: 8, fontWeight: 600 }}>NEW RECORD</span>
        )}
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cfg.cols}, ${CELL_SIZE}px)`,
          gridTemplateRows: `repeat(${cfg.rows}, ${CELL_SIZE}px)`,
          border: "3px solid hsl(var(--bevel-dark))",
          borderRightColor: "hsl(var(--bevel-light))",
          borderBottomColor: "hsl(var(--bevel-light))",
        }}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => {
            const isRevealed = cell.revealed;
            const hitMine = isRevealed && cell.isMine && state === "lost";
            return (
              <button
                key={`${r}-${c}`}
                onClick={() => onLeft(r, c)}
                onContextMenu={(e) => onRight(e, r, c)}
                className="flex items-center justify-center"
                style={{
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  padding: 0,
                  background: hitMine ? "#D03030" : "hsl(var(--cream))",
                  border: isRevealed
                    ? "1px solid hsl(var(--bevel-dark) / 0.35)"
                    : "2px solid hsl(var(--bevel-light))",
                  borderRightColor: isRevealed ? undefined : "hsl(var(--bevel-dark))",
                  borderBottomColor: isRevealed ? undefined : "hsl(var(--bevel-dark))",
                  fontFamily: "monospace",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: NUM_COLORS[cell.adjacent] || "hsl(var(--ink))",
                  lineHeight: 1,
                  cursor: state === "playing" ? "pointer" : "default",
                  transition: "background 120ms",
                }}
              >
                {isRevealed ? (
                  cell.isMine ? (
                    <span style={{ fontSize: "13px", animation: "mineBoom 300ms ease-out" }}>💣</span>
                  ) : cell.adjacent > 0 ? (
                    <span style={{ animation: "numPop 180ms ease-out" }}>{cell.adjacent}</span>
                  ) : ""
                ) : cell.flagged ? (
                  <span style={{ color: "#C11", animation: "flagPop 160ms ease-out" }}>⚑</span>
                ) : ""}
              </button>
            );
          })
        )}
      </div>

      <div
        className="mt-3 text-center"
        style={{ fontFamily: "var(--font-win98)", fontSize: "11px", color: "hsl(var(--ink-soft))" }}
      >
        Left-click to reveal · Right-click to flag
      </div>

      <style>{`
        @keyframes numPop {
          0% { transform: scale(0.2); opacity: 0; }
          60% { transform: scale(1.25); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes flagPop {
          0% { transform: scale(0) rotate(-30deg); }
          100% { transform: scale(1) rotate(0); }
        }
        @keyframes mineBoom {
          0% { transform: scale(0.4); }
          50% { transform: scale(1.4); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

function LcdBox({ value }: { value: number }) {
  const display = value < 0
    ? "-" + String(Math.abs(value)).padStart(2, "0")
    : String(value).padStart(3, "0");
  return (
    <div
      className="tabular-nums"
      style={{
        background: "#000",
        color: "#F22",
        fontFamily: "monospace",
        fontSize: "22px",
        fontWeight: 700,
        padding: "1px 8px",
        minWidth: "62px",
        textAlign: "center",
        border: "1px solid hsl(var(--bevel-dark))",
        letterSpacing: "2px",
        textShadow: "0 0 4px rgba(255,40,40,0.6)",
      }}
    >
      {display}
    </div>
  );
}
