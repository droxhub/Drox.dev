"use client";

import { Medal } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { title } from "@/components/primitives";
import SectionHeader from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

// Counter animation component
const AnimatedCounter = ({
	target,
	suffix = "",
	duration = 2,
	suffixClass = "",
}: {
	target: number;
	suffix?: string;
	duration?: number;
	suffixClass?: string;
}) => {
	const [count, setCount] = useState(0);
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	useEffect(() => {
		if (isInView) {
			let startTime: number | null = null;
			const animate = (currentTime: number) => {
				if (startTime === null) startTime = currentTime;
				const elapsed = currentTime - startTime;
				const progress = Math.min(elapsed / (duration * 1000), 1);

				// Easing function (easeOutQuart)
				const eased = 1 - Math.pow(1 - progress, 4);
				const current = Math.floor(eased * target);

				setCount(current);

				if (progress < 1) {
					requestAnimationFrame(animate);
				} else {
					setCount(target);
				}
			};

			requestAnimationFrame(animate);
		}
	}, [isInView, target, duration]);

	return (
		<div
			ref={ref}
			className="text-6xl md:text-7xl font-bold text-foreground mb-4 tabular-nums tracking-tighter"
		>
			{count}
			<span className={cn("text-violet-500", suffixClass)}>{suffix}</span>
		</div>
	);
};

const stats = [
	{
		number: 25,
		suffix: "+",
		title: "Projects Delivered",
		description:
			"We've successfully completed over 25 projects—and we're just getting started!",
		suffixClass: "text-violet-500", // Primary color
	},
	{
		number: 70,
		suffix: "%",
		title: "Business Growth",
		description:
			"Our websites have helped clients achieve up to 70% revenue growth in just one year!",
		suffixClass: "text-violet-500",
	},
	{
		number: 3,
		suffix: "x",
		title: "Faster Delivery",
		description: "Rapid turnaround without compromising quality or creativity.",
		suffixClass: "text-violet-500", // Using violet/primary instead of orange to match theme
	},
];

const WhyChooseUs = () => {
	return (
		<section className="flex flex-col items-center w-full my-20 md:my-[100px]">
			<SectionHeader
				badge="Why Choose Us"
				icon={Medal}
				title={
					<>
						<span className="gradient-line">
							Building{" "}
							<span className={title({ color: "violet", size: "lg" })}>
								success
							</span>{" "}
							stories online — one website, one brand, one bold move at a time.
						</span>
					</>
				}
				subtitle="Your growth is our goal. We combine data-driven strategy with creative design to deliver measurable business outcomes."
				size="lg"
			/>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-7xl">
				{stats.map((stat, index) => (
					<motion.div
						key={index}
						className="flex flex-col p-8 md:p-10 border-2 border-dashed border-default-200 dark:border-default-100 rounded-[2.5rem] bg-transparent hover:border-violet-500/50 transition-colors duration-300"
						initial={{ opacity: 0, y: 20 }}
						transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
						viewport={{ once: true, margin: "-100px" }}
						whileInView={{ opacity: 1, y: 0 }}
					>
						<AnimatedCounter
							duration={2}
							suffix={stat.suffix}
							target={stat.number}
							suffixClass={stat.suffixClass}
						/>
						<h3 className="text-xl md:text-2xl font-medium mb-3">
							{stat.title}
						</h3>
						<p className="text-default-500 text-base md:text-lg leading-relaxed">
							{stat.description}
						</p>
					</motion.div>
				))}
			</div>
		</section>
	);
};

export default WhyChooseUs;
