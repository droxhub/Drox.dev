import React from "react";

import { cn } from "@/lib/utils";

interface BorderedFeatureCardProps {
	icon: React.ReactNode;
	title: string;
	description: string;
	index: number;
}

export default function BorderedFeatureCard({
	icon,
	title,
	description,
	index,
}: BorderedFeatureCardProps) {
	return (
		<div className="flex flex-col h-full p-8 border-2 border-dashed border-white/10 rounded-[2rem] bg-transparent hover:border-violet-500/50 transition-all duration-300 group/feature">
			<div className="mb-6 p-4 rounded-2xl bg-white/5 group-hover/feature:bg-violet-500/10 transition-colors w-fit">
				<div className="text-violet-400">{icon}</div>
			</div>

			<h3 className="text-xl font-bold mb-3 text-white">{title}</h3>

			<p className="text-base text-gray-400 leading-relaxed">{description}</p>
		</div>
	);
}
