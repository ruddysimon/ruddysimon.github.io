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
      
      // Check if element is in the visible viewport area (top to bottom)
      const isInViewport = rect.bottom > 0 && rect.top < viewportHeight;
      
      // If element is near the center (within 300px) or at the top of viewport, keep it fully visible
      // Only fade when element is far from center AND not at the top
      const nearCenterThreshold = 300;
      const fadeStartDistance = 400;
      const fadeEndDistance = 800;
      
      let calculatedOpacity = 1;
      
      // If element is near center or at top of viewport, keep it fully visible
      if (distanceFromCenter < nearCenterThreshold || (rect.top >= 0 && rect.top < viewportHeight * 0.3)) {
        calculatedOpacity = 1;
      } else if (distanceFromCenter > fadeStartDistance) {
        // Only fade when far from center
        const fadeRange = fadeEndDistance - fadeStartDistance;
        const fadeAmount = Math.min((distanceFromCenter - fadeStartDistance) / fadeRange, 1);
        // Fade from 1.0 to 0.5 (less aggressive fade)
        calculatedOpacity = 1 - fadeAmount * 0.5;
      }

      setOpacity(Math.max(calculatedOpacity, 0.5)); // Minimum opacity of 0.5
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

// Hook for header hide/show based on scroll position or section visibility
export function useHeaderHide() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const checkScrollPosition = () => {
      // Always show header at the absolute top
      if (window.scrollY === 0) {
        setIsHidden(false);
        return;
      }

      // Check for specific sections first (about, books, etc.)
      const aboutSection = document.getElementById('about');
      const booksSection = document.getElementById('books');
      
      // If we have a section to track, use it
      const sectionToTrack = aboutSection || booksSection;
      
      if (sectionToTrack) {
        const rect = sectionToTrack.getBoundingClientRect();
        // Hide header when section reaches the top of viewport
        // Using a small threshold (50px) for smoother transition
        setIsHidden(rect.top <= 50);
      } else {
        // Fallback: hide header when scrolling down past 200px
        setIsHidden(window.scrollY > 200);
      }
    };

    window.addEventListener("scroll", checkScrollPosition, { passive: true });
    window.addEventListener("resize", checkScrollPosition);
    
    // Initial check
    checkScrollPosition();

    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, []);

  return isHidden;
}

