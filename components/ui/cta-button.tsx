"use client";

import { track } from "@vercel/analytics";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
	text: string;
	/** Renders a link. Omit and pass `onClick` to render a <button> instead. */
	href?: string;
	onClick?: () => void;
	className?: string;
	/** Trailing icon. Defaults to a right arrow; pass e.g. <CaretDown /> to override. */
	icon?: ReactNode;
	/** Direction the icon nudges on hover. */
	iconMotion?: "right" | "down";
	/** Set false for compact placements like the navbar, where an arrow is noise. */
	showIcon?: boolean;
	/** "sm" is the compact navbar size; "md" is the standard in-page size. */
	size?: "sm" | "md";
	/** Where on the site this button lives — recorded with the click event. */
	location?: string;
	external?: boolean;
}

/**
 * The site's one button treatment: dark bordered pill, hover glow, text that
 * slides up and is replaced by its duplicate rising from below.
 *
 * This is deliberately identical to the "Show All Services" button that this
 * design language came from — so there is no second, competing button style.
 */
const buttonClass =
	"group relative inline-flex items-center justify-center font-semibold text-white transition-all duration-base bg-gradient-to-t from-cta-top to-cta-bottom border border-gray-800/80 rounded-full hover:border-purple-500/60 hover:shadow-2xl hover:shadow-purple-900/40 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

const sizes = {
	sm: "px-5 py-2.5 text-sm",
	md: "px-8 py-3.5 text-base",
};

export default function CTAButton({
	text,
	href,
	onClick,
	className = "",
	icon,
	iconMotion = "right",
	showIcon = true,
	size = "md",
	location,
	external = false,
}: CTAButtonProps) {
	const handleClick = () => {
		track("cta_click", {
			text,
			location: location ?? "unknown",
			href: href ?? "",
		});
		onClick?.();
	};

	const content = (
		<>
			{/* Subtle purple glow on hover */}
			<span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-600/20 via-violet-600/20 to-purple-600/20 transition-opacity duration-base" />

			{/* Text container with slide animation */}
			<span className="relative z-10 overflow-hidden inline-block">
				{/* Original text — slides up and fades out */}
				<span className="inline-block transition-all duration-base group-hover:-translate-y-full group-hover:opacity-0">
					{text}
				</span>
				{/* Duplicate text — slides up from below */}
				<span className="absolute left-0 top-0 inline-block translate-y-full opacity-0 transition-all duration-base group-hover:translate-y-0 group-hover:opacity-100">
					{text}
				</span>
			</span>

			{showIcon && (
				<span
					className={cn(
						"relative z-10 ml-2 transition-transform duration-base",
						iconMotion === "down"
							? "group-hover:translate-y-1"
							: "group-hover:translate-x-1",
					)}
				>
					{icon ?? <ArrowRight size={18} />}
				</span>
			)}
		</>
	);

	const classes = cn(buttonClass, sizes[size], className);

	if (!href) {
		return (
			<button className={classes} onClick={handleClick} type="button">
				{content}
			</button>
		);
	}

	if (external) {
		return (
			<a
				className={classes}
				href={href}
				onClick={handleClick}
				rel="noopener noreferrer"
				target="_blank"
			>
				{content}
			</a>
		);
	}

	return (
		<Link className={classes} href={href} onClick={handleClick}>
			{content}
		</Link>
	);
}
