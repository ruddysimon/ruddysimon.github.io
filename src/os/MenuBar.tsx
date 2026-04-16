import { useEffect, useState } from "react";
import { Sun, Moon, Disc3 } from "lucide-react";
import { useTheme } from "./ThemeContext";
import { useWM } from "./WindowManager";

export default function MenuBar() {
  const [now, setNow] = useState(new Date());
  const { mode, setMode } = useTheme();
  const { openApp } = useWM();

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(t);
  }, []);

  const day = now.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" });
  const time = now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="menubar fixed top-0 inset-x-0 z-[10000]">
      <div
        className="flex items-center justify-center w-7 h-6 rounded-sm bg-accent text-cream cursor-pointer"
        title="About Ruddy"
        onClick={() => openApp("about")}
      >
        <Disc3 className="w-4 h-4" strokeWidth={2.2} />
      </div>
      <button className="menubar-item font-semibold" onClick={() => openApp("about")}>Portfolio</button>
      <button className="menubar-item" onClick={() => openApp("projects")}>Work</button>
      <button className="menubar-item" onClick={() => openApp("books")}>Library</button>
      <button className="menubar-item" onClick={() => openApp("contact")}>Contact</button>
      <div className="ml-auto flex items-center gap-3">
        <button
          className="menubar-item flex items-center gap-1"
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
          title="Toggle light/dark"
        >
          {mode === "light" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <div className="text-[13px] tabular-nums">{day} · {time}</div>
      </div>
    </div>
  );
}
