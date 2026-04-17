import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type ThemeColor = "orange" | "green" | "blue" | "purple";
export type ThemeMode = "light" | "dark";
export type Overlay = "none" | "dots" | "scan";

export const THEME_COLORS: { id: ThemeColor; label: string; swatch: string }[] = [
  { id: "orange", label: "Orange", swatch: "hsl(18 82% 54%)" },
  { id: "green",  label: "Green",  swatch: "hsl(140 50% 42%)" },
  { id: "blue",   label: "Blue",   swatch: "hsl(220 75% 52%)" },
  { id: "purple", label: "Purple", swatch: "hsl(262 83% 58%)" },
];

export const WALLPAPERS = [
  { id: "solid",  label: "Solid color",  kind: "color" as const },
  { id: "vid-1",  label: "Sunset coast", kind: "video" as const, src: "/background-video.mp4" },
  { id: "vid-2",  label: "Ocean waves",  kind: "video" as const, src: "/background-video1.mp4" },
];

export type WallpaperId = typeof WALLPAPERS[number]["id"];

type ThemeCtx = {
  color: ThemeColor;
  mode: ThemeMode;
  wallpaper: string;
  overlay: Overlay;
  setColor: (c: ThemeColor) => void;
  setMode: (m: ThemeMode) => void;
  setWallpaper: (w: string) => void;
  setOverlay: (o: Overlay) => void;
};

const ThemeContext = createContext<ThemeCtx | null>(null);

const STORAGE_KEY = "ruddyos.theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [color, setColor] = useState<ThemeColor>("orange");
  const [mode, setMode] = useState<ThemeMode>("light");
  const [wallpaper, setWallpaper] = useState<string>("vid-1");
  const [overlay, setOverlay] = useState<Overlay>("none");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.color) setColor(saved.color);
        if (saved.mode) setMode(saved.mode);
        if (saved.wallpaper) setWallpaper(saved.wallpaper);
        if (saved.overlay) setOverlay(saved.overlay);
      }
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = color;
    document.documentElement.dataset.mode = mode;
    document.documentElement.dataset.wallpaper = wallpaper;
    document.documentElement.dataset.overlay = overlay;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ color, mode, wallpaper, overlay }));
  }, [color, mode, wallpaper, overlay]);

  return (
    <ThemeContext.Provider value={{ color, mode, wallpaper, overlay, setColor, setMode, setWallpaper, setOverlay }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
