import { useTheme, THEME_COLORS, WALLPAPERS, ThemeColor, Overlay, Shuffle } from "../ThemeContext";
import { Play, Image, Shuffle as ShuffleIcon, Video, Images } from "lucide-react";

const SERIF = '"Newsreader", Georgia, "Times New Roman", serif';

const OVERLAYS: { id: Overlay; label: string }[] = [
  { id: "none", label: "None" },
  { id: "dots", label: "Dots" },
  { id: "scan", label: "Scanlines" },
];

const SHUFFLE_OPTIONS: { id: Shuffle; label: string }[] = [
  { id: "off",    label: "Off" },
  { id: "videos", label: "Shuffle videos" },
  { id: "photos", label: "Shuffle photos" },
];

export default function SettingsApp() {
  const { color, wallpaper, overlay, shuffle, setColor, setWallpaper, setOverlay, setShuffle } = useTheme();

  return (
    <div
      className="px-10 py-8 max-w-[680px] mx-auto"
      style={{ fontFamily: SERIF, color: "hsl(var(--ink))" }}
    >
      <h1
        className="mb-7"
        style={{
          fontFamily: SERIF,
          fontSize: "38px",
          fontWeight: 400,
          letterSpacing: "-0.01em",
          lineHeight: 1.1,
        }}
      >
        Settings
      </h1>

      <Card title="Appearance">
        <Label>Theme color</Label>
        <div className="flex flex-wrap gap-2">
          {THEME_COLORS.map((c) => {
            const selected = color === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setColor(c.id as ThemeColor)}
                className="flex items-center gap-2 rounded-sm transition-colors"
                style={{
                  fontFamily: SERIF,
                  fontWeight: 400,
                  fontSize: "14px",
                  background: "hsl(var(--cream-soft))",
                  color: "hsl(var(--ink))",
                  border: `${selected ? 1.5 : 1}px solid ${selected ? "hsl(var(--ink))" : "hsl(var(--ink) / 0.22)"}`,
                  padding: selected ? "5.5px 11px" : "6px 12px",
                }}
              >
                <span
                  className="w-[14px] h-[14px] rounded-[2px]"
                  style={{ background: c.swatch, border: "1px solid hsl(var(--ink) / 0.3)" }}
                />
                {c.label}
              </button>
            );
          })}
        </div>
      </Card>

      <Card title="Wallpaper">
        <p
          className="mb-4"
          style={{ fontFamily: SERIF, fontSize: "14px", fontWeight: 400, color: "hsl(var(--ink-soft))" }}
        >
          Choose a desktop background — solid color, looping video, or travel photo.
        </p>

        {/* Videos + solid */}
        <Label>Built-in</Label>
        <div className="grid grid-cols-3 gap-3 mb-5">
          {WALLPAPERS.filter((w) => w.kind !== "image").map((w) => {
            const isSelected = wallpaper === w.id;
            return (
              <button
                key={w.id}
                onClick={() => setWallpaper(w.id)}
                className="rounded-sm overflow-hidden text-left transition-colors"
                style={{
                  background: "hsl(var(--cream-soft))",
                  border: `${isSelected ? 1.5 : 1}px solid ${isSelected ? "hsl(var(--ink))" : "hsl(var(--ink) / 0.18)"}`,
                }}
              >
                <div className="h-20 w-full overflow-hidden relative" style={{ background: "hsl(var(--accent))" }}>
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
                      <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-sm bg-ink/70 flex items-center justify-center">
                        <Play className="w-2.5 h-2.5 text-cream" />
                      </div>
                    </>
                  )}
                </div>
                <div
                  className="px-2.5 py-2"
                  style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "13px", color: "hsl(var(--ink))" }}
                >
                  {w.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* Travel photos */}
        <Label>Travel photos</Label>
        <div className="grid grid-cols-3 gap-3">
          {WALLPAPERS.filter((w) => w.kind === "image").map((w) => {
            const isSelected = wallpaper === w.id;
            return (
              <button
                key={w.id}
                onClick={() => setWallpaper(w.id)}
                className="rounded-sm overflow-hidden text-left transition-colors"
                style={{
                  background: "hsl(var(--cream-soft))",
                  border: `${isSelected ? 1.5 : 1}px solid ${isSelected ? "hsl(var(--ink))" : "hsl(var(--ink) / 0.18)"}`,
                }}
              >
                <div className="h-20 w-full overflow-hidden relative" style={{ background: "hsl(var(--cream))" }}>
                  {"src" in w && (
                    <>
                      <img
                        src={w.src}
                        alt={w.label}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-sm bg-ink/70 flex items-center justify-center">
                        <Image className="w-2.5 h-2.5 text-cream" />
                      </div>
                    </>
                  )}
                </div>
                <div
                  className="px-2.5 py-2"
                  style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "13px", color: "hsl(var(--ink))" }}
                >
                  {w.label}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6">
          <Label>Shuffle mode</Label>
          <div className="flex flex-wrap gap-2">
            {SHUFFLE_OPTIONS.map((s) => {
              const selected = shuffle === s.id;
              const Icon = s.id === "videos" ? Video : s.id === "photos" ? Images : ShuffleIcon;
              return (
                <button
                  key={s.id}
                  onClick={() => setShuffle(s.id)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-sm transition-colors"
                  style={{
                    fontFamily: SERIF,
                    fontWeight: 400,
                    fontSize: "14px",
                    background: selected ? "hsl(var(--accent))" : "hsl(var(--cream-soft))",
                    color: selected ? "hsl(var(--paper))" : "hsl(var(--ink))",
                    border: `1px solid ${selected ? "hsl(var(--accent))" : "hsl(var(--ink) / 0.25)"}`,
                  }}
                >
                  <Icon className="w-[14px] h-[14px]" />
                  {s.label}
                </button>
              );
            })}
          </div>
          <p
            className="mt-2.5"
            style={{ fontFamily: SERIF, fontSize: "12px", fontStyle: "italic", color: "hsl(var(--ink-soft))" }}
          >
            Rotates through the selected pool every 7 seconds with a smooth crossfade.
          </p>
        </div>

        <div className="mt-6">
          <Label>Pattern overlay</Label>
          <div className="flex gap-2">
            {OVERLAYS.map((o) => {
              const selected = overlay === o.id;
              return (
                <button
                  key={o.id}
                  onClick={() => setOverlay(o.id)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-sm transition-colors"
                  style={{
                    fontFamily: SERIF,
                    fontWeight: 400,
                    fontSize: "14px",
                    background: selected ? "hsl(var(--accent))" : "hsl(var(--cream-soft))",
                    color: selected ? "hsl(var(--paper))" : "hsl(var(--ink))",
                    border: `1px solid ${selected ? "hsl(var(--accent))" : "hsl(var(--ink) / 0.25)"}`,
                  }}
                >
                  <OverlaySwatch id={o.id} active={selected} />
                  {o.label}
                </button>
              );
            })}
          </div>
          <p
            className="mt-2.5"
            style={{ fontFamily: SERIF, fontSize: "12px", fontStyle: "italic", color: "hsl(var(--ink-soft))" }}
          >
            Adds a dot or scanline texture on top of the current wallpaper.
          </p>
        </div>
      </Card>

      <p
        className="mt-4"
        style={{ fontFamily: SERIF, fontSize: "12px", fontStyle: "italic", color: "hsl(var(--ink-soft))" }}
      >
        RuddyOS — preferences saved locally in your browser.
      </p>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section
      className="rounded-sm px-6 py-5 mb-4"
      style={{
        background: "hsl(var(--surface))",
        border: "1px solid hsl(var(--ink) / 0.22)",
      }}
    >
      <h2
        className="mb-4"
        style={{
          fontFamily: SERIF,
          fontSize: "20px",
          fontWeight: 400,
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
      className="mb-2"
      style={{ fontFamily: SERIF, fontSize: "13px", fontWeight: 400, fontStyle: "italic", color: "hsl(var(--ink-soft))" }}
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
        className="w-[14px] h-[14px] rounded-[2px] flex items-center justify-center"
        style={{ border: `1px solid ${fg}`, color: fg, fontSize: "9px", fontWeight: 400 }}
      >
        Ø
      </span>
    );
  }
  if (id === "dots") {
    return (
      <span
        className="w-[14px] h-[14px] rounded-[2px]"
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
      className="w-[14px] h-[14px] rounded-[2px]"
      style={{
        backgroundImage: `repeating-linear-gradient(180deg, ${fg} 0 1px, transparent 1px 3px)`,
        border: `1px solid ${fg}`,
      }}
    />
  );
}
