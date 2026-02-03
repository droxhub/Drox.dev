"use client";

import { Divider } from "@heroui/react";
import {
	IconBulb,
	IconCode,
	IconHeart,
	IconPalette,
	IconRocket,
	IconSparkles,
	IconTarget,
	IconUsers,
} from "@tabler/icons-react";
import { Trophy, Users } from "lucide-react";
import { motion } from "motion/react";
import { title } from "@/components/primitives";
import CTAButton from "@/components/ui/cta-button";
import SectionHeader from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

const values = [
	{
		icon: <IconSparkles />,
		title: "Innovation First",
		description: "Cutting-edge tech that sets you apart.",
	},
	{
		icon: <IconHeart />,
		title: "Client-Centric",
		description: "Your success drives everything we do.",
	},
	{
		icon: <IconCode />,
		title: "Technical Excellence",
		description: "Clean, scalable code built to last.",
	},
	{
		icon: <IconPalette />,
		title: "Design-Driven",
		description: "Beautiful interfaces that convert.",
	},
	{
		icon: <IconTarget />,
		title: "Results-Oriented",
		description: "Clear objectives, measurable outcomes.",
	},
	{
		icon: <IconUsers />,
		title: "Collaborative Spirit",
		description: "Your extended team, fully invested.",
	},
];

const _milestones = [
	{
		year: "2020",
		title: "The Beginning",
		description: "Vision to transform digital experiences",
	},
	{
		year: "2022",
		title: "Rapid Growth",
		description: "50+ successful projects delivered",
	},
	{
		year: "2024",
		title: "Industry Recognition",
		description: "Leading creative technology partner",
	},
	{
		year: "2025",
		title: "Global Expansion",
		description: "Serving clients worldwide",
	},
	{
		year: "2026",
		title: "Innovation Leader",
		description: "Setting new standards in digital transformation",
	},
];

export default function AboutPage() {
	return (
		<div className="flex flex-col items-center w-full px-4 sm:px-6 xl:px-0 overflow-x-hidden">
			{/* Hero Section */}
			<section className="flex flex-col items-center justify-center gap-4 py-16 md:py-24 px-4 sm:px-0">
				<SectionHeader
					badge="About Drox"
					icon={Users}
					title={
						<>
							Building Tomorrow&apos;s <br className="hidden md:block" />
							<span className={title({ color: "violet", size: "xl" })}>
								Digital Experiences
							</span>
						</>
					}
					subtitle="A team of passionate designers and developers dedicated to crafting exceptional digital experiences that inspire and innovate."
					size="xl"
				/>
			</section>

			{/* Mission & Vision Section */}
			<section className="flex flex-col items-center w-full my-16 md:my-24 leading-none">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-7xl w-full px-4 sm:px-0">
					{/* Mission Card */}
					<motion.div
						className="relative group p-[1px] rounded-[2.5rem] bg-gradient-to-br from-violet-500/20 to-transparent overflow-hidden shadow-2xl min-h-[400px]"
						initial={{ opacity: 0, scale: 0.95 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true, margin: "-100px" }}
						whileInView={{ opacity: 1, scale: 1 }}
					>
						{/* Video Background */}
						<video
							autoPlay
							loop
							muted
							playsInline
							className="absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity duration-700 group-hover:opacity-80"
						>
							<source src="/video/silk-1770108089707.webm" type="video/webm" />
						</video>

						<div className="absolute inset-x-0 -top-px h-px w-full bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
						<div className="absolute inset-y-0 -left-px w-px h-full bg-gradient-to-b from-transparent via-violet-500/50 to-transparent" />

						<div className="relative bg-[#08061d]/60 backdrop-blur-md p-8 md:p-12 h-full rounded-[2.5rem] flex flex-col gap-8">
							<div className="flex items-center gap-6">
								<div className="w-16 h-16 rounded-[1.25rem] bg-violet-600 flex items-center justify-center shadow-[0_0_30px_-10px_rgba(124,58,237,0.5)]">
									<IconRocket className="text-white" size={32} />
								</div>
								<h2 className="text-3xl md:text-4xl font-medium text-white tracking-tight">
									Our Mission
								</h2>
							</div>
							<p className="text-lg md:text-xl text-gray-200 font-normal leading-relaxed">
								Empower brands with exceptional digital solutions that drive
								growth and create meaningful connections. Technology should
								serve people—every line of code and every pixel is crafted for
								your success.
							</p>
							<div className="absolute bottom-[-20%] right-[-10%] w-64 h-64 bg-violet-600/10 blur-[80px] rounded-full group-hover:bg-violet-600/20 transition-colors" />
						</div>
					</motion.div>

					{/* Vision Card */}
					<motion.div
						className="relative group p-[1px] rounded-[2.5rem] bg-gradient-to-br from-purple-500/20 to-transparent overflow-hidden shadow-2xl min-h-[400px]"
						initial={{ opacity: 0, scale: 0.95 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						viewport={{ once: true, margin: "-100px" }}
						whileInView={{ opacity: 1, scale: 1 }}
					>
						{/* Video Background */}
						<video
							autoPlay
							loop
							muted
							playsInline
							className="absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity duration-700 group-hover:opacity-80"
						>
							<source src="/video/silk-1770108089707.webm" type="video/webm" />
						</video>

						<div className="absolute inset-x-0 -top-px h-px w-full bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
						<div className="absolute inset-y-0 -right-px w-px h-full bg-gradient-to-b from-transparent via-purple-500/50 to-transparent" />

						<div className="relative bg-[#08061d]/60 backdrop-blur-md p-8 md:p-12 h-full rounded-[2.5rem] flex flex-col gap-8">
							<div className="flex items-center gap-6">
								<div className="w-16 h-16 rounded-[1.25rem] bg-purple-600 flex items-center justify-center shadow-[0_0_30px_-10px_rgba(168,85,247,0.5)]">
									<IconBulb className="text-white" size={32} />
								</div>
								<h2 className="text-3xl md:text-4xl font-medium text-white tracking-tight">
									Our Vision
								</h2>
							</div>
							<p className="text-lg md:text-xl text-gray-200 font-normal leading-relaxed">
								Transform ideas into digital masterpieces. Through innovation
								and dedication, we set new standards in digital excellence,
								helping clients achieve remarkable victory in their digital
								evolution.
							</p>
							<div className="absolute bottom-[-20%] right-[-10%] w-64 h-64 bg-purple-600/10 blur-[80px] rounded-full group-hover:bg-purple-600/20 transition-colors" />
						</div>
					</motion.div>
				</div>
			</section>

			<Divider className="w-full max-w-7xl my-16 md:my-24 bg-white/5" />

			{/* What Sets Us Apart */}
			<section className="flex flex-col items-center w-full my-16 md:my-24">
				<SectionHeader
					badge="What Sets Us Apart"
					icon={Trophy}
					title="Expertise, passion, and commitment"
					subtitle="We combine deep technical knowledge with creative thinking to deliver results that matter."
				/>

				{/* Cards Container */}
				<div className="w-full max-w-6xl mb-12">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
						{values.map((value, index) => (
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
									{value.icon}
								</div>
								<div className="text-lg font-bold mb-2 relative z-10 px-10">
									<div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-[#2C2A51] group-hover/feature:bg-purple-500 transition-all duration-200 origin-center" />
									<span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-white">
										{value.title}
									</span>
								</div>
								<p className="text-sm text-gray-400 max-w-xs relative z-10 px-10">
									{value.description}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			<Divider className="w-full max-w-7xl my-16 md:my-24 bg-white/5" />

			{/* Our Story / Journey */}
			{/* <section className="flex flex-col items-center w-full my-16 md:my-32">
				<motion.div
					className="flex flex-col items-center mb-16 md:mb-24 text-center px-4"
					initial={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true, margin: "-100px" }}
					whileInView={{ opacity: 1, y: 0 }}
				>
					<h2 className="text-4xl md:text-6xl font-medium text-white mb-6">
						The Evolution of <span className="text-violet-500">DROX</span>
					</h2>
					<p className="text-lg md:text-xl text-gray-400 max-w-3xl font-normal leading-relaxed">
						From a bold vision to a global reality. Our journey is defined by
						unwavering commitment, continuous growth, and the success of our clients.
					</p>
				</motion.div>

				<div className="relative max-w-5xl w-full px-4 md:px-0">
					<div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-violet-500/20 via-violet-500 to-violet-500/20 transform md:-translate-x-1/2 hidden sm:block" />

					<div className="space-y-16 md:space-y-32">
						{milestones.map((item, index) => (
							<motion.div
								key={index}
								className={cn(
									"relative flex flex-col md:flex-row items-center justify-center gap-10 md:gap-0 w-full",
									index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
								)}
								initial={{ opacity: 0, y: 50 }}
								transition={{ duration: 0.7, delay: index * 0.1 }}
								viewport={{ once: true, margin: "-100px" }}
								whileInView={{ opacity: 1, y: 0 }}
							>
								<div className="w-full md:w-[45%]">
									<div className={cn(
										"p-8 md:p-10 rounded-[2.5rem] bg-[#0d0c1d] border border-white/5 shadow-2xl transition-all duration-300 hover:border-violet-500/30",
										index % 2 === 0 ? "text-left md:text-right" : "text-left"
									)}>
										<span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent mb-4 block">
											{item.year}
										</span>
										<h3 className="text-2xl md:text-3xl font-medium text-white mb-4 leading-tight">{item.title}</h3>
										<p className="text-gray-400 text-lg font-normal leading-relaxed">
											{item.description}
										</p>
									</div>
								</div>

								<div className="absolute left-4 md:left-1/2 w-12 h-12 rounded-full border-4 border-[#030014] bg-violet-600 shadow-[0_0_20px_rgba(124,58,237,0.5)] transform -translate-x-1/2 hidden sm:flex items-center justify-center z-10">
									<div className="w-3 h-3 bg-white rounded-full animate-pulse" />
								</div>

								<div className="hidden md:block w-[45%]" />
							</motion.div>
						))}
					</div>
				</div>
			</section> */}

			{/* CTA Section */}
			<section className="flex flex-col items-center w-full my-16 md:my-24">
				<motion.div
					className="flex flex-col items-center max-w-3xl w-full"
					initial={{ opacity: 0, y: 30 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true, margin: "-100px" }}
					whileInView={{ opacity: 1, y: 0 }}
				>
					<div className="bg-gradient-to-br from-violet-500/10 to-purple-600/10 border border-violet-500/20 rounded-2xl p-8 md:p-12 w-full">
						<h2 className={title({ size: "lg", color: "violet" })}>
							Ready to Start Your Journey?
						</h2>
						<p className="text-base md:text-lg text-default-600 text-center mt-4 mb-6">
							Let&apos;s transform your vision into reality.
						</p>
						<div className="flex justify-center">
							<CTAButton href="/contact" text="Let's Talk" />
						</div>
					</div>
				</motion.div>
			</section>
		</div>
	);
}
