import { useState } from "react";
import { motion } from "framer-motion";
import { ThemeProvider } from "@/os/ThemeContext";
import { WindowManagerProvider } from "@/os/WindowManager";
import { APPS } from "@/os/apps/registry";
import MenuBar from "@/os/MenuBar";
import Desktop from "@/os/Desktop";
import Dock from "@/os/Dock";
import BootScreen from "@/os/BootScreen";

export default function Index() {
  const [booted, setBooted] = useState(false);

  return (
    <ThemeProvider>
      <WindowManagerProvider apps={APPS}>
        <div className="h-screen w-screen overflow-hidden bg-background text-foreground relative">
          {!booted && <BootScreen onDone={() => setBooted(true)} />}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: booted ? 1 : 0, scale: booted ? 1 : 0.98 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <MenuBar />
            <Desktop />
            <Dock />
          </motion.div>
        </div>
      </WindowManagerProvider>
    </ThemeProvider>
  );
}
