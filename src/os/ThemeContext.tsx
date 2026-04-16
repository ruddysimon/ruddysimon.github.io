import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type ThemeColor = "khaki" | "violet" | "teal" | "magenta" | "lime" | "ember";
export type ThemeMode = "light" | "dark";

export const THEME_COLORS: { id: ThemeColor; label: string; swatch: string }[] = [
  { id: "khaki", label: "Desert Khaki", swatch: "hsl(42 62% 50%)" },
  { id: "ember", label: "Ember Orange", swatch: "hsl(18 82% 54%)" },
  { id: "magenta", label: "Hot Magenta", swatch: "hsl(330 82% 55%)" },
  { id: "violet", label: "Electric Violet", swatch: "hsl(262 83% 58%)" },
  { id: "teal", label: "Lagoon Teal", swatch: "hsl(176 68% 41%)" },
  { id: "lime", label: "Acid Lime", swatch: "hsl(78 72% 44%)" },
];

export const WALLPAPERS = [
  { id: "solid",  label: "Solid",    kind: "color" as const },
  { id: "dots",   label: "Dots",     kind: "pattern" as const },
  { id: "scan",   label: "Scanlines", kind: "pattern" as const },
  { id: "vid-1",  label: "Video 1",  kind: "video" as const, src: "/background-video.mp4" },
  { id: "vid-2",  label: "Video 2",  kind: "video" as const, src: "/background-video1.mp4" },
];

export type WallpaperId = typeof WALLPAPERS[number]["id"];

type ThemeCtx = {
  color: ThemeColor;
  mode: ThemeMode;
  wallpaper: string;
  setColor: (c: ThemeColor) => void;
  setMode: (m: ThemeMode) => void;
  setWallpaper: (w: string) => void;
};

const ThemeContext = createContext<ThemeCtx | null>(null);

const STORAGE_KEY = "ruddyos.theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [color, setColor] = useState<ThemeColor>("khaki");
  const [mode, setMode] = useState<ThemeMode>("light");
  const [wallpaper, setWallpaper] = useState<string>("dots");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.color) setColor(saved.color);
        if (saved.mode) setMode(saved.mode);
        if (saved.wallpaper) setWallpaper(saved.wallpaper);
      }
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = color;
    document.documentElement.dataset.mode = mode;
    document.documentElement.dataset.wallpaper = wallpaper;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ color, mode, wallpaper }));
  }, [color, mode, wallpaper]);

  return (
    <ThemeContext.Provider value={{ color, mode, wallpaper, setColor, setMode, setWallpaper }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
