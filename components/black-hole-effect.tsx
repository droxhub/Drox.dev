"use client";

import { useEffect, useRef } from "react";

interface BlackHoleEffectProps {
  particleCount?: number;
  spaceDotCount?: number;
  showVideo?: boolean;
  showRings?: boolean;
  scale?: number;
}

export default function BlackHoleEffect({
  particleCount = 90,
  spaceDotCount = 250,
  showVideo = true,
  showRings = true,
  scale = 1,
}: BlackHoleEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      
      const angle = Math.random() * 360;
      const distance = 300 + Math.random() * 500;
      const x = Math.cos((angle * Math.PI) / 180) * distance;
      const y = Math.sin((angle * Math.PI) / 180) * distance;
      const size = 1 + Math.random() * 3;
      const duration = 20 + Math.random() * 25;
      const delay = Math.random() * 5;
      
      const behavior = Math.random();
      
      if (behavior < 0.15) {
        particle.className = "black-hole-orbit";
        const orbitRadius = 200 + Math.random() * 300;

        particle.style.cssText = `
          width: ${size}px;
          height: ${size}px;
          animation-duration: ${duration}s;
          animation-delay: ${delay}s;
          --orbit-radius: ${orbitRadius}px;
          --start-angle: ${angle}deg;
        `;
      } else if (behavior < 0.55) {
        particle.className = "black-hole-spiral";
        particle.style.cssText = `
          left: ${x}px;
          top: ${y}px;
          width: ${size}px;
          height: ${size}px;
          animation-duration: ${duration}s;
          animation-delay: ${delay}s;
          --start-x: ${x}px;
          --start-y: ${y}px;
        `;
      } else {
        particle.className = "black-hole-gravity";
        particle.style.cssText = `
          left: ${x}px;
          top: ${y}px;
          width: ${size}px;
          height: ${size}px;
          animation-duration: ${duration}s;
          animation-delay: ${delay}s;
        `;
      }
      
      container.appendChild(particle);
    }

    return () => {
      const particles = container.querySelectorAll(
        ".black-hole-orbit, .black-hole-spiral, .black-hole-gravity"
      );

      particles.forEach((particle) => particle.remove());
    };
  }, [particleCount]);

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{ transform: `scale(${scale})` }}
    >
      {showVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/video/black-hole.webm"
        />
      )}
      
      <div
        ref={containerRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        {/* Space dots moving to center */}
        {[...Array(spaceDotCount)].map((_, i) => {
          const x = (Math.random() - 0.5) * 1200;
          const y = (Math.random() - 0.5) * 800;
          const size = Math.random() * 2 + 0.5;
          const opacity = Math.random() * 0.7 + 0.3;
          const duration = 12 + Math.random() * 10;
          const delay = Math.random() * 20;
          
          return (
            <div
              key={`space-dot-${i}`}
              className="absolute bg-white rounded-full space-dot-to-center"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                width: `${size}px`,
                height: `${size}px`,
                opacity: opacity,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                willChange: "transform, opacity",
                "--start-x": `${x}px`,
                "--start-y": `${y}px`,
              } as React.CSSProperties}
            />
          );
        })}
        
        {/* Static rings */}
        {showRings && [1, 2, 3].map((ring) => (
          <div
            key={ring}
            style={{
              position: "absolute",
              border: "1px solid rgba(139, 92, 246, 0.2)",
              borderRadius: "50%",
              width: `${ring * 200}px`,
              height: `${ring * 200}px`,
            }}
          >
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="black-hole-dot"
                style={{
                  transform: `rotate(${i * 45}deg) translateY(-${ring * 100}px)`,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
