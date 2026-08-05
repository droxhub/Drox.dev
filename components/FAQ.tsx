"use client";

import { Accordion, AccordionItem } from "@heroui/react";
import { CircleHelp, Plus } from "lucide-react";
import { motion } from "motion/react";
import { title } from "@/components/primitives";
import SectionHeader from "@/components/ui/section-header";
import { faqContent } from "@/config/content";
import { DURATION } from "@/lib/motion";

export default function FAQ() {
	return (
		<section className="w-full py-16 md:py-24">
			<div className="max-w-4xl mx-auto text-center">
				<SectionHeader
					badge="Frequently Asked Questions"
					icon={CircleHelp}
					title={
						<>
							<span className="gradient-line">
								Questions buyers actually{" "}
								<span className={title({ color: "violet", size: "lg" })}>
									ask
								</span>
							</span>
						</>
					}
					subtitle="Pricing, ownership, timelines, and what happens if it goes wrong."
					size="lg"
				/>

				{/* Accordion */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: DURATION.slow, delay: 0.3 }}
					className="w-full mt-12 md:mt-20"
				>
					<Accordion
						variant="splitted"
						itemClasses={{
							base: "group-[.is-splitted]:px-6 group-[.is-splitted]:bg-transparent group-[.is-splitted]:shadow-none group-[.is-splitted]:hover:bg-default-100 dark:group-[.is-splitted]:hover:bg-white/5 transition-colors rounded-tile mb-4 data-[open=true]:bg-default-100 bg-[#0c0d21] dark:data-[open=true]:bg-white/5",
							title: "font-medium text-lg text-default-900 text-left",
							trigger: "py-6 data-[hover=true]:bg-transparent",
							content:
								"text-default-500 pb-6 pt-6 text-left border-t border-dashed border-default-300 dark:border-white/20",
							indicator:
								"text-default-900 transform transition-transform data-[open=true]:rotate-45",
						}}
					>
						{faqContent.map((item, index) => (
							<AccordionItem
								key={index}
								/* No `aria-label` here. HeroUI puts it on the base <div>,
								   which has no role, and `aria-label` on a roleless div is
								   ignored by most screen readers — axe flags it as
								   aria-prohibited-attr. `title` already renders the question
								   as the trigger's own text, which is the accessible name
								   that actually works. */
								title={item.question}
								indicator={<Plus />}
							>
								{item.answer}
							</AccordionItem>
						))}
					</Accordion>
				</motion.div>
			</div>
		</section>
	);
}
