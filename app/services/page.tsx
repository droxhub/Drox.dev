"use client";

import { Divider } from "@heroui/react";
import {
	Lightbulb,
	MagnifyingGlass,
	Rocket,
	ShieldCheck,
} from "@phosphor-icons/react";
import { Workflow } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import Badge from "@/components/chip";
import { subtitle, title } from "@/components/primitives";
import ServiceCards from "@/components/ServiceCards";
import CTAButton from "@/components/ui/cta-button";
import SectionHeader from "@/components/ui/section-header";
import WhyChooseUs from "@/components/WhyChooseUs";
import { cn } from "@/lib/utils";

const processSteps = [
	{
		id: 1,
		icon: MagnifyingGlass,
		title: "Discover & Strategize",
		description:
			"We dive deep into understanding your brand, goals, and audience. Through collaborative discussions and research, we craft a clear roadmap tailored to your needs.",
		color: "from-violet-500 to-purple-600",
	},
	{
		id: 2,
		icon: Lightbulb,
		title: "Design & Planning",
		description:
			"Our creative team translates strategy into stunning visuals and intuitive user experiences, detailing every milestone for a seamless execution.",
		color: "from-blue-500 to-cyan-600",
	},
	{
		id: 3,
		icon: Rocket,
		title: "Iterative Development",
		description:
			"We bring concepts to life with cutting-edge technology, following an agile process that ensures transparency, quality, and high performance.",
		color: "from-pink-500 to-rose-600",
	},
	{
		id: 4,
		icon: ShieldCheck,
		title: "Testing & Launch",
		description:
			"Quality is non-negotiable. We conduct meticulous testing across all devices to ensure a flawless launch that makes an immediate impact.",
		color: "from-green-500 to-emerald-600",
	},
];

export default function ServicesPage() {
	const [activeStep, setActiveStep] = useState(1);

	return (
		<div className="flex flex-col items-center w-full px-4 sm:px-6 xl:px-0">
			{/* Hero Section */}
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				<motion.div
					animate={{ opacity: 1, y: 0 }}
					initial={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.5 }}
				>
					<Badge />
				</motion.div>

				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="inline-block max-w-sm lg:max-w-4xl text-center justify-center"
					initial={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.5, delay: 0.1 }}
				>
					<h1 className={title({ size: "xl" })}>
						<span className="gradient-line">
							Our&nbsp;
							<span className={title({ color: "violet", size: "xl" })}>
								Services
							</span>
						</span>
					</h1>
				</motion.div>

				<motion.p
					animate={{ opacity: 1 }}
					className={subtitle({
						class: "max-w-3xl text-center text-gray-500 py-2",
					})}
					initial={{ opacity: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					Comprehensive digital solutions tailored to your business needs. From
					concept to launch, we&apos;re with you every step of the way.
				</motion.p>
			</section>

			{/* Services Grid */}
			<ServiceCards hideHeader={true} />

			<Divider className="w-full max-w-7xl my-16 md:my-24 bg-white/5" />

			{/* Methodology / Process Section */}
			<section className="flex flex-col items-center w-full my-16 md:my-32 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
				<SectionHeader
					badge="Our Work Process"
					icon={Workflow}
					title="From idea to impact — our process makes it easy!"
					size="lg"
				/>

				{/* Accordion Container */}
				<div className="flex flex-col lg:flex-row w-full gap-4 min-h-[550px] lg:h-[650px]">
					{processSteps.map((step) => {
						const isActive = activeStep === step.id;
						return (
							<motion.div
								key={step.id}
								layout
								onClick={() => setActiveStep(step.id)}
								transition={{
									layout: {
										duration: 0.8,
										ease: [0.23, 1, 0.32, 1],
									},
								}}
								className={cn(
									"relative cursor-pointer overflow-hidden rounded-[2.8rem] shadow-2xl border border-white/5 transition-colors duration-[800ms]",
									isActive
										? "flex-[6] bg-[#0c0c16]"
										: "flex-1 bg-[#0a0a14] hover:bg-[#0f0f1b]",
								)}
							>
								<div className="p-8 md:p-12 h-full flex flex-col justify-between relative z-10">
									<div className="flex flex-col gap-6">
										<div className="flex justify-between items-start">
											{/* Large Number with dynamic scaling */}
											<motion.span
												className={cn(
													"text-7xl md:text-9xl font-bold transition-colors duration-[800ms] block",
													isActive ? "text-white" : "text-[#1a1a2e]",
												)}
												animate={{
													scale: isActive ? 1 : 0.85,
													opacity: isActive ? 1 : 0.5,
												}}
											>
												{step.id}
											</motion.span>

											{/* Icon with staggered entrance */}
											<AnimatePresence>
												{isActive && (
													<motion.div
														initial={{
															opacity: 0,
															scale: 0.5,
															rotate: -20,
															y: 10,
														}}
														animate={{ opacity: 1, scale: 1, rotate: 12, y: 0 }}
														exit={{
															opacity: 0,
															scale: 0.5,
															rotate: -20,
															y: 10,
														}}
														transition={{ duration: 0.4 }}
														className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform mt-4`}
													>
														<step.icon
															className="text-white"
															size={32}
															weight="duotone"
														/>
													</motion.div>
												)}
											</AnimatePresence>
										</div>

										<AnimatePresence>
											{isActive && (
												<motion.div
													key="content"
													initial={{ opacity: 0, y: 15 }}
													animate={{
														opacity: 1,
														y: 0,
														transition: {
															duration: 0.5,
															ease: [0.23, 1, 0.32, 1],
															delay: 0.15,
														},
													}}
													exit={{
														opacity: 0,
														y: -5,
														transition: {
															duration: 0.3,
															ease: [0.4, 0, 1, 1],
														},
													}}
													className="mt-6"
												>
													<h3 className="text-3xl md:text-5xl font-medium text-white mb-6 leading-tight">
														<span className="gradient-line">{step.title}</span>
													</h3>
													<p className="text-lg md:text-xl text-gray-400 font-normal leading-relaxed max-w-xl">
														{step.description}
													</p>
												</motion.div>
											)}
										</AnimatePresence>
									</div>
								</div>

								{/* Subtle Background Glow when active */}
								{isActive && (
									<div
										className={`absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-br ${step.color} opacity-10 blur-[120px] rounded-full`}
									/>
								)}
							</motion.div>
						);
					})}
				</div>
			</section>

			<Divider className="w-full max-w-7xl my-16 md:my-24 bg-white/5" />

			{/* Why Choose Us Section */}
			<div className="w-full px-4 sm:px-6 xl:px-0">
				<WhyChooseUs />
			</div>

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
							Ready to Get Started?
						</h2>
						<p className="text-base md:text-lg text-default-600 text-center mt-4 mb-6">
							Let&apos;s discuss how we can help transform your digital presence
							and achieve your business goals.
						</p>
						<div className="flex justify-center">
							<CTAButton href="/contact" text="Get in Touch" />
						</div>
					</div>
				</motion.div>
			</section>

			<style jsx global>{``}</style>
		</div>
	);
}
