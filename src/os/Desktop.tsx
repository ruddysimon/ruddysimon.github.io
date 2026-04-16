import { useEffect } from "react";
import { useWM, AppId } from "./WindowManager";
import { useTheme, WALLPAPERS } from "./ThemeContext";
import Window from "./Window";
import DesktopWidgets from "./DesktopWidgets";

const DESKTOP_ICONS: { appId: AppId; label: string }[] = [
  { appId: "about", label: "about.txt" },
  { appId: "experience", label: "experience" },
  { appId: "projects", label: "projects" },
  { appId: "books", label: "library" },
  { appId: "resume", label: "resume.pdf" },
  { appId: "contact", label: "contact" },
];

export default function Desktop() {
  const { apps, windows, openApp } = useWM();
  const { wallpaper } = useTheme();

  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<AppId>;
      if (ce.detail) openApp(ce.detail);
    };
    window.addEventListener("ruddyos:open", handler);
    return () => window.removeEventListener("ruddyos:open", handler);
  }, [openApp]);

  const wp = WALLPAPERS.find((w) => w.id === wallpaper);
  const isVideo = wp?.kind === "video";

  return (
    <div className="fixed inset-0 pt-9 pb-20 overflow-hidden">
      {/* Wallpaper layer */}
      <div className="absolute inset-0 -z-10">
        {isVideo && "src" in wp! ? (
          <>
            <video
              key={wp.src}
              src={wp.src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            {/* tint the video with the accent color */}
            <div className="absolute inset-0 bg-accent/45 mix-blend-multiply" />
            <div className="absolute inset-0 bg-ink/20" />
          </>
        ) : (
          <div
            className={`w-full h-full ${wallpaper === "dots" ? "wallpaper-noise" : ""} ${wallpaper === "scan" ? "wallpaper-scan" : ""}`}
            style={{ background: "hsl(var(--accent))" }}
          />
        )}
      </div>

      {/* Desktop icons */}
      <div className="relative z-0 flex flex-col gap-1 pl-3 pt-3 w-[96px]">
        {DESKTOP_ICONS.map(({ appId, label }) => {
          const app = apps[appId];
          if (!app) return null;
          const Icon = app.icon;
          return (
            <button
              key={appId}
              className="os-icon"
              onDoubleClick={() => openApp(appId)}
              onClick={() => openApp(appId)}
            >
              <div className="pixel-folder flex items-center justify-center text-cream">
                <Icon className="w-6 h-6 relative z-10" strokeWidth={2} />
              </div>
              <span className="os-icon-label">{label}</span>
            </button>
          );
        })}
      </div>

      {/* Decorative widgets — sticky note + mini vinyl */}
      <DesktopWidgets />

      {/* Windows */}
      {windows.map((w) => {
        const app = apps[w.appId];
        const App = app.Component;
        return (
          <Window key={w.id} win={w}>
            <App />
          </Window>
        );
      })}
    </div>
  );
}
