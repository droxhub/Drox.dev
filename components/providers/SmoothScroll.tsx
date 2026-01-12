"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2, // Duration of the smooth scroll animation
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
      orientation: "vertical", // Scroll direction
      gestureOrientation: "vertical", // Gesture scroll direction
      smoothWheel: true, // Smooth scroll for mouse wheel events
      wheelMultiplier: 1, // Mouse wheel sensitivity
      touchMultiplier: 2, // Touch scroll sensitivity
      infinite: false, // Infinite scroll
    });

    lenisRef.current = lenis;

    // Request animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
