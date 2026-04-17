import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import { useWM } from "./WindowManager";
import HappyMacIcon from "./apps/HappyMacIcon";

/**
 * Desktop widgets — personal touches on top of the wallpaper.
 * - Chat computer: click to open Simon (AI chatbot).
 * - Sticky note: draggable, pinned, with sticker.
 */
export default function DesktopWidgets() {
  const [showNote, setShowNote] = useState(true);
  const { openApp } = useWM();

  return (
    <>
      {/* Chat-with-me pixel CRT — click to open Simon */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => openApp("chatbot")}
        className="absolute bottom-28 right-10 group"
        aria-label="Chat with Simon"
      >
        <div className="relative">
          <HappyMacIcon className="w-[104px] h-[118px]" />

          {/* Pixel speech balloon — sharp corners, Win98 dialog style */}
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-3 -right-6 px-2 py-0.5"
            style={{
              background: "hsl(var(--cream))",
              color: "hsl(var(--ink))",
              border: "2px solid hsl(var(--ink))",
              borderTopColor: "hsl(var(--bevel-light))",
              borderLeftColor: "hsl(var(--bevel-light))",
              boxShadow: "inset -1px -1px 0 0 hsl(var(--ink)), 2px 2px 0 0 hsl(var(--ink))",
              fontFamily: "var(--font-win98)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            hi!
          </motion.div>
        </div>
        <p
          className="mt-2 text-center text-[10px] tracking-[0.2em] uppercase"
          style={{ color: "hsl(var(--paper))", fontFamily: "var(--font-win98)" }}
        >
          ask simon
        </p>
      </motion.button>

      {/* Sticky note — pinned with red thumbtack + floppy sticker */}
      {showNote && (
        <motion.div
          initial={{ opacity: 0, y: -8, rotate: -3 }}
          animate={{ opacity: 1, y: 0, rotate: -3 }}
          drag
          dragMomentum={false}
          whileDrag={{ scale: 1.04, rotate: 0, cursor: "grabbing" }}
          className="absolute top-14 right-10 w-56 p-3 pt-5 pr-5 cursor-grab z-[1]"
          style={{
            background: "hsl(48 92% 78%)",
            color: "hsl(var(--paper-ink))",
            border: "1.5px solid hsl(var(--paper-ink) / 0.7)",
            boxShadow: "4px 4px 0 0 hsl(var(--paper-ink) / 0.55)",
            borderRadius: 0,
          }}
        >
          {/* Red pushpin at top center — pixel style, sharp */}
          <svg
            viewBox="0 0 16 20"
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-7"
            shapeRendering="crispEdges"
            style={{ filter: "drop-shadow(1px 2px 0 hsl(var(--paper-ink) / 0.45))" }}
          >
            {/* pin head */}
            <rect x="4" y="1" width="8" height="6" fill="#D64545" />
            <rect x="4" y="1" width="8" height="1" fill="#F28A8A" />
            <rect x="4" y="1" width="1" height="6" fill="#F28A8A" />
            <rect x="4" y="6" width="8" height="1" fill="#8B1E1E" />
            <rect x="11" y="1" width="1" height="6" fill="#8B1E1E" />
            <rect x="3" y="2" width="1" height="4" fill="#1A1832" />
            <rect x="12" y="2" width="1" height="4" fill="#1A1832" />
            <rect x="4" y="0" width="8" height="1" fill="#1A1832" />
            <rect x="4" y="7" width="8" height="1" fill="#1A1832" />
            {/* highlight dot */}
            <rect x="6" y="2" width="2" height="2" fill="#FFD4D4" />
            {/* needle */}
            <rect x="7" y="7" width="2" height="1" fill="#1A1832" />
            <rect x="7" y="8" width="2" height="10" fill="#B8B8B8" />
            <rect x="7" y="8" width="1" height="10" fill="#E0E0E0" />
            <rect x="8" y="8" width="1" height="10" fill="#6A6A6A" />
            <rect x="7" y="18" width="1" height="1" fill="#1A1832" />
          </svg>

          <button
            onClick={() => setShowNote(false)}
            className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center"
            style={{
              color: "hsl(var(--paper-ink))",
              border: "1px solid hsl(var(--paper-ink) / 0.5)",
              background: "hsl(48 92% 85%)",
              borderRadius: 0,
            }}
            aria-label="Dismiss"
          >
            <X className="w-2.5 h-2.5" strokeWidth={3} />
          </button>

          <p className="font-pixel text-lg leading-tight">hey —</p>
          <p className="text-[11px] leading-relaxed mt-1">
            welcome to my desktop. double-click an icon, drag windows around,
            or open <strong>Settings</strong> to pick your vibe.
          </p>
          <p className="text-[10px] mt-2 opacity-70 italic">— r.</p>

          {/* Floppy disk sticker — bottom-right corner */}
          <svg
            viewBox="0 0 20 20"
            className="absolute -bottom-3 -right-3 w-10 h-10"
            shapeRendering="crispEdges"
            style={{
              filter: "drop-shadow(2px 2px 0 hsl(var(--paper-ink) / 0.5))",
              transform: "rotate(12deg)",
            }}
          >
            {/* shell */}
            <rect x="1" y="1" width="18" height="18" fill="#1A1832" />
            <rect x="2" y="2" width="16" height="16" fill="#3A6FB0" />
            {/* metal shutter */}
            <rect x="6" y="2" width="10" height="7" fill="#B8B8B8" />
            <rect x="6" y="2" width="10" height="1" fill="#E0E0E0" />
            <rect x="6" y="8" width="10" height="1" fill="#6A6A6A" />
            <rect x="9" y="4" width="1" height="4" fill="#1A1832" />
            {/* label area */}
            <rect x="3" y="10" width="14" height="7" fill="#F0EAD6" />
            <rect x="3" y="10" width="14" height="1" fill="#FFFFFF" />
            {/* label lines (text) */}
            <rect x="5" y="12" width="8" height="1" fill="#1A1832" opacity="0.7" />
            <rect x="5" y="14" width="10" height="1" fill="#1A1832" opacity="0.5" />
            <rect x="5" y="16" width="6" height="1" fill="#1A1832" opacity="0.5" />
          </svg>
        </motion.div>
      )}
    </>
  );
}
