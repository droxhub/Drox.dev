"use client";

import { Divider } from "@heroui/react";
import {
	Code,
	Heart,
	Lightbulb,
	Palette,
	Rocket,
	Sparkles,
	Target,
	Trophy,
	Users,
} from "lucide-react";
import { motion } from "motion/react";
import Founders from "@/components/Founders";
import { title } from "@/components/primitives";
import AmbientVideo from "@/components/ui/ambient-video";
import CTAButton from "@/components/ui/cta-button";
import SectionHeader from "@/components/ui/section-header";
import { aboutPage } from "@/config/content";
import { DURATION, STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";

const values = [
	{
		icon: <Sparkles />,
		title: "Innovation First",
		description: "Cutting-edge tech that sets you apart.",
	},
	{
		icon: <Heart />,
		title: "Client-Centric",
		description: "Your success drives everything we do.",
	},
	{
		icon: <Code />,
		title: "Technical Excellence",
		description: "Clean, scalable code built to last.",
	},
	{
		icon: <Palette />,
		title: "Design-Driven",
		description: "Beautiful interfaces that convert.",
	},
	{
		icon: <Target />,
		title: "Results-Oriented",
		description: "Clear objectives, measurable outcomes.",
	},
	{
		icon: <Users />,
		title: "Collaborative Spirit",
		description: "Your extended team, fully invested.",
	},
];

export default function AboutPage() {
	return (
		<div className="flex flex-col items-center w-full px-4 sm:px-6 xl:px-0 overflow-x-hidden">
			{/* Hero Section */}
			<section className="flex flex-col items-center justify-center gap-4 py-12 md:py-20">
				<SectionHeader
					as="h1"
					badge="About Drox Dev"
					icon={Users}
					title={
						<>
							<span className="gradient-line">Building Tomorrow&apos;s</span>{" "}
							<br className="hidden md:block" />
							<span className="gradient-line">
								<span className={title({ color: "violet", size: "xl" })}>
									Digital Experiences
								</span>
							</span>
						</>
					}
					subtitle="A team of passionate designers and developers dedicated to crafting exceptional digital experiences that inspire and innovate."
					size="xl"
				/>
			</section>

			{/* Mission & Vision Section */}
			<section className="flex flex-col items-center w-full my-16 md:my-24 leading-none">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-7xl w-full">
					{/* Mission Card */}
					<motion.div
						/* `clip-path` next to the `overflow-hidden`: this box holds a video
						   and a blurred glow, both composited, and WebKit does not reliably
						   apply a rounded *overflow* clip to a composited child — see the
						   note on the HowWeWork stage button. */
						className="relative group p-[1px] rounded-panel bg-gradient-to-br from-violet-500/20 to-transparent overflow-hidden [clip-path:inset(0_round_var(--radius-panel))] shadow-2xl min-h-[400px]"
						initial={{ opacity: 0, scale: 0.95 }}
						transition={{ duration: DURATION.slow }}
						viewport={{ once: true, margin: "-100px" }}
						whileInView={{ opacity: 1, scale: 1 }}
					>
						{/* Video Background — lazy and reduced-motion aware. No longer
						    desktop-only: see the note in ambient-video.tsx. */}
						<AmbientVideo
							className="absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity duration-slow group-hover:opacity-80"
							src="/video/silk.webm"
						/>

						<div className="absolute inset-x-0 -top-px h-px w-full bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
						<div className="absolute inset-y-0 -left-px w-px h-full bg-gradient-to-b from-transparent via-violet-500/50 to-transparent" />

						<div className="relative bg-surface/60 backdrop-blur-md p-8 md:p-12 h-full rounded-panel flex flex-col gap-8">
							<div className="flex items-center gap-6">
								<div className="w-16 h-16 rounded-tile bg-violet-600 flex items-center justify-center shadow-[0_0_30px_-10px_rgba(124,58,237,0.5)]">
									<Rocket className="text-white" size={32} />
								</div>
								<h2 className="text-3xl md:text-4xl font-medium text-white tracking-tight">
									{aboutPage.mission.title}
								</h2>
							</div>
							{/* Company Profile p.11, verbatim, and read from config so there
							    is one copy of it — this page used to hold its own while
							    `aboutPage.mission` sat in the config with different text that
							    nothing rendered. */}
							<p className="text-lg md:text-xl text-gray-200 font-normal leading-relaxed">
								{aboutPage.mission.description}
							</p>
							<div className="absolute bottom-[-20%] right-[-10%] w-64 h-64 bg-violet-600/10 blur-[80px] rounded-full group-hover:bg-violet-600/20 transition-colors" />
						</div>
					</motion.div>

					{/* Vision Card */}
					<motion.div
						/* Same Safari clip fix as the Mission card above. */
						className="relative group p-[1px] rounded-panel bg-gradient-to-br from-purple-500/20 to-transparent overflow-hidden [clip-path:inset(0_round_var(--radius-panel))] shadow-2xl min-h-[400px]"
						initial={{ opacity: 0, scale: 0.95 }}
						transition={{ duration: DURATION.slow, delay: 0.2 }}
						viewport={{ once: true, margin: "-100px" }}
						whileInView={{ opacity: 1, scale: 1 }}
					>
						{/* Video Background — lazy and reduced-motion aware. No longer
						    desktop-only: see the note in ambient-video.tsx. */}
						<AmbientVideo
							className="absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity duration-slow group-hover:opacity-80"
							src="/video/silk.webm"
						/>

						<div className="absolute inset-x-0 -top-px h-px w-full bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
						<div className="absolute inset-y-0 -right-px w-px h-full bg-gradient-to-b from-transparent via-purple-500/50 to-transparent" />

						<div className="relative bg-surface/60 backdrop-blur-md p-8 md:p-12 h-full rounded-panel flex flex-col gap-8">
							<div className="flex items-center gap-6">
								<div className="w-16 h-16 rounded-tile bg-purple-600 flex items-center justify-center shadow-[0_0_30px_-10px_rgba(168,85,247,0.5)]">
									<Lightbulb className="text-white" size={32} />
								</div>
								<h2 className="text-3xl md:text-4xl font-medium text-white tracking-tight">
									{aboutPage.vision.title}
								</h2>
							</div>
							{/* Company Profile p.11, verbatim. A previous pass rewrote this to
							    something more modest on the grounds that "the world's most
							    trusted technology partner" is unearned for a firm founded this
							    year — restored by the client's decision on 6 August, because
							    the site saying something different from the Company Profile a
							    buyer is holding is the worse problem. Do not reword it again
							    without them. */}
							<p className="text-lg md:text-xl text-gray-200 font-normal leading-relaxed">
								{aboutPage.vision.description}
							</p>
							<div className="absolute bottom-[-20%] right-[-10%] w-64 h-64 bg-purple-600/10 blur-[80px] rounded-full group-hover:bg-purple-600/20 transition-colors" />
						</div>
					</motion.div>
				</div>
			</section>

			<Divider className="w-full max-w-7xl my-16 md:my-24 bg-white/5" />

			{/* Who is actually accountable — the first thing a buyer looks for. */}
			<Founders />

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
				<div className="w-full max-w-7xl mb-12">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
						{values.map((value, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-100px" }}
								transition={{ duration: DURATION.slow, delay: index * STAGGER }}
								className={cn(
									"flex flex-col border-r py-10 relative group/feature border-hairline",
									(index === 0 || index === 3) && "border-l border-hairline",
									index < 3 && "border-b border-hairline",
								)}
							>
								{index < 3 && (
									<div className="opacity-0 group-hover/feature:opacity-100 transition duration-fast absolute inset-0 h-full w-full bg-gradient-to-t from-purple-900/10 to-transparent pointer-events-none" />
								)}
								{index >= 3 && (
									<div className="opacity-0 group-hover/feature:opacity-100 transition duration-fast absolute inset-0 h-full w-full bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none" />
								)}
								<div className="mb-4 relative z-10 px-10 text-purple-400">
									{value.icon}
								</div>
								<div className="text-lg font-bold mb-2 relative z-10 px-10">
									<div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-hairline-strong group-hover/feature:bg-purple-500 transition-all duration-fast origin-center" />
									<span className="group-hover/feature:translate-x-2 transition duration-fast inline-block text-white">
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
					transition={{ duration: DURATION.slow }}
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
								transition={{ duration: DURATION.slow, delay: index * STAGGER }}
								viewport={{ once: true, margin: "-100px" }}
								whileInView={{ opacity: 1, y: 0 }}
							>
								<div className="w-full md:w-[45%]">
									<div className={cn(
										"p-8 md:p-10 rounded-panel bg-[#0d0c1d] border border-white/5 shadow-2xl transition-all duration-base hover:border-violet-500/30",
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

								<div className="absolute left-4 md:left-1/2 w-12 h-12 rounded-full border-4 border-canvas bg-violet-600 shadow-[0_0_20px_rgba(124,58,237,0.5)] transform -translate-x-1/2 hidden sm:flex items-center justify-center z-10">
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
					transition={{ duration: DURATION.slow }}
					viewport={{ once: true, margin: "-100px" }}
					whileInView={{ opacity: 1, y: 0 }}
				>
					<div className="bg-gradient-to-br from-violet-500/10 to-purple-600/10 border border-violet-500/20 rounded-tile p-8 md:p-12 w-full">
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
