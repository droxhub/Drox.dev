"use client";

import { Heart } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import SectionHeader from "@/components/ui/section-header";

interface Testimonial {
	name: string;
	handle: string;
	avatar: string;
	content: string;
	link?: string;
}

const testimonials: Testimonial[] = [
	{
		name: "Imthiyas Ahamed",
		handle: "Manager Of Alfa Events",
		avatar: "testimonials/imthiyas.png",
		content:
			"We struggled to manage catering staff across multiple events at the same time. After sharing the issue with the team, they built a web app where we can list events and staff can view and book available jobs. It completely streamlined our workflow and turned our operations into a smart, organized system.",
	},
	{
		name: "Sainul Abid",
		handle: "Founder and MD of Alfa Events",
		avatar: "testimonials/alfa.png",
		content:
			"As founders, we wanted faster and more scalable operations. The team delivered a system that streamlined our workflow, improved coordination, and accelerated our growth significantly.",
	},
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
	const content = (
		<div className="bg-gradient-to-t from-[#0E0C1E] to-[#08061D] backdrop-blur-sm border border-[#1C1A31]/80 rounded-2xl p-3 md:p-5 h-full flex flex-col transition-colors">
			<div className="flex items-center gap-3 mb-3">
				<img
					alt={testimonial.name}
					className="w-8 h-8 md:w-11 md:h-11 rounded-full object-cover ring-2 ring-purple-500/20 flex-shrink-0"
					src={testimonial.avatar}
				/>
				<div className="min-w-0 flex-1">
					<h4 className="font-semibold text-sm md:text-base text-default-900 dark:text-white truncate">
						{testimonial.name}
					</h4>
					<p className="text-[10px] md:text-xs text-default-500 dark:text-default-400 truncate">
						{testimonial.handle}
					</p>
				</div>
			</div>
			<p className="text-xs md:text-sm text-default-700 dark:text-default-300 leading-relaxed flex-1">
				{testimonial.content}
			</p>
		</div>
	);

	const containerClasses = "w-full max-w-[450px] group cursor-pointer";

	if (testimonial.link) {
		return (
			<Link
				href={testimonial.link}
				target="_blank"
				className={containerClasses}
			>
				{content}
			</Link>
		);
	}

	return (
		<div className={containerClasses.replace("cursor-pointer", "")}>
			{content}
		</div>
	);
};

const Testimonials = () => {
	return (
		<section className="flex flex-col items-center w-full py-16 md:py-26 overflow-hidden">
			<SectionHeader
				badge="Wall of Love"
				icon={Heart}
				title="Loved by Thinkers"
				subtitle="Here's what people are saying about us"
				size="lg"
			/>

			<div className="w-full max-w-5xl px-4 md:px-6 mt-10 md:mt-14 flex flex-col md:flex-row items-stretch justify-center gap-5 md:gap-6">
				{testimonials.map((testimonial, index) => (
					<motion.div
						key={testimonial.name}
						className="flex justify-center flex-1"
						initial={{ opacity: 0, y: 40 }}
						transition={{ duration: 0.6, delay: 0.1 * index }}
						viewport={{ once: true, margin: "-100px" }}
						whileInView={{ opacity: 1, y: 0 }}
					>
						<TestimonialCard testimonial={testimonial} />
					</motion.div>
				))}
			</div>
		</section>
	);
};

export default Testimonials;
