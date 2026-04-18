import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type ThemeColor = "orange" | "green" | "blue" | "purple";
export type Overlay = "none" | "dots" | "scan";

export const THEME_COLORS: { id: ThemeColor; label: string; swatch: string }[] = [
  { id: "orange", label: "Orange", swatch: "hsl(18 82% 54%)" },
  { id: "green",  label: "Green",  swatch: "hsl(140 50% 42%)" },
  { id: "blue",   label: "Blue",   swatch: "hsl(220 75% 52%)" },
  { id: "purple", label: "Purple", swatch: "hsl(262 83% 58%)" },
];

export const WALLPAPERS = [
  { id: "solid",    label: "Solid color",  kind: "color" as const },
  { id: "vid-1",    label: "Sunset coast", kind: "video" as const, src: "/background-video.mp4" },
  { id: "vid-2",    label: "Ocean waves",  kind: "video" as const, src: "/background-video1.mp4" },
  { id: "iran-1",   label: "Iran I",       kind: "image" as const, src: "/travel/iran/1.jpg" },
  { id: "iran-2",   label: "Iran II",      kind: "image" as const, src: "/travel/iran/2.jpg" },
  { id: "egypt-1",  label: "Egypt I",      kind: "image" as const, src: "/travel/egypt/lea-kobal-UlHxDEtBDM0-unsplash.jpg" },
  { id: "egypt-2",  label: "Egypt II",     kind: "image" as const, src: "/travel/egypt/osama-elsayed-vqRMXgVtGXM-unsplash.jpg" },
  { id: "japan-1",   label: "Japan",         kind: "image" as const, src: "/travel/japan/zhen-yao-_HknCS79FG4-unsplash.jpg" },
  { id: "amalfi-1",  label: "Amalfi I",      kind: "image" as const, src: "/travel/amalfi%20coast/1.jpg" },
  { id: "amalfi-2",  label: "Amalfi II",     kind: "image" as const, src: "/travel/amalfi%20coast/2.jpg" },
  { id: "amalfi-3",  label: "Amalfi III",    kind: "image" as const, src: "/travel/amalfi%20coast/3.jpg" },
  { id: "vibe-1",    label: "Vibe I",        kind: "image" as const, src: "/travel/vibe/caroline-badran-Qe8eMrwTW5g-unsplash.jpg" },
  { id: "vibe-2",    label: "Vibe II",       kind: "image" as const, src: "/travel/vibe/clay-banks-HiIo-viWU40-unsplash.jpg" },
];

export type WallpaperId = typeof WALLPAPERS[number]["id"];

type ThemeCtx = {
  color: ThemeColor;
  wallpaper: string;
  overlay: Overlay;
  setColor: (c: ThemeColor) => void;
  setWallpaper: (w: string) => void;
  setOverlay: (o: Overlay) => void;
};

const ThemeContext = createContext<ThemeCtx | null>(null);

const STORAGE_KEY = "ruddyos.theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [color, setColor] = useState<ThemeColor>("orange");
  const [wallpaper, setWallpaper] = useState<string>("vid-1");
  const [overlay, setOverlay] = useState<Overlay>("none");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.color) setColor(saved.color);
        if (saved.wallpaper) setWallpaper(saved.wallpaper);
        if (saved.overlay) setOverlay(saved.overlay);
      }
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = color;
    document.documentElement.dataset.wallpaper = wallpaper;
    document.documentElement.dataset.overlay = overlay;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ color, wallpaper, overlay }));
  }, [color, wallpaper, overlay]);

  return (
    <ThemeContext.Provider value={{ color, wallpaper, overlay, setColor, setWallpaper, setOverlay }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
