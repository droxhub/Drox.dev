"use client";

import { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { title as titleStyle } from "@/components/primitives";
import { cn } from "@/lib/utils";

/**
 * Callers pass icons from three libraries (lucide, Phosphor, react-icons) and
 * only ever `className` is applied to them here — so the contract is the
 * intersection, not `any`.
 */
type IconComponent = React.ComponentType<{ className?: string }>;

interface SectionHeaderProps {
	badge: string;
	icon?: LucideIcon | IconComponent;
	title: string | React.ReactNode;
	subtitle?: string;
	centered?: boolean;
	className?: string;
	titleClassName?: string;
	size?: "sm" | "md" | "lg" | "xl";
	/**
	 * Heading level. Defaults to h2 — pass "h1" when this header IS the page
	 * heading, as on /about, so the page isn't published without an h1.
	 */
	as?: "h1" | "h2";
}

const SectionHeader = ({
	badge,
	icon: Icon,
	title,
	subtitle,
	centered = true,
	className,
	titleClassName,
	size = "md",
	as = "h2",
}: SectionHeaderProps) => {
	const Heading = as === "h1" ? motion.h1 : motion.h2;

	return (
		<div
			className={cn(
				"flex flex-col mb-12 md:mb-20",
				centered
					? "items-center text-center mx-auto max-w-4xl"
					: "items-start text-left",
				className,
			)}
		>
			<motion.div
				className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black text-[12px] font-medium mb-8 border border-gray-200"
				initial={{ opacity: 0, y: 20 }}
				viewport={{ once: true }}
				whileInView={{ opacity: 1, y: 0 }}
			>
				{Icon && <Icon className="w-3.5 h-3.5" />}
				{badge}
			</motion.div>

			<Heading
				className={cn(
					titleStyle({ size, fullWidth: !centered }),
					"text-white mb-8 !inline-block",
					titleClassName,
				)}
				initial={{ opacity: 0, y: 20 }}
				transition={{ duration: 0.6, delay: 0.1 }}
				viewport={{ once: true }}
				whileInView={{ opacity: 1, y: 0 }}
			>
				{typeof title === "string" ? (
					<span className="gradient-line">{title}</span>
				) : (
					title
				)}
			</Heading>

			{subtitle && (
				<motion.p
					className="text-gray-400 text-lg md:text-xl font-normal leading-relaxed max-w-3xl"
					initial={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					viewport={{ once: true }}
					whileInView={{ opacity: 1, y: 0 }}
				>
					{subtitle}
				</motion.p>
			)}
		</div>
	);
};

export default SectionHeader;
