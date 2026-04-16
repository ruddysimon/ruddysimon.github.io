import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = { onDone: () => void };

const NAME_WORDS = ["Ruddy", "Simonpour"];

export default function BootScreen({ onDone }: Props) {
  const [phase, setPhase] = useState<"black" | "name" | "exit">("black");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("name"), 250);
    const t2 = setTimeout(() => setPhase("exit"), 2800);
    const t3 = setTimeout(() => onDone(), 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black"
          style={{ fontFamily: '"Inter", system-ui, sans-serif' }}
        >
          {phase === "name" && (
            <div
              className="flex items-center gap-[0.4em] text-[12px] md:text-[14px] font-medium uppercase"
              style={{
                color: "hsl(0 0% 85%)",
                letterSpacing: "0.22em",
              }}
            >
              {NAME_WORDS.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15 + i * 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
