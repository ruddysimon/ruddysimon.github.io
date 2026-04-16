import { useWM, AppId } from "./WindowManager";

// Only items that are NOT already on the desktop.
const DOCK_APPS: AppId[] = ["terminal", "settings"];

export default function Dock() {
  const { apps, windows, openApp, focusWindow } = useWM();

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[9999]">
      <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-surface/90 backdrop-blur-md border border-ink/25 shadow-[0_8px_24px_-8px_hsl(var(--ink)/0.5)]">
        {DOCK_APPS.map((id) => {
          const app = apps[id];
          if (!app) return null;
          const Icon = app.icon;
          const openWin = windows.find((w) => w.appId === id);
          const active = !!openWin && !openWin.minimized;

          return (
            <button
              key={id}
              className="dock-item"
              data-active={!!openWin}
              title={app.title}
              onClick={() => {
                if (openWin) {
                  focusWindow(openWin.id);
                } else {
                  openApp(id);
                }
              }}
            >
              <Icon className="w-5 h-5" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
