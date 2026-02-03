"use client";

import React, { useEffect, useRef } from "react";

import { HeroScrollDemo } from "./HeroScrollDemo";

function PrototypeImg() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [spaceDots, setSpaceDots] = React.useState<
		Array<{
			x: number;
			y: number;
			size: number;
			opacity: number;
			duration: number;
			delay: number;
		}>
	>([]);

	useEffect(() => {
		// Generate space dots on client side only to avoid hydration mismatch
		const dots = [...Array(120)].map(() => {
			const angle = Math.random() * 360;
			const maxRadius = 800;
			const distance = Math.random() * maxRadius;
			const x = Math.cos((angle * Math.PI) / 180) * distance;
			const y = Math.sin((angle * Math.PI) / 180) * distance;
			const size = Math.random() * 2 + 0.5;
			const opacity = Math.random() * 0.7 + 0.3;
			const duration = 12 + Math.random() * 10;
			const delay = Math.random() * 20;

			return { x, y, size, opacity, duration, delay };
		});

		setSpaceDots(dots);
	}, []);

	useEffect(() => {
		// Generate random particles with varied behaviors
		const container = containerRef.current;

		if (!container) return;

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
	}, []);

	return (
		<div className="flex flex-col justify-center items-center mx-auto relative w-full mb-[-200px] sm:mb-[-300px] md:mb-[-400px] lg:mb-[-500px] overflow-hidden">
			{/* Black hole effect container */}
			<div className="absolute top-0 w-full flex justify-center pointer-events-none overflow-hidden">
				<div className="origin-top scale-[0.7] sm:scale-[0.5] md:scale-[0.65] lg:scale-[0.85] xl:scale-[1.0]">
					<div className="relative w-[1200px] h-[800px] flex items-center justify-center">
						{/* Center video */}
						<video
							autoPlay
							loop
							muted
							playsInline
							className="absolute inset-0 w-full h-full object-cover"
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
											left: `calc(50% + ${dot.x}px)`,
											top: `calc(50% + ${dot.y}px)`,
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
