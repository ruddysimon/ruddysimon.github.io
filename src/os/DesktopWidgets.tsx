import { motion } from "framer-motion";
import { useState } from "react";
import { X, MessageCircle } from "lucide-react";
import { useWM } from "./WindowManager";

/**
 * Desktop widgets — personal touches on top of the wallpaper.
 * - Chat face: click to open the AI chatbot.
 * - Sticky note: draggable welcome message.
 */
export default function DesktopWidgets() {
  const [showNote, setShowNote] = useState(true);
  const { openApp } = useWM();

  return (
    <>
      {/* Chat-with-me face button — replaces the old vinyl */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => openApp("chatbot")}
        className="absolute bottom-28 right-10 group"
        aria-label="Chat with RuddyBot"
      >
        <div className="relative">
          {/* Head — uses fixed paper/ink so it stays consistent across light+dark modes */}
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center relative overflow-hidden"
            style={{
              background: "hsl(var(--paper))",
              border: "2.5px solid hsl(var(--paper-ink))",
            }}
          >
            {/* Eyes */}
            <div className="flex gap-3 mt-2">
              <motion.span
                animate={{ scaleY: [1, 1, 0.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, times: [0, 0.9, 0.95, 1] }}
                className="block w-2.5 h-3.5 rounded-full"
                style={{ background: "hsl(var(--paper-ink))" }}
              />
              <motion.span
                animate={{ scaleY: [1, 1, 0.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, times: [0, 0.9, 0.95, 1] }}
                className="block w-2.5 h-3.5 rounded-full"
                style={{ background: "hsl(var(--paper-ink))" }}
              />
            </div>
            {/* Smile */}
            <svg
              className="absolute bottom-5"
              width="36"
              height="16"
              viewBox="0 0 36 16"
              fill="none"
            >
              <path d="M2 2 Q18 16 34 2" stroke="hsl(var(--paper-ink))" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            {/* Cheek blush */}
            <span
              className="absolute bottom-7 left-2 w-2 h-1 rounded-full opacity-70"
              style={{ background: "hsl(var(--accent))" }}
            />
            <span
              className="absolute bottom-7 right-2 w-2 h-1 rounded-full opacity-70"
              style={{ background: "hsl(var(--accent))" }}
            />
          </div>

          {/* Floating chat bubble */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-3 -right-4 flex items-center gap-1 px-2 py-1 rounded-full"
            style={{
              background: "hsl(var(--accent))",
              color: "hsl(var(--paper))",
              border: "2px solid hsl(var(--paper-ink))",
              fontSize: "10px",
              fontWeight: 600,
            }}
          >
            <MessageCircle className="w-3 h-3" strokeWidth={2.5} />
            chat
          </motion.div>
        </div>
        <p
          className="mt-2 text-center text-[10px] tracking-[0.2em] uppercase font-medium"
          style={{ color: "hsl(var(--paper))" }}
        >
          ask ruddybot
        </p>
      </motion.button>

      {/* Sticky note — fixed yellow paper + dark ink in both light and dark modes */}
      {showNote && (
        <motion.div
          initial={{ opacity: 0, y: -8, rotate: -3 }}
          animate={{ opacity: 1, y: 0, rotate: -3 }}
          drag
          dragMomentum={false}
          whileDrag={{ scale: 1.04, rotate: 0, cursor: "grabbing" }}
          className="absolute top-14 right-10 w-56 p-3 pr-5 rounded-sm cursor-grab z-[1]"
          style={{
            background: "hsl(48 92% 78%)",
            color: "hsl(var(--paper-ink))",
            border: "1.5px solid hsl(var(--paper-ink) / 0.7)",
            boxShadow: "4px 4px 0 0 hsl(var(--paper-ink) / 0.55)",
          }}
        >
          <button
            onClick={() => setShowNote(false)}
            className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center"
            style={{ color: "hsl(var(--paper-ink))" }}
            aria-label="Dismiss"
          >
            <X className="w-3 h-3" />
          </button>
          <p className="font-pixel text-lg leading-tight">hey —</p>
          <p className="text-[11px] leading-relaxed mt-1">
            welcome to my desktop. double-click an icon, drag windows around,
            or open <strong>Settings</strong> to pick your vibe.
          </p>
          <p className="text-[10px] mt-2 opacity-70 italic">— r.</p>
        </motion.div>
      )}
    </>
  );
}
