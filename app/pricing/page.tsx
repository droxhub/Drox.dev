"use client";

import { Handshake, Receipt } from "lucide-react";
import { motion } from "motion/react";
import DiscoverySprint from "@/components/DiscoverySprint";
import CTAButton from "@/components/ui/cta-button";
import SectionHeader from "@/components/ui/section-header";
import { engagementModels } from "@/config/content";

/**
 * Reached from a nav item labelled "Pricing". The price question is therefore
 * answered first — honestly, without a rate card — and the engagement models
 * follow. Previously the page opened with the models and buried "What it
 * costs" at the very bottom, so the nav label promised something the first
 * screen didn't deliver.
 */
export default function PricingPage() {
	return (
		<div className="flex w-full flex-col items-center px-4 sm:px-6 xl:px-0">
			<section className="flex w-full flex-col items-center py-12 md:py-20">
				<SectionHeader
					as="h1"
					badge="Pricing"
					icon={Receipt}
					subtitle={engagementModels.subtitle}
					title={engagementModels.title}
					size="xl"
				/>

				{/* What we can commit to before scope is known — the answer a visitor
				    clicking "Pricing" is actually looking for. */}
				<div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
					{engagementModels.commitments.map((commitment, index) => (
						<motion.div
							key={commitment.title}
							className="flex flex-col rounded-[1.75rem] border-2 border-dashed border-default-200 p-7 dark:border-default-100 md:p-8"
							initial={{ opacity: 0, y: 20 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							viewport={{ once: true, margin: "-80px" }}
							whileInView={{ opacity: 1, y: 0 }}
						>
							<h2 className="text-lg font-medium text-white md:text-xl">
								{commitment.title}
							</h2>
							<p className="mt-3 text-sm leading-relaxed text-default-500 md:text-base">
								{commitment.detail}
							</p>
						</motion.div>
					))}
				</div>

				{/* The low-commitment way in, before the five full engagement models
				    — a buyer who isn't ready for any of them needs an option that
				    isn't "come back when you are". */}
				<div className="mt-16 w-full max-w-7xl md:mt-24">
					<DiscoverySprint />
				</div>

				{/* Engagement models. Cards rather than the hairline-ruled table this
				    used to be — that table was the only left-aligned block on a page
				    of centred cards, and its right-aligned "best for" column had
				    nothing to align against. */}
				<div className="mt-20 w-full max-w-6xl md:mt-28">
					<SectionHeader
						badge="Engagement Models"
						icon={Handshake}
						subtitle={engagementModels.modelsSubtitle}
						title={engagementModels.modelsTitle}
						size="lg"
					/>

					{/* Flex-wrap, so the two cards left over on the last row centre
					    instead of hugging the left edge with a hole beside them. */}
					<div className="flex flex-wrap justify-center gap-6 md:gap-8">
						{engagementModels.models.map((model, index) => (
							<motion.div
								key={model.name}
								className="flex w-full flex-col rounded-[1.75rem] border-2 border-dashed border-default-200 bg-transparent p-7 transition-colors duration-300 hover:border-violet-500/50 dark:border-default-100 md:w-[calc(50%-1rem)] md:p-8 lg:w-[calc(33.333%-1.34rem)]"
								initial={{ opacity: 0, y: 20 }}
								transition={{ duration: 0.5, delay: index * 0.08 }}
								viewport={{ once: true, margin: "-80px" }}
								whileInView={{ opacity: 1, y: 0 }}
							>
								<h3 className="text-xl font-medium text-foreground">
									{model.name}
								</h3>
								<p className="mt-3 text-base leading-relaxed text-default-500">
									{model.what}
								</p>
								{/* mt-auto keeps this on the baseline across cards whose
								    descriptions run to different lengths. */}
								<p className="mt-auto pt-6 text-sm uppercase tracking-widest text-violet-500">
									{model.bestFor}
								</p>
							</motion.div>
						))}
					</div>
				</div>

				<motion.div
					className="mt-16 w-full max-w-3xl rounded-[1.75rem] border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-purple-600/10 p-8 text-center md:p-12"
					initial={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true, margin: "-80px" }}
					whileInView={{ opacity: 1, y: 0 }}
				>
					<p className="mx-auto max-w-2xl text-base leading-relaxed text-default-500 md:text-lg">
						{engagementModels.closingNote}
					</p>
					<div className="mt-8 flex justify-center">
						<CTAButton
							href="/contact"
							location="pricing"
							text="Get a written proposal"
						/>
					</div>
				</motion.div>
			</section>
		</div>
	);
}
