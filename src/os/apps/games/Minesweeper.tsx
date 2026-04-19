import { useEffect, useMemo, useState } from "react";

type Cell = {
  isMine: boolean;
  adjacent: number;
  revealed: boolean;
  flagged: boolean;
};

const ROWS = 9;
const COLS = 9;
const MINES = 10;
const CELL_SIZE = 26;

const NUM_COLORS = ["", "#1D4FD8", "#1F7A1F", "#D01B1B", "#1A1466", "#7A1B1B", "#1F7A7A", "#000", "#666"];

function emptyGrid(): Cell[][] {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      isMine: false,
      adjacent: 0,
      revealed: false,
      flagged: false,
    }))
  );
}

function placeMines(grid: Cell[][], avoidR: number, avoidC: number): Cell[][] {
  const g = grid.map((row) => row.map((c) => ({ ...c })));
  const safe = new Set<string>();
  for (let dr = -1; dr <= 1; dr++)
    for (let dc = -1; dc <= 1; dc++) safe.add(`${avoidR + dr},${avoidC + dc}`);

  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (safe.has(`${r},${c}`) || g[r][c].isMine) continue;
    g[r][c].isMine = true;
    placed++;
  }
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) {
      if (g[r][c].isMine) continue;
      let n = 0;
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr, nc = c + dc;
          if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) continue;
          if (g[nr][nc].isMine) n++;
        }
      g[r][c].adjacent = n;
    }
  return g;
}

function reveal(grid: Cell[][], r: number, c: number): Cell[][] {
  const g = grid.map((row) => row.map((c) => ({ ...c })));
  const stack: [number, number][] = [[r, c]];
  while (stack.length) {
    const [rr, cc] = stack.pop()!;
    if (rr < 0 || rr >= ROWS || cc < 0 || cc >= COLS) continue;
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
  const [grid, setGrid] = useState<Cell[][]>(emptyGrid);
  const [started, setStarted] = useState(false);
  const [state, setState] = useState<"playing" | "won" | "lost">("playing");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);

  const flags = useMemo(() => grid.flat().filter((c) => c.flagged).length, [grid]);

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
      g = placeMines(g, r, c);
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
    if (checkWin(next)) setState("won");
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
    setGrid(emptyGrid());
    setStarted(false);
    setState("playing");
    setStartTime(null);
    setElapsed(0);
  };

  const face = state === "won" ? "B)" : state === "lost" ? "X(" : ":)";
  const remaining = Math.max(-99, MINES - flags);

  return (
    <div
      className="flex flex-col items-center p-5 h-full"
      style={{ background: "hsl(var(--cream-soft))", fontFamily: "var(--font-win98)" }}
    >
      {/* HUD */}
      <div
        className="flex items-center justify-between mb-3 px-2 py-2"
        style={{
          background: "hsl(var(--cream))",
          border: "2px solid hsl(var(--bevel-light))",
          borderRightColor: "hsl(var(--bevel-dark))",
          borderBottomColor: "hsl(var(--bevel-dark))",
          width: COLS * CELL_SIZE + 8,
        }}
      >
        <LcdBox value={remaining} />
        <button
          onClick={reset}
          className="w-9 h-9 flex items-center justify-center"
          style={{
            background: "hsl(var(--cream))",
            border: "2px solid hsl(var(--bevel-light))",
            borderRightColor: "hsl(var(--bevel-dark))",
            borderBottomColor: "hsl(var(--bevel-dark))",
            fontFamily: "monospace",
            fontSize: "14px",
            fontWeight: 700,
            color: "hsl(var(--ink))",
          }}
        >
          {face}
        </button>
        <LcdBox value={elapsed} />
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, ${CELL_SIZE}px)`,
          gridTemplateRows: `repeat(${ROWS}, ${CELL_SIZE}px)`,
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
                    ? "1px solid hsl(var(--bevel-dark) / 0.4)"
                    : "2px solid hsl(var(--bevel-light))",
                  borderRightColor: isRevealed ? undefined : "hsl(var(--bevel-dark))",
                  borderBottomColor: isRevealed ? undefined : "hsl(var(--bevel-dark))",
                  fontFamily: "monospace",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: NUM_COLORS[cell.adjacent] || "hsl(var(--ink))",
                  lineHeight: 1,
                  cursor: state === "playing" ? "pointer" : "default",
                }}
              >
                {isRevealed
                  ? cell.isMine
                    ? "●"
                    : cell.adjacent > 0
                    ? cell.adjacent
                    : ""
                  : cell.flagged
                  ? <span style={{ color: "#C11" }}>⚑</span>
                  : ""}
              </button>
            );
          })
        )}
      </div>

      <div
        className="mt-3 text-center"
        style={{ fontFamily: "var(--font-win98)", fontSize: "12px", color: "hsl(var(--ink-soft))" }}
      >
        Left-click to reveal · Right-click to flag
      </div>
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
        fontSize: "20px",
        fontWeight: 700,
        padding: "1px 6px",
        minWidth: "54px",
        textAlign: "center",
        border: "1px solid hsl(var(--bevel-dark))",
        letterSpacing: "2px",
      }}
    >
      {display}
    </div>
  );
}
