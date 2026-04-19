import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = { onDone: () => void };

const NAME_WORDS = ["Ruddy", "Simonpour"];
const SERIF = '"Newsreader", Georgia, "Times New Roman", serif';

export default function BootScreen({ onDone }: Props) {
  const [phase, setPhase] = useState<"black" | "name" | "exit">("black");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("name"), 400);
    const t2 = setTimeout(() => setPhase("exit"), 5200);
    const t3 = setTimeout(() => onDone(), 6400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black"
        >
          {phase === "name" && (
            <motion.div
              className="flex items-baseline gap-[0.35em]"
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: "clamp(34px, 5.5vw, 64px)",
                letterSpacing: "-0.01em",
                lineHeight: 1,
                color: "hsl(40 28% 92%)",
              }}
            >
              {NAME_WORDS.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 1.3,
                    delay: 0.2 + i * 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
