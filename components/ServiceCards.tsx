"use client";

import {
	CaretDown,
	ChartLineUp,
	DeviceMobile,
	Gear,
	Globe,
	Palette,
	ShoppingCart,
} from "@phosphor-icons/react";
import { motion } from "motion/react";
import { useState } from "react";

import { title } from "@/components/primitives";
import { Grid } from "@/components/ui/feature-card";
import SectionHeader from "@/components/ui/section-header";

const services = [
	{
		icon: Globe,
		title: "Web Development",
		description:
			"Custom web applications built with modern technologies. From responsive websites to complex web platforms, we deliver scalable solutions that perform.",
		gradient: "from-violet-400 to-purple-600",
		features: [
			"React & Next.js Development",
			"Full-Stack Solutions",
			"API Integration",
			"Performance Optimization",
		],
	},
	{
		icon: DeviceMobile,
		title: "Mobile App Development",
		description:
			"Native and cross-platform mobile applications for iOS and Android. We create intuitive, high-performance apps that users love.",
		gradient: "from-blue-400 to-cyan-600",
		features: [
			"iOS & Android Apps",
			"React Native Development",
			"UI/UX Design",
			"App Store Optimization",
		],
	},
	{
		icon: Palette,
		title: "UI/UX Design",
		description:
			"Beautiful, user-centered designs that combine aesthetics with functionality. We create interfaces that engage users and drive conversions.",
		gradient: "from-pink-400 to-rose-600",
		features: [
			"User Research",
			"Wireframing & Prototyping",
			"Visual Design",
			"Design Systems",
		],
	},
	{
		icon: ShoppingCart,
		title: "E-Commerce Solutions",
		description:
			"Complete e-commerce platforms that drive sales. From product catalogs to payment integration, we build online stores that convert.",
		gradient: "from-yellow-400 to-orange-600",
		features: [
			"Online Store Development",
			"Payment Gateway Integration",
			"Inventory Management",
			"Analytics & Reporting",
		],
	},
	{
		icon: ChartLineUp,
		title: "Digital Marketing",
		description:
			"Data-driven marketing strategies that grow your business. We help you reach the right audience and maximize your ROI.",
		gradient: "from-green-400 to-emerald-600",
		features: [
			"SEO & SEM",
			"Social Media Marketing",
			"Content Strategy",
			"Analytics & Insights",
		],
	},
	{
		icon: Gear,
		title: "Maintenance & Support",
		description:
			"Ongoing support and maintenance to keep your digital assets running smoothly. We ensure your systems stay updated and secure.",
		gradient: "from-cyan-400 to-blue-600",
		features: [
			"24/7 Monitoring",
			"Security Updates",
			"Performance Tuning",
			"Technical Support",
		],
	},
];

interface ServiceCardsProps {
	showChip?: boolean;
	hideHeader?: boolean;
}

const ServiceCards = ({
	showChip = false,
	hideHeader = false,
}: ServiceCardsProps) => {
	const [showAll, setShowAll] = useState(false);
	const MOBILE_VISIBLE_COUNT = 3;

	return (
		<section className="flex flex-col items-center w-full my-16 md:my-24 px-4 md:px-6 lg:px-8">
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
											weight="regular"
										/>
									</div>
									<h3 className="text-lg font-semibold mb-3 text-white relative z-20 transition-all duration-300 group-hover:scale-110 origin-center inline-block group-hover:drop-shadow-[0_2px_4px_rgba(168,85,247,0.4)]">
										{service.title}
									</h3>
									<p className="text-sm text-gray-400 leading-relaxed relative z-20 transition-all duration-300 group-hover:scale-110 origin-center inline-block group-hover:drop-shadow-[0_2px_4px_rgba(168,85,247,0.4)]">
										{service.description}
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

						{/* Button container */}
						<div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-auto mb-[-55px]">
							<button
								className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 bg-gradient-to-t from-[#1a0b2e] to-[#0a0525] border border-gray-800/80 rounded-full hover:border-purple-500/60 hover:shadow-2xl hover:shadow-purple-900/40 overflow-hidden"
								onClick={() => setShowAll(true)}
							>
								{/* Subtle purple glow on hover */}
								<span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-600/20 via-violet-600/20 to-purple-600/20 transition-opacity duration-300" />

								{/* Text container with slide animation */}
								<span className="relative z-10 overflow-hidden inline-block">
									{/* Original text - slides up and fades out */}
									<span className="inline-block transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0">
										Show All Services
									</span>
									{/* Duplicate text - slides up from bottom */}
									<span className="absolute left-0 top-0 inline-block translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
										Show All Services
									</span>
								</span>

								<span className="relative z-10 ml-2 transition-transform duration-300 group-hover:translate-y-1">
									<CaretDown size={18} weight="bold" />
								</span>
							</button>
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

export default ServiceCards;
