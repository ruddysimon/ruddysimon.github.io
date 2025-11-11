import { useState, useEffect } from "react";

export function useScrollFade() {
  const [scrollY, setScrollY] = useState(0);
  const [maxScroll, setMaxScroll] = useState(1);

  useEffect(() => {
    const calculateMaxScroll = () => {
      if (typeof window !== "undefined") {
        setMaxScroll(Math.max(document.documentElement.scrollHeight - window.innerHeight, 1));
      }
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
      calculateMaxScroll();
    };

    // Initial calculation
    calculateMaxScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", calculateMaxScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", calculateMaxScroll);
    };
  }, []);

  // Calculate opacity based on scroll position
  // Header: very slight fade (starts at 100%, goes to 90% at max scroll)
  // Content: more noticeable fade (starts at 100%, goes to 40% at max scroll)
  const scrollProgress = Math.min(scrollY / maxScroll, 1);

  // Header opacity: 1.0 to 0.9 (very slight fade)
  const headerOpacity = 1 - scrollProgress * 0.1;

  // Content opacity: 1.0 to 0.4 (more noticeable fade)
  const contentOpacity = 1 - scrollProgress * 0.6;

  return { headerOpacity, contentOpacity };
}

