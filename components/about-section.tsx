"use client";

import {
	Gift,
	Globe,
	Headphones,
	Smartphone,
	TrendingUp,
	Users,
	Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { sectionWrapper, title } from "@/components/primitives";
import CTAButton from "@/components/ui/cta-button";
import SectionHeader from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

const keyPoints = [
	{
		icon: Globe,
		title: "Innovative Web Solutions",
		description: "Custom websites that captivate and convert your audience",
	},
	{
		icon: Smartphone,
		title: "Mobile-First Development",
		description: "Seamless experiences across all devices and platforms",
	},
	{
		icon: Zap,
		title: "Performance Optimization",
		description: "Lightning-fast sites that rank and perform exceptionally",
	},
	{
		icon: TrendingUp,
		title: "Strategic Digital Growth",
		description: "Data-driven approaches to elevate your brand presence",
	},
	{
		icon: Users,
		title: "Expert Team",
		description: "Experienced developers, designers, and strategists",
	},
	{
		icon: Headphones,
		title: "End-to-End Support",
		description: "Comprehensive guidance from concept to launch and beyond",
	},
];

export default function AboutSection() {
	return (
		<section
			className={sectionWrapper({
				class: "mt-20 lg:mt-32 mb-16 px-4 md:px-6 lg:px-8",
			})}
		>
			<div className="flex flex-col items-center justify-center">
				<SectionHeader
					badge="Benefits"
					icon={Gift}
					title={
						<>
							Crafting Digital{" "}
							<span className={title({ color: "violet", size: "lg" })}>
								Excellence
							</span>{" "}
							One Project at a Time
						</>
					}
					subtitle="We build digital products that help brands grow with practical web solutions and user-friendly design."
					size="lg"
				/>

				{/* Cards Container */}
				<div className="w-full max-w-6xl mb-12">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
						{keyPoints.map((point, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-100px" }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								className={cn(
									"flex flex-col border-r py-10 relative group/feature border-[#1C1A31]",
									(index === 0 || index === 3) && "border-l border-[#1C1A31]",
									index < 3 && "border-b border-[#1C1A31]",
								)}
							>
								{index < 3 && (
									<div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-purple-900/10 to-transparent pointer-events-none" />
								)}
								{index >= 3 && (
									<div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none" />
								)}
								<div className="mb-4 relative z-10 px-10 text-purple-400">
									<point.icon className="w-6 h-6" />
								</div>
								<div className="text-lg font-bold mb-2 relative z-10 px-10">
									<div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-[#2C2A51] group-hover/feature:bg-purple-500 transition-all duration-200 origin-center" />
									<span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-white">
										{point.title}
									</span>
								</div>
								<p className="text-sm text-gray-400 max-w-xs relative z-10 px-10">
									{point.description}
								</p>
							</motion.div>
						))}
					</div>
				</div>

				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.5, delay: 0.3 }}
				>
					<CTAButton href="/about" text="Learn More About Us" />
				</motion.div>
			</div>
		</section>
	);
}
