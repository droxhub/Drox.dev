"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useState } from "react";

type RotatingImageProps = {
	srcs: string[];
	alt: string;
	sizes: string;
	className?: string;
	priority?: boolean;
	/** How long each image stays up before crossfading to the next. */
	interval?: number;
	/**
	 * Slow zoom while each image is up: in on one step, out on the next. With
	 * a single image it just breathes in and out.
	 */
	zoom?: boolean;
	/** Start on a zoom out instead of a zoom in, so neighbouring cards differ. */
	reverse?: boolean;
};

const ZOOM_SCALE = 1.04;
const FADE_MS = 700;

/**
 * A `fill` image that crossfades through several screenshots. With a single
 * source and no zoom it renders a plain image, and it holds still on the
 * first one for visitors who prefer reduced motion.
 */
const RotatingImage = ({
	srcs,
	alt,
	sizes,
	className,
	priority,
	interval = 3000,
	zoom = false,
	reverse = false,
}: RotatingImageProps) => {
	const [step, setStep] = useState(0);
	// The first zoom needs one painted frame at its starting scale.
	const [running, setRunning] = useState(false);

	const count = srcs.length;
	const animates = count > 1 || zoom;

	useEffect(() => {
		if (!animates) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		const frame = window.requestAnimationFrame(() => setRunning(true));
		const id = window.setInterval(() => setStep((s) => s + 1), interval);

		return () => {
			window.cancelAnimationFrame(frame);
			window.clearInterval(id);
		};
	}, [animates, interval]);

	const active = step % count;
	const zoomsIn = (s: number) => (s + (reverse ? 1 : 0)) % 2 === 0;

	const zoomStyle = (index: number): CSSProperties | undefined => {
		if (!zoom) return undefined;

		if (index === active) {
			const zoomIn = zoomsIn(step);
			const scale = running === zoomIn ? ZOOM_SCALE : 1;

			return {
				transform: `scale(${scale})`,
				transition: `opacity ${FADE_MS}ms, transform ${interval}ms ease-in-out, scale ${FADE_MS}ms`,
			};
		}

		// Park a hidden image at the scale its next turn starts from — but only
		// once it has faded out, so the outgoing image doesn't jump mid-fade.
		const nextStep = step + ((index - active + count) % count);

		return {
			transform: `scale(${zoomsIn(nextStep) ? 1 : ZOOM_SCALE})`,
			transition: `opacity ${FADE_MS}ms, transform 0ms ${FADE_MS}ms, scale ${FADE_MS}ms`,
		};
	};

	return (
		<>
			{srcs.map((src, index) => (
				<Image
					key={src}
					alt={index === active ? alt : ""}
					aria-hidden={index !== active}
					className={`${className ?? ""} transition-[opacity,transform,scale] duration-700 ${
						index === active ? "opacity-100" : "opacity-0"
					}`}
					fill
					priority={priority && index === 0}
					sizes={sizes}
					src={src}
					style={zoomStyle(index)}
				/>
			))}
		</>
	);
};

export default RotatingImage;
