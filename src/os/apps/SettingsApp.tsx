import { useTheme, THEME_COLORS, WALLPAPERS, ThemeColor, ThemeMode } from "../ThemeContext";
import { Check, Monitor, Sun, Moon, Play } from "lucide-react";

export default function SettingsApp() {
  const { color, mode, wallpaper, setColor, setMode, setWallpaper } = useTheme();

  return (
    <div className="p-7 md:p-8 max-w-2xl">
      <div className="flex items-center gap-2 mb-4 text-xs text-ink-soft">
        <span className="chip-os">Settings</span>
      </div>
      <h1 className="text-2xl md:text-3xl mb-6 leading-tight">
        Make it <span className="text-accent">yours.</span>
      </h1>

      {/* Appearance mode */}
      <section className="mb-7">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-soft mb-3">Appearance</h2>
        <div className="flex gap-2">
          {(["light", "dark"] as ThemeMode[]).map((m) => (
            <button
              key={m}
              className={`flex items-center gap-2 px-4 py-2 rounded-sm text-xs border transition-colors ${
                mode === m
                  ? "bg-accent text-cream border-accent"
                  : "bg-cream-soft text-ink border-ink/20 hover:border-accent"
              }`}
              onClick={() => setMode(m)}
            >
              {m === "light" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              {m === "light" ? "Light" : "Dark"}
            </button>
          ))}
        </div>
      </section>

      {/* Theme color */}
      <section className="mb-7">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-soft mb-3">Theme color</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {THEME_COLORS.map((c) => (
            <button
              key={c.id}
              onClick={() => setColor(c.id as ThemeColor)}
              className={`flex items-center gap-2 p-2.5 rounded-sm text-xs border transition-colors text-left ${
                color === c.id ? "border-ink bg-cream-soft" : "border-ink/20 bg-surface hover:border-accent"
              }`}
            >
              <span className="w-5 h-5 rounded-sm border border-ink/20" style={{ background: c.swatch }} />
              <span className="flex-1 truncate">{c.label}</span>
              {color === c.id && <Check className="w-3.5 h-3.5 text-accent" />}
            </button>
          ))}
        </div>
      </section>

      {/* Wallpaper */}
      <section className="mb-7">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-soft mb-3">Wallpaper</h2>
        <div className="grid grid-cols-3 gap-2">
          {WALLPAPERS.map((w) => {
            const isSelected = wallpaper === w.id;
            return (
              <button
                key={w.id}
                onClick={() => setWallpaper(w.id)}
                className={`rounded-sm overflow-hidden border transition-colors text-left relative ${
                  isSelected ? "border-ink" : "border-ink/20 hover:border-accent"
                }`}
              >
                <div className="h-16 w-full overflow-hidden relative bg-accent">
                  {w.kind === "pattern" && w.id === "dots" && (
                    <div className="absolute inset-0 wallpaper-noise" />
                  )}
                  {w.kind === "pattern" && w.id === "scan" && (
                    <div className="absolute inset-0 wallpaper-scan" />
                  )}
                  {w.kind === "video" && "src" in w && (
                    <>
                      <video src={w.src} muted loop playsInline autoPlay className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-accent/40 mix-blend-multiply" />
                      <div className="absolute top-1 right-1 w-4 h-4 rounded-sm bg-ink/80 flex items-center justify-center">
                        <Play className="w-2.5 h-2.5 text-cream" />
                      </div>
                    </>
                  )}
                </div>
                <div className="px-2 py-1.5 text-[10px] flex items-center justify-between bg-cream-soft">
                  <span>{w.label}</span>
                  {isSelected && <Check className="w-3 h-3 text-accent" />}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <div className="flex items-center gap-2 text-[11px] text-ink-soft pt-4 border-t border-ink/10">
        <Monitor className="w-3.5 h-3.5" />
        RuddyOS v1.0 — preferences saved locally.
      </div>
    </div>
  );
}
