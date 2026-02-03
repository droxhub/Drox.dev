"use client";

import { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { title as titleStyle } from "@/components/primitives";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
	badge: string;
	icon?: LucideIcon | React.ComponentType<any>;
	title: string | React.ReactNode;
	subtitle?: string;
	centered?: boolean;
	className?: string;
	titleClassName?: string;
	size?: "sm" | "md" | "lg" | "xl";
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
}: SectionHeaderProps) => {
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

			<motion.h2
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
				{title}
			</motion.h2>

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
