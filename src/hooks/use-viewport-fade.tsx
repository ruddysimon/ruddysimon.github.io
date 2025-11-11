import { useState, useEffect, useRef } from "react";

// Hook for header - slight fade based on scroll position
export function useHeaderFade() {
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

    calculateMaxScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", calculateMaxScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", calculateMaxScroll);
    };
  }, []);

  const scrollProgress = Math.min(scrollY / maxScroll, 1);
  // Header: very slight fade (100% to 90%)
  const opacity = 1 - scrollProgress * 0.1;
  return opacity;
}

// Hook for content sections - fade based on distance from viewport center
export function useViewportFade<T extends HTMLElement = HTMLElement>() {
  const [opacity, setOpacity] = useState(1);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const calculateOpacity = () => {
      if (!elementRef.current || typeof window === "undefined") return;

      const element = elementRef.current;
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;
      
      // Calculate element center position relative to viewport
      const elementCenter = rect.top + rect.height / 2;
      const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
      
      // Fade distance: start fading when more than 200px from center
      // Full fade at 600px from center
      const fadeStartDistance = 200;
      const fadeEndDistance = 600;
      
      let calculatedOpacity = 1;
      
      if (distanceFromCenter > fadeStartDistance) {
        const fadeRange = fadeEndDistance - fadeStartDistance;
        const fadeAmount = Math.min((distanceFromCenter - fadeStartDistance) / fadeRange, 1);
        // Fade from 1.0 to 0.4 (more noticeable fade)
        calculatedOpacity = 1 - fadeAmount * 0.6;
      }

      setOpacity(Math.max(calculatedOpacity, 0.4)); // Minimum opacity of 0.4
    };

    const handleScroll = () => {
      calculateOpacity();
    };

    const handleResize = () => {
      calculateOpacity();
    };

    // Initial calculation
    calculateOpacity();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { ref: elementRef, opacity };
}

