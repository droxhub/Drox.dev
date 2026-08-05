"use client";

import {
	Box,
	Brain,
	ChevronDown,
	Globe,
	Palette,
	Settings,
	ShoppingCart,
	Smartphone,
	TrendingUp,
	Zap,
} from "lucide-react";

import { motion } from "motion/react";
import { useState } from "react";

import { title } from "@/components/primitives";
import CTAButton from "@/components/ui/cta-button";
import { Grid } from "@/components/ui/feature-card";
import SectionHeader from "@/components/ui/section-header";

/**
 * The nine service lines from the 2026 Company Profile (p.14), in the order a
 * buyer should meet them: engineering first, marketing last.
 *
 * Previously this listed six, and omitted AI Solutions and Business Automation
 * entirely — the two capabilities that separate Drox Dev from a web agency.
 * `sub` carries the profile's own sub-capability lists.
 */
const services = [
	{
		icon: Box,
		title: "Software Engineering",
		description:
			"Custom software designed around each business's unique processes, not around a template.",
		sub: "Business management systems · ERP · CRM · Internal platforms · SaaS applications · Custom dashboards · API development",
	},
	{
		icon: Brain,
		title: "AI Solutions",
		description:
			"Helping organisations use AI where it improves productivity, decisions and engagement — and saying so when it wouldn't.",
		sub: "AI assistants & chatbots · Document processing · Business intelligence · LLM integration · AI-powered internal tools",
	},
	{
		icon: Zap,
		title: "Business Automation",
		description:
			"Automating repetitive work so your team can spend its time on the things that actually need a person.",
		sub: "Workflow automation · CRM & HR automation · Finance process automation · Approval workflows · Notification systems",
	},
	{
		icon: Globe,
		title: "Web Development",
		description:
			"Modern web platforms combining performance, usability and scalability.",
		sub: "Corporate websites · Customer portals · Web applications · CMS solutions · Progressive web apps",
	},
	{
		icon: Smartphone,
		title: "Mobile Applications",
		description:
			"Applications built for performance, usability and long-term maintainability.",
		sub: "Android · iOS · Cross-platform · Customer apps · Internal business apps",
	},
	{
		icon: Palette,
		title: "UI/UX Design",
		description:
			"Digital experiences that are intuitive, accessible and aligned with business goals.",
		sub: "User research · UX strategy · Interface design · Wireframing · Interactive prototypes · Design systems",
	},
	{
		icon: ShoppingCart,
		title: "E-Commerce Solutions",
		description:
			"Commerce platforms built to improve the buying experience and grow online sales.",
		sub: "Custom e-commerce · Shopify & WooCommerce · Inventory & payment integration · Order management · Marketplaces",
	},
	{
		icon: Settings,
		title: "Support & Continuous Improvement",
		description:
			"Keeping systems reliable and evolving after launch — the part most vendors treat as an afterthought.",
		sub: "Performance monitoring · Bug resolution · Security updates · Infrastructure maintenance · Feature enhancements",
	},
	{
		icon: TrendingUp,
		title: "Digital Marketing",
		description:
			"Measurable strategies that support growth, usually alongside a platform we've already built for you.",
		sub: "SEO · Social media marketing · Google & Meta ads · Content strategy · Conversion optimisation",
	},
];

interface ServiceCardsProps {
	/** Suppresses the section header — `/services` already has its own. */
	hideHeader?: boolean;
}

const ServiceCards = ({ hideHeader = false }: ServiceCardsProps) => {
	const [showAll, setShowAll] = useState(false);
	const MOBILE_VISIBLE_COUNT = 3;

	return (
		<section className="flex flex-col items-center w-full my-16 md:my-24">
			{!hideHeader && (
				<SectionHeader
					badge="Services"
					icon={Globe}
					title={
						<>
							<span className="gradient-line">
								What We{" "}
								<span className={title({ color: "violet", size: "lg" })}>
									Offer
								</span>
							</span>
						</>
					}
					subtitle="A full spectrum of digital services to help your business thrive in the digital age"
					centered={true}
					size="lg"
				/>
			)}

			{/* Cards Container with relative positioning for overlay */}
			<div className="relative w-full max-w-7xl">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
					{services.map((service, index) => {
						// On mobile, hide cards after MOBILE_VISIBLE_COUNT unless showAll is true
						const isHiddenOnMobile = !showAll && index >= MOBILE_VISIBLE_COUNT;

						return (
							<motion.div
								key={index}
								className={isHiddenOnMobile ? "hidden md:block" : ""}
								initial={{ opacity: 0, y: 20 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								viewport={{ once: true, margin: "-100px" }}
								whileInView={{ opacity: 1, y: 0 }}
							>
								<div className="relative bg-gradient-to-b flex flex-col justify-start from-[#0E0C1E] to-[#08061D] p-8 rounded-3xl overflow-hidden border border-[#1C1A31]/50 transition-all duration-300 h-full group hover:scale-[0.96] hover:shadow-2xl">
									<Grid size={20} />
									<div className="mb-6 relative z-20">
										<service.icon
											className="text-purple-600 dark:text-purple-400 block transition-all duration-300 group-hover:scale-[1.2] group-hover:ml-[-10px] group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]"
											size={32}
											style={{ transformOrigin: "center" }}
										/>
									</div>
									<h3 className="text-lg font-semibold mb-3 text-white relative z-20">
										{service.title}
									</h3>
									<p className="text-sm text-gray-400 leading-relaxed relative z-20">
										{service.description}
									</p>
									{/* The profile's own sub-capability list — what a buyer
									    scans for to check you do their specific thing. */}
									<p className="mt-4 pt-4 border-t border-white/5 text-xs leading-relaxed text-gray-400 relative z-20">
										{service.sub}
									</p>
								</div>
							</motion.div>
						);
					})}
				</div>

				{/* Mobile-only: Blur overlay and Show All button */}
				{!showAll && (
					<div className="md:hidden absolute bottom-0 left-0 right-0 pointer-events-none">
						{/* Gradient blur overlay */}
						<div className="h-40 bg-gradient-to-t from-[#030014] via-[#030014]/95 to-transparent" />

						{/* Button container. This button's styling WAS the site's de facto
						    button language — it now lives in CTAButton, so the hero,
						    projects and closing CTA all share it. */}
						<div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-auto mb-[-55px]">
							<CTAButton
								icon={<ChevronDown size={18} />}
								iconMotion="down"
								location="services_show_all"
								onClick={() => setShowAll(true)}
								text="Show All Services"
							/>
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

export default ServiceCards;
