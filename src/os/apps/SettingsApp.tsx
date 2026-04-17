import { useTheme, THEME_COLORS, WALLPAPERS, ThemeColor, ThemeMode, Overlay } from "../ThemeContext";
import { Play } from "lucide-react";

const INTER = "'Inter', system-ui, -apple-system, Helvetica, sans-serif";

const OVERLAYS: { id: Overlay; label: string }[] = [
  { id: "none", label: "None" },
  { id: "dots", label: "Dots" },
  { id: "scan", label: "Scanlines" },
];

export default function SettingsApp() {
  const { color, mode, wallpaper, overlay, setColor, setMode, setWallpaper, setOverlay } = useTheme();

  return (
    <div
      className="px-10 py-8 max-w-[680px] mx-auto"
      style={{ fontFamily: INTER, color: "hsl(var(--ink))" }}
    >
      <h1
        className="mb-8"
        style={{
          fontFamily: INTER,
          fontSize: "44px",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}
      >
        Settings
      </h1>

      <Card title="Appearance">
        <Label>Theme mode</Label>
        <div className="flex gap-2 mb-6">
          {(["light", "dark"] as ThemeMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="px-6 py-2.5 rounded-md transition-colors"
              style={{
                fontFamily: INTER,
                fontWeight: 500,
                fontSize: "14px",
                background: mode === m ? "hsl(var(--accent))" : "hsl(var(--cream-soft))",
                color: mode === m ? "hsl(var(--paper))" : "hsl(var(--ink))",
                border: `1px solid ${mode === m ? "hsl(var(--accent))" : "hsl(var(--ink) / 0.2)"}`,
              }}
            >
              {m === "light" ? "Light" : "Dark"}
            </button>
          ))}
        </div>

        <Label>Theme color</Label>
        <div className="flex flex-wrap gap-2.5">
          {THEME_COLORS.map((c) => {
            const selected = color === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setColor(c.id as ThemeColor)}
                className="flex items-center gap-2.5 rounded-md transition-colors"
                style={{
                  fontFamily: INTER,
                  fontWeight: 500,
                  fontSize: "14px",
                  background: "hsl(var(--cream-soft))",
                  color: "hsl(var(--ink))",
                  border: `${selected ? 2 : 1}px solid ${selected ? "hsl(var(--ink))" : "hsl(var(--ink) / 0.18)"}`,
                  padding: selected ? "9px 15px" : "10px 16px",
                }}
              >
                <span
                  className="w-[18px] h-[18px] rounded-[3px]"
                  style={{ background: c.swatch, border: "1px solid hsl(var(--ink) / 0.25)" }}
                />
                {c.label}
              </button>
            );
          })}
        </div>
      </Card>

      <Card title="Wallpaper">
        <p
          className="mb-5"
          style={{ fontFamily: INTER, fontSize: "14px", color: "hsl(var(--ink-soft))" }}
        >
          Choose a desktop background — solid color or one of the looping videos.
        </p>
        <div className="grid grid-cols-3 gap-3">
          {WALLPAPERS.map((w) => {
            const isSelected = wallpaper === w.id;
            return (
              <button
                key={w.id}
                onClick={() => setWallpaper(w.id)}
                className="rounded-md overflow-hidden text-left transition-colors"
                style={{
                  background: "hsl(var(--cream-soft))",
                  border: `${isSelected ? 2 : 1}px solid ${isSelected ? "hsl(var(--ink))" : "hsl(var(--ink) / 0.15)"}`,
                }}
              >
                <div className="h-24 w-full overflow-hidden relative" style={{ background: "hsl(var(--accent))" }}>
                  {w.kind === "video" && "src" in w && (
                    <>
                      <video
                        src={w.src}
                        muted
                        loop
                        playsInline
                        autoPlay
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-sm bg-ink/70 flex items-center justify-center">
                        <Play className="w-3 h-3 text-cream" />
                      </div>
                    </>
                  )}
                </div>
                <div
                  className="px-3 py-2.5"
                  style={{ fontFamily: INTER, fontWeight: 500, fontSize: "13px", color: "hsl(var(--ink))" }}
                >
                  {w.label}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-7">
          <Label>Pattern overlay</Label>
          <div className="flex gap-2.5">
            {OVERLAYS.map((o) => {
              const selected = overlay === o.id;
              return (
                <button
                  key={o.id}
                  onClick={() => setOverlay(o.id)}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-md transition-colors"
                  style={{
                    fontFamily: INTER,
                    fontWeight: 500,
                    fontSize: "14px",
                    background: selected ? "hsl(var(--accent))" : "hsl(var(--cream-soft))",
                    color: selected ? "hsl(var(--paper))" : "hsl(var(--ink))",
                    border: `1px solid ${selected ? "hsl(var(--accent))" : "hsl(var(--ink) / 0.2)"}`,
                  }}
                >
                  <OverlaySwatch id={o.id} active={selected} />
                  {o.label}
                </button>
              );
            })}
          </div>
          <p
            className="mt-3"
            style={{ fontFamily: INTER, fontSize: "12px", color: "hsl(var(--ink-soft))" }}
          >
            Adds a dot or scanline texture on top of the current wallpaper.
          </p>
        </div>
      </Card>

      <p
        className="mt-5"
        style={{ fontFamily: INTER, fontSize: "12px", color: "hsl(var(--ink-soft))" }}
      >
        RuddyOS — preferences saved locally in your browser.
      </p>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section
      className="rounded-md px-7 py-6 mb-5"
      style={{
        background: "hsl(var(--surface))",
        border: "1px solid hsl(var(--ink) / 0.18)",
      }}
    >
      <h2
        className="mb-5"
        style={{
          fontFamily: INTER,
          fontSize: "18px",
          fontWeight: 700,
          letterSpacing: "-0.005em",
          color: "hsl(var(--ink))",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mb-2.5"
      style={{ fontFamily: INTER, fontSize: "13px", fontWeight: 500, color: "hsl(var(--ink-soft))" }}
    >
      {children}
    </div>
  );
}

function OverlaySwatch({ id, active }: { id: Overlay; active: boolean }) {
  const fg = active ? "hsl(var(--paper))" : "hsl(var(--ink))";
  if (id === "none") {
    return (
      <span
        className="w-[18px] h-[18px] rounded-[3px] flex items-center justify-center"
        style={{ border: `1px solid ${fg}`, color: fg, fontSize: "10px", fontWeight: 700 }}
      >
        Ø
      </span>
    );
  }
  if (id === "dots") {
    return (
      <span
        className="w-[18px] h-[18px] rounded-[3px]"
        style={{
          backgroundImage: `radial-gradient(${fg} 1px, transparent 1.4px)`,
          backgroundSize: "4px 4px",
          border: `1px solid ${fg}`,
        }}
      />
    );
  }
  return (
    <span
      className="w-[18px] h-[18px] rounded-[3px]"
      style={{
        backgroundImage: `repeating-linear-gradient(180deg, ${fg} 0 1px, transparent 1px 3px)`,
        border: `1px solid ${fg}`,
      }}
    />
  );
}
