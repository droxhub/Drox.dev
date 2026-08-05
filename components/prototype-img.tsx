"use client";

import { useReducedMotion } from "motion/react";
import React, { useEffect, useMemo, useRef } from "react";
import { seededRandom } from "@/lib/seeded-random";
import { fromCentre } from "@/lib/utils";

import { HeroScrollDemo } from "./HeroScrollDemo";

function PrototypeImg() {
	const containerRef = useRef<HTMLDivElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const reduceMotion = useReducedMotion();

	// Playback is started here rather than with an `autoPlay` attribute, so it can
	// be withheld under reduced motion without the server and client disagreeing
	// about the markup. WCAG 2.2 SC 2.3.3.
	useEffect(() => {
		const video = videoRef.current;

		if (!video) return;

		if (reduceMotion) {
			video.pause();

			return;
		}

		video.play().catch(() => {
			// Browsers refuse autoplay in low-power mode and some mobile contexts.
			// The first frame stays on screen, which is the same still image the
			// reduced-motion path shows — nothing to recover from.
		});
	}, [reduceMotion]);

	// Seeded rather than random, so the server and the client lay the dots out
	// identically. That removes the effect-then-setState round trip this used to
	// need to avoid a hydration mismatch, and the field now paints with the
	// first render instead of after hydration.
	//
	// Values are rounded HERE rather than at render, and that rounding is load
	// bearing: the CSS parser re-serialises inline styles to a few significant
	// figures, so `width: 2.21784882619977px` comes back as `2.21785px` and
	// every dot fails hydration on a value that was never meaningfully precise.
	// Rounding also makes the output immune to any last-digit float divergence
	// between the Node and browser engines.
	const spaceDots = useMemo(() => {
		const random = seededRandom(0x5eed_51de);
		const round = (n: number) => Number(n.toFixed(2));

		return [...Array(120)].map(() => {
			const angle = random() * 360;
			const maxRadius = 800;
			const distance = random() * maxRadius;

			return {
				// Whole pixels: these are 1–3px dots scattered over an 800px radius,
				// so sub-pixel placement buys nothing and costs exact round-tripping.
				x: Math.round(Math.cos((angle * Math.PI) / 180) * distance),
				y: Math.round(Math.sin((angle * Math.PI) / 180) * distance),
				size: round(random() * 2 + 0.5),
				opacity: round(random() * 0.7 + 0.3),
				duration: round(12 + random() * 10),
				delay: round(random() * 20),
			};
		});
	}, []);

	useEffect(() => {
		// Generate random particles with varied behaviors
		const container = containerRef.current;

		if (!container) return;

		// Fifty CSS-animated particles spiralling into a black hole is the most
		// motion on the site. Under reduced motion they are never created at all
		// rather than created and paused — no elements, no work.
		if (reduceMotion) return;

		const particleCount = 50; // Reduced from 90 to 50 for better performance

		for (let i = 0; i < particleCount; i++) {
			const particle = document.createElement("div");

			const angle = Math.random() * 360;
			const distance = 300 + Math.random() * 500;
			const x = Math.cos((angle * Math.PI) / 180) * distance;
			const y = Math.sin((angle * Math.PI) / 180) * distance;
			const size = 1 + Math.random() * 3;
			const duration = 20 + Math.random() * 25; // Very slow: 20-45 seconds
			const delay = Math.random() * 5;

			// Small amount of orbiting (15%), rest spiral and gravity
			const behavior = Math.random();

			if (behavior < 0.15) {
				// Very slow orbiting particles (only 15%)
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
				// Spiral inward particles (40%)
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
				// Direct gravitational pull (45%)
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
				".black-hole-orbit, .black-hole-spiral, .black-hole-gravity",
			);

			particles.forEach((particle) => particle.remove());
		};
		// Re-runs if the setting is toggled mid-session; the cleanup above removes
		// the particles it created, so the swap is clean in both directions.
	}, [reduceMotion]);

	return (
		<div className="flex flex-col justify-center items-center mx-auto relative w-full mb-[-200px] sm:mb-[-300px] md:mb-[-400px] lg:mb-[-500px] overflow-hidden">
			{/* Black hole effect container */}
			<div className="absolute top-0 w-full flex justify-center pointer-events-none overflow-hidden">
				<div className="origin-top scale-[0.7] sm:scale-[0.5] md:scale-[0.65] lg:scale-[0.85] xl:scale-[1.0]">
					<div className="relative w-[1200px] h-[800px] flex items-center justify-center">
						{/* Center video. No `autoPlay` attribute: playback is started from
						    an effect instead, so it can be withheld under reduced motion.
						    Toggling the attribute on the client would change server-rendered
						    markup and fail hydration — this is the SSR-safe way to do it.
						    Withheld, the element still paints its first frame, which is a
						    static violet halo. */}
						<video
							/* Decorative: silent, uncontrolled, no information to caption. */
							aria-hidden="true"
							loop
							muted
							playsInline
							className="black-hole-video absolute inset-0 w-full h-full object-cover"
							ref={videoRef}
							src="/video/black-hole.webm"
						/>

						{/* Orbiting rings */}
						<div
							ref={containerRef}
							className="absolute inset-0 flex items-center justify-center"
						>
							{/* Space dots slowly moving to black hole center - limited to ring 4 area */}
							{spaceDots.map((dot, i) => (
								<div
									key={`space-dot-${i}`}
									className="absolute bg-white rounded-full space-dot-to-center"
									style={
										{
											left: fromCentre(dot.x),
											top: fromCentre(dot.y),
											width: `${dot.size}px`,
											height: `${dot.size}px`,
											opacity: dot.opacity,
											animationDuration: `${dot.duration}s`,
											animationDelay: `${dot.delay}s`,
											willChange: "transform, opacity",
											"--start-x": `${dot.x}px`,
											"--start-y": `${dot.y}px`,
										} as React.CSSProperties
									}
								/>
							))}

							{/* Static rings - no rotation */}
							{[1, 2, 3].map((ring) => {
								return (
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
										{[...Array(6)].map((_, i) => (
											<div
												key={i}
												className="black-hole-dot"
												style={{
													transform: `rotate(${i * 60}deg) translateY(-${ring * 100}px)`,
												}}
											/>
										))}
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>

			<div className="w-full mt-[-210px] sm:mt-[-147px] md:mt-[-86px] lg:mt-[-5px] xl:mt-[55px]">
				<HeroScrollDemo />
			</div>
		</div>
	);
}

export default PrototypeImg;
