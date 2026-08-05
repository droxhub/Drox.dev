"use client";

import { Divider } from "@heroui/react";
import { motion } from "motion/react";
import Badge from "@/components/chip";
import HowWeWork from "@/components/HowWeWork";
import { subtitle, title } from "@/components/primitives";
import ServiceCards from "@/components/ServiceCards";
import TechStack from "@/components/TechStack";
import CTAButton from "@/components/ui/cta-button";
import WhyChooseUs from "@/components/WhyChooseUs";
import { DURATION } from "@/lib/motion";

export default function ServicesPage() {
	return (
		<div className="flex flex-col items-center w-full px-4 sm:px-6 xl:px-0">
			{/* Hero Section */}
			<section className="flex flex-col items-center justify-center gap-4 py-12 md:py-20">
				<motion.div
					animate={{ opacity: 1, y: 0 }}
					initial={{ opacity: 0, y: 20 }}
					transition={{ duration: DURATION.slow }}
				>
					<Badge />
				</motion.div>

				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="inline-block max-w-sm lg:max-w-4xl text-center justify-center"
					initial={{ opacity: 0, y: 20 }}
					transition={{ duration: DURATION.slow, delay: 0.1 }}
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
						class: "max-w-3xl text-center text-gray-400 py-2",
					})}
					initial={{ opacity: 0 }}
					transition={{ duration: DURATION.slow, delay: 0.2 }}
				>
					Nine service lines, built around how your business operates rather
					than around a template. We start with the business, not the software.
				</motion.p>
			</section>

			{/* Services Grid */}
			<ServiceCards hideHeader={true} />

			<Divider className="w-full max-w-7xl my-16 md:my-24 bg-white/5" />

			{/* Methodology / Process Section — the same hover-expand strips the
			    homepage uses, so there is one implementation of the seven stages
			    rather than two that can drift. `variant` swaps the heading copy and
			    drops the CTA, which would otherwise link to this page. */}
			{/* Gutter only — no second max-width. The component already caps its own
			    row at max-w-7xl, so wrapping it in another one and then padding
			    inside that clipped the outer strips. Matches the TechStack and
			    WhyChooseUs wrappers below. */}
			<div className="w-full">
				<HowWeWork variant="services" />
			</div>

			<Divider className="w-full max-w-7xl my-16 md:my-24 bg-white/5" />

			{/* Moved off the homepage: "which technologies do you use" is a question
			    a buyer asks once they're already evaluating services, not three
			    screens into their first visit. */}
			<div className="w-full">
				<TechStack />
			</div>

			<Divider className="w-full max-w-7xl my-16 md:my-24 bg-white/5" />

			{/* Why Choose Us Section */}
			<div className="w-full">
				<WhyChooseUs />
			</div>

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
