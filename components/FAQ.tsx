"use client";

import { Accordion, AccordionItem } from "@heroui/react";
import { IconPlus } from "@tabler/icons-react";
import { CircleHelp } from "lucide-react";
import { motion } from "motion/react";
import { title } from "@/components/primitives";
import SectionHeader from "@/components/ui/section-header";

const faqContent = [
	{
		question: "What services do you offer?",
		answer:
			"We're a one-stop-shop for all things digital! From crafting stunning websites to skyrocketing your SEO rankings, managing your social media, and building unforgettable brands, we do it all. Oh, and we promise we don't bite.",
	},
	{
		question: "How long does it take to design a website?",
		answer:
			"It depends on the scope of the project. Typically, a standard business website takes 2-4 weeks from concept to launch, while more complex platforms may take 6-8 weeks or longer.",
	},
	{
		question: "Do you work with small businesses or just big brands?",
		answer:
			"We work with ambitious businesses of all sizes! Whether you're a startup looking to make your mark or an established enterprise scaling up, we have tailored solutions for you.",
	},
	{
		question: "Can I customize the packages you offer?",
		answer:
			"Absolutely! We understand that every business is unique. We can tailor a package that fits your specific needs, goals, and budget perfectly.",
	},
	{
		question: "How do you measure the success of a marketing campaign?",
		answer:
			"We focus on data-driven results. We track key performance indicators (KPIs) like traffic, conversion rates, engagement, and ROI to ensure your campaign is delivering real value.",
	},
	{
		question: "What if I don't like the designs or strategies?",
		answer:
			"Your satisfaction is our priority. We work collaboratively with you, offering revisions and feedback loops to ensure the final result aligns perfectly with your vision.",
	},
];

export default function FAQ() {
	return (
		<section className="w-full py-16 md:py-24 px-4 md:px-6 lg:px-8">
			<div className="max-w-4xl mx-auto text-center">
				<SectionHeader
					badge="Frequently Asked Questions"
					icon={CircleHelp}
					title={
						<>
							<span className={title({ color: "violet", size: "lg" })}>
								FAQ It Up!
							</span>
						</>
					}
					subtitle="Your curiosity meets our expertise — let's clear things up! We've gathered all the important info right here. Explore our FAQs and find the answers you need."
					size="lg"
				/>

				{/* Accordion */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className="w-full mt-12 md:mt-20"
				>
					<Accordion
						variant="splitted"
						itemClasses={{
							base: "group-[.is-splitted]:px-6 group-[.is-splitted]:bg-transparent group-[.is-splitted]:shadow-none group-[.is-splitted]:hover:bg-default-100 dark:group-[.is-splitted]:hover:bg-white/5 transition-colors rounded-[1rem] mb-4 data-[open=true]:bg-default-100 bg-[#0c0d21] dark:data-[open=true]:bg-white/5",
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
								aria-label={item.question}
								title={item.question}
								indicator={<IconPlus />}
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
