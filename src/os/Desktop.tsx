import { useEffect } from "react";
import { useWM, AppId } from "./WindowManager";
import { useTheme, WALLPAPERS } from "./ThemeContext";
import Window from "./Window";
import DesktopWidgets from "./DesktopWidgets";
import Win98Folder from "./Win98Folder";
import Win98DocFolder from "./Win98DocFolder";
import Win98TextFile from "./Win98TextFile";

const DESKTOP_ICONS: { appId: AppId; label: string }[] = [
  { appId: "about", label: "about.txt" },
  { appId: "experience", label: "experience" },
  { appId: "projects", label: "projects" },
  { appId: "books", label: "library" },
  { appId: "travel", label: "travel" },
  { appId: "games", label: "games" },
  { appId: "resume", label: "resume.pdf" },
  { appId: "contact", label: "contact" },
];

export default function Desktop() {
  const { apps, windows, openApp } = useWM();
  const { wallpaper, overlay } = useTheme();

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
    <div className="fixed inset-0 pb-12 overflow-hidden">
      {/* Wallpaper layer */}
      <div className="absolute inset-0 -z-10">
        {isVideo && wp && "src" in wp ? (
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
            <div className="absolute inset-0 bg-accent/45 mix-blend-multiply" />
            <div className="absolute inset-0 bg-ink/20" />
          </>
        ) : wp?.kind === "image" && "src" in wp ? (
          <>
            <img
              key={wp.src}
              src={wp.src}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-ink/30" />
          </>
        ) : (
          <div
            className="w-full h-full"
            style={{ background: "hsl(var(--accent))" }}
          />
        )}

        {/* Pattern overlay — sits ON TOP of the active wallpaper (video or solid) */}
        {overlay === "dots" && <div className="absolute inset-0 wallpaper-noise pointer-events-none" />}
        {overlay === "scan" && <div className="absolute inset-0 wallpaper-scan pointer-events-none" />}
      </div>

      {/* Desktop icons */}
      <div className="relative z-0 flex flex-col gap-1 pl-3 pt-3 w-[96px]">
        {DESKTOP_ICONS.map(({ appId, label }) => {
          const app = apps[appId];
          if (!app) return null;
          return (
            <button
              key={appId}
              className="os-icon"
              onDoubleClick={() => openApp(appId)}
              onClick={() => openApp(appId)}
            >
              {appId === "resume" ? (
                <Win98DocFolder />
              ) : appId === "about" ? (
                <Win98TextFile />
              ) : (
                <Win98Folder />
              )}
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
