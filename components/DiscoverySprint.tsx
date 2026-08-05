"use client";

import { Check, Compass } from "lucide-react";
import { motion } from "motion/react";
import CTAButton from "@/components/ui/cta-button";
import SectionHeader from "@/components/ui/section-header";
import { discoverySprint } from "@/config/content";
import { DURATION, STAGGER } from "@/lib/motion";

/**
 * The site's only risk-reduction surface. Everything else asks the buyer to
 * commit to a build; this asks them to commit to two weeks and keeps the output
 * theirs either way.
 *
 * Deliberately styled as the commitment cards directly below it on `/pricing`
 * — dashed border, transparent fill — so the page reads as one page. The
 * anchor id is linked from the homepage closing CTA, so keep it stable.
 */
export default function DiscoverySprint() {
	return (
		<section
			className="flex w-full flex-col items-center py-16 md:py-24"
			id="discovery-sprint"
		>
			<SectionHeader
				badge={discoverySprint.badge}
				icon={Compass}
				subtitle={discoverySprint.subtitle}
				title={discoverySprint.title}
				size="lg"
			/>

			{/* What you walk away with. */}
			<div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
				{discoverySprint.deliverables.map((item, index) => (
					<motion.div
						key={item.title}
						className="flex flex-col rounded-panel border-2 border-dashed border-default-200 bg-transparent p-7 transition-colors duration-base hover:border-violet-500/50 dark:border-default-100 md:p-8"
						initial={{ opacity: 0, y: 20 }}
						transition={{ duration: DURATION.slow, delay: index * STAGGER }}
						viewport={{ once: true, margin: "-80px" }}
						whileInView={{ opacity: 1, y: 0 }}
					>
						<h3 className="text-xl font-medium text-foreground">
							{item.title}
						</h3>
						<p className="mt-3 text-base leading-relaxed text-default-500">
							{item.detail}
						</p>
					</motion.div>
				))}
			</div>

			{/* The terms are the offer — without them it's just a paid workshop.
			    Violet panel, matching the closing note further down /pricing and the
			    homepage closing CTA. */}
			<motion.div
				className="mt-8 w-full max-w-5xl rounded-panel border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-purple-600/10 p-8 md:mt-10 md:p-12"
				initial={{ opacity: 0, y: 20 }}
				transition={{ duration: DURATION.slow }}
				viewport={{ once: true, margin: "-80px" }}
				whileInView={{ opacity: 1, y: 0 }}
			>
				<p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-default-500 md:text-lg">
					{discoverySprint.intro}
				</p>

				<ul className="mx-auto mt-10 flex max-w-2xl flex-col gap-4">
					{discoverySprint.terms.map((term) => (
						<li className="flex items-start gap-3" key={term}>
							<Check
								aria-hidden="true"
								className="mt-1 h-4 w-4 shrink-0 text-violet-500"
							/>
							<span className="text-base leading-relaxed text-default-500">
								{term}
							</span>
						</li>
					))}
				</ul>

				<div className="mt-10 flex justify-center">
					<CTAButton
						href={discoverySprint.cta.href}
						location="discovery_sprint"
						text={discoverySprint.cta.text}
					/>
				</div>
			</motion.div>
		</section>
	);
}
