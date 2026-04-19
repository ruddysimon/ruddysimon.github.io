import { motion } from "framer-motion";
import { useWM, WindowState } from "./WindowManager";
import { X, Minus, Square } from "lucide-react";

const MENUBAR_H = 36;
const DOCK_H = 72;

export default function Window({ win, children }: { win: WindowState; children: React.ReactNode }) {
  const { closeWindow, focusWindow, moveWindow, resizeWindow, toggleMinimize, toggleMaximize, activeId } = useWM();
  const focused = activeId === win.id;

  if (win.minimized) return null;

  const x = win.maximized ? 0 : win.x;
  const y = win.maximized ? MENUBAR_H : win.y;
  const width = win.maximized ? window.innerWidth : win.w;
  const height = win.maximized ? window.innerHeight - MENUBAR_H - DOCK_H : win.h;

  const startDrag = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    focusWindow(win.id);
    if (win.maximized) return;

    // Capture absolute start so subsequent moves don't stack stale deltas.
    const startClientX = e.clientX;
    const startClientY = e.clientY;
    const startX = win.x;
    const startY = win.y;

    const onMove = (ev: PointerEvent) => {
      const nx = startX + (ev.clientX - startClientX);
      const ny = Math.max(MENUBAR_H, startY + (ev.clientY - startClientY));
      moveWindow(win.id, nx, ny);
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const startResize = (e: React.PointerEvent) => {
    e.stopPropagation();
    focusWindow(win.id);

    const startClientX = e.clientX;
    const startClientY = e.clientY;
    const startW = win.w;
    const startH = win.h;

    const onMove = (ev: PointerEvent) => {
      const nw = startW + (ev.clientX - startClientX);
      const nh = startH + (ev.clientY - startClientY);
      resizeWindow(win.id, nw, nh);
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  return (
    <motion.div
      className="window absolute"
      data-focused={focused}
      style={{ left: x, top: y, width, height, zIndex: win.z }}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 340, damping: 28 }}
      onMouseDown={() => !focused && focusWindow(win.id)}
    >
      <div
        className="window-title"
        onPointerDown={startDrag}
        onDoubleClick={() => toggleMaximize(win.id)}
      >
        <div className="font-medium tracking-wide truncate pr-2 pointer-events-none">
          {win.title}
        </div>
        <div className="flex items-center gap-1">
          <button
            className="win-ctrl"
            onClick={(e) => { e.stopPropagation(); toggleMinimize(win.id); }}
            aria-label="Minimize"
          >
            <Minus className="w-[18px] h-[18px]" strokeWidth={2.5} />
          </button>
          <button
            className="win-ctrl"
            onClick={(e) => { e.stopPropagation(); toggleMaximize(win.id); }}
            aria-label="Maximize"
          >
            <Square className="w-[15px] h-[15px]" strokeWidth={2.5} />
          </button>
          <button
            className="win-ctrl win-ctrl-close"
            onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}
            aria-label="Close"
          >
            <X className="w-[18px] h-[18px]" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="win-scroll overflow-auto h-[calc(100%-36px)] bg-surface text-surface-foreground">
        {children}
      </div>

      {!win.maximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-20 flex items-end justify-end"
          onPointerDown={startResize}
          title="Drag to resize"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" className="opacity-60">
            <path d="M0 10 L10 0 M4 10 L10 4 M8 10 L10 8" stroke="hsl(var(--ink))" strokeWidth="1.2" />
          </svg>
        </div>
      )}
    </motion.div>
  );
}
