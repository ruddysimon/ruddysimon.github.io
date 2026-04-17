import { createContext, useContext, useState, useCallback, ReactNode, ComponentType } from "react";

export type AppId = "about" | "experience" | "projects" | "books" | "resume" | "contact" | "settings" | "terminal" | "chatbot" | "travel";

export type AppDef = {
  id: AppId;
  title: string;
  icon: ComponentType<{ className?: string }>;
  Component: ComponentType;
  defaultSize?: { w: number; h: number };
  defaultPosition?: { x: number; y: number };
};

export type WindowState = {
  id: string;
  appId: AppId;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
};

type WMCtx = {
  apps: Record<AppId, AppDef>;
  windows: WindowState[];
  openApp: (appId: AppId) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  moveWindow: (id: string, x: number, y: number) => void;
  resizeWindow: (id: string, w: number, h: number) => void;
  toggleMinimize: (id: string) => void;
  toggleMaximize: (id: string) => void;
  activeId: string | null;
};

const WMContext = createContext<WMCtx | null>(null);

let nextZ = 10;
let nextId = 1;

export function WindowManagerProvider({
  apps,
  children,
}: {
  apps: Record<AppId, AppDef>;
  children: ReactNode;
}) {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const openApp = useCallback((appId: AppId) => {
    const app = apps[appId];
    if (!app) return;

    setWindows((prev) => {
      // If already open, just focus & unminimize it.
      const existing = prev.find((w) => w.appId === appId);
      if (existing) {
        const z = ++nextZ;
        setActiveId(existing.id);
        return prev.map((w) =>
          w.id === existing.id ? { ...w, z, minimized: false } : w
        );
      }

      const id = `win-${nextId++}`;
      const z = ++nextZ;
      const size = app.defaultSize ?? { w: 720, h: 520 };

      // Center on viewport (respecting menubar + dock), with a slight cascade offset.
      const menubarH = 36;
      const dockH = 72;
      const centerX = Math.max(16, (window.innerWidth - size.w) / 2);
      const centerY = Math.max(menubarH + 12, (window.innerHeight - size.h - dockH) / 2);
      const offset = (prev.length * 24) % 80;
      const pos = app.defaultPosition ?? {
        x: centerX + offset,
        y: centerY + offset,
      };
      setActiveId(id);
      return [
        ...prev,
        {
          id,
          appId,
          title: app.title,
          x: pos.x,
          y: pos.y,
          w: size.w,
          h: size.h,
          z,
          minimized: false,
          maximized: false,
        },
      ];
    });
  }, [apps]);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setActiveId((cur) => (cur === id ? null : cur));
  }, []);

  const focusWindow = useCallback((id: string) => {
    const z = ++nextZ;
    setActiveId(id);
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, z, minimized: false } : w)));
  }, []);

  const moveWindow = useCallback((id: string, x: number, y: number) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, x, y } : w)));
  }, []);

  const resizeWindow = useCallback((id: string, w: number, h: number) => {
    setWindows((prev) =>
      prev.map((win) =>
        win.id === id ? { ...win, w: Math.max(320, w), h: Math.max(240, h) } : win
      )
    );
  }, []);

  const toggleMinimize = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: !w.minimized } : w)));
  }, []);

  const toggleMaximize = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)));
  }, []);

  return (
    <WMContext.Provider
      value={{ apps, windows, openApp, closeWindow, focusWindow, moveWindow, resizeWindow, toggleMinimize, toggleMaximize, activeId }}
    >
      {children}
    </WMContext.Provider>
  );
}

export function useWM() {
  const ctx = useContext(WMContext);
  if (!ctx) throw new Error("useWM must be inside WindowManagerProvider");
  return ctx;
}
