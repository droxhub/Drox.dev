"use client";
import { motion } from "motion/react";
import React from "react";
import { DURATION } from "@/lib/motion";

export default function ColourfulText({ text }: { text: string }) {
	const colors = [
		"rgb(255, 28, 247)", // Site violet (bright)
		"rgb(178, 73, 248)", // Site violet (dark)
		"rgb(88, 86, 214)", // Deep violet
		"rgb(124, 58, 237)", // Purple
		"rgb(139, 92, 246)", // Light purple
		"rgb(79, 70, 229)", // Indigo
		"rgb(99, 102, 241)", // Lighter indigo
		"rgb(59, 130, 246)", // Blue
		"rgb(14, 165, 233)", // Sky blue
		"rgb(6, 182, 212)", // Cyan
	];

	const [currentColors, setCurrentColors] = React.useState(colors);
	const [count, setCount] = React.useState(0);

	React.useEffect(() => {
		const interval = setInterval(() => {
			const shuffled = [...colors].sort(() => Math.random() - 0.5);

			setCurrentColors(shuffled);
			setCount((prev) => prev + 1);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	/**
	 * The wrapper is load bearing. Each character is its own `inline-block`, so
	 * without it the browser treats every letter as a separate item and may break
	 * the line *inside* the word — the hero headline read "op / erations" at
	 * 320px and "o / perations" at 568px. `whitespace-nowrap` keeps the word
	 * whole; `inline-block` makes it one item that wraps to the next line
	 * together, rather than one that is allowed to hang past the edge.
	 */
	return (
		<span className="inline-block whitespace-nowrap">
			{text.split("").map((char, index) => (
				<motion.span
					key={`${char}-${count}-${index}`}
					animate={{
						color: currentColors[index % currentColors.length],
						y: [0, -3, 0],
						scale: [1, 1.01, 1],
						filter: ["blur(0px)", `blur(5px)`, "blur(0px)"],
						opacity: [1, 0.8, 1],
					}}
					className="inline-block whitespace-pre font-sans tracking-tight"
					initial={{
						y: 0,
					}}
					transition={{
						duration: DURATION.slow,
						delay: index * 0.05,
					}}
				>
					{char}
				</motion.span>
			))}
		</span>
	);
}
