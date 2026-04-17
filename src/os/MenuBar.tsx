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
        className="flex items-center justify-center w-8 h-7 rounded-sm bg-accent text-cream cursor-pointer"
        title="About Ruddy"
        onClick={() => openApp("about")}
      >
        <Disc3 className="w-[18px] h-[18px]" strokeWidth={2.2} />
      </div>
      <button className="menubar-item" style={{ fontWeight: 700 }} onClick={() => openApp("about")}>Portfolio</button>
      <button className="menubar-item" onClick={() => openApp("projects")}>Work</button>
      <button className="menubar-item" onClick={() => openApp("books")}>Library</button>
      <button className="menubar-item" onClick={() => openApp("contact")}>Contact</button>
      <div className="ml-auto flex items-center gap-4">
        <button
          className="menubar-item flex items-center gap-1"
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
          title="Toggle light/dark"
        >
          {mode === "light" ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
        </button>
        <div className="tabular-nums" style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: "13.5px", fontWeight: 500 }}>
          {day} · {time}
        </div>
      </div>
    </div>
  );
}
