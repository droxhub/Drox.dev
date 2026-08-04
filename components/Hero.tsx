"use client";

import { motion } from "motion/react";
import Badge from "@/components/chip";
import { subtitle, title } from "@/components/primitives";
import PrototypeImg from "@/components/prototype-img";
import ColourfulText from "@/components/ui/colourful-text";
import CTAButton from "@/components/ui/cta-button";
import { homepage } from "@/config/content";

const { hero } = homepage;

export default function Hero() {
	return (
		// Vertical rhythm is set per block below rather than by a section-level
		// `gap`, so adding the CTA row doesn't push every other gap out of step.
		<section className="flex flex-col items-center justify-center px-5 pt-8 md:pt-10">
			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="relative z-10"
				initial={{ opacity: 0, y: 20 }}
				transition={{ duration: 0.5 }}
			>
				<Badge />
			</motion.div>

			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="relative z-10 mt-7 md:mt-8 w-full max-w-[34rem] md:max-w-3xl lg:max-w-4xl text-center"
				initial={{ opacity: 0, y: 20 }}
				transition={{ duration: 0.5, delay: 0.1 }}
			>
				{/* One h1 per page. The highlight is a span, not a second heading.
				    The <br> only applies from sm up — on a phone the headline wraps
				    naturally instead of being forced into a short, ragged column. */}
				<h1 className={title({ size: "xl" })}>
					<span className="gradient-line">{hero.title.line1}</span>
					<br className="hidden sm:block" />{" "}
					<span className="gradient-line">{hero.title.line2} </span>
					<ColourfulText text={hero.title.highlight} />
				</h1>

				{/* Its own measure — the headline container is far too wide to read
				    a full sentence across on desktop. */}
				<p
					className={subtitle({
						class: "mx-auto mt-5 max-w-xl text-balance",
					})}
				>
					{hero.subtitle}
				</p>
			</motion.div>

			{/* Primary conversion path. Nothing else in this viewport competes. */}
			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="relative z-10 mt-9 md:mt-10 flex w-full max-w-[19rem] flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-4"
				initial={{ opacity: 0, y: 20 }}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				{hero.ctaButtons.map((cta) => (
					<CTAButton
						key={cta.text}
						className="w-full sm:w-auto"
						href={cta.href}
						location="hero"
						text={cta.text}
					/>
				))}
			</motion.div>

			{/* The black-hole visual is pulled up under the CTAs. These two negative
			    offsets are the dials for that overlap: raise them to tuck it closer,
			    lower them to give the buttons more air. */}
			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="w-full mt-0 sm:mt-[-10px] md:mt-[-20px] lg:mt-[-30px]"
				initial={{ opacity: 0, y: 20 }}
				transition={{ duration: 0.6, delay: 0.5 }}
			>
				<div className="mt-[-40px] sm:mt-[-60px] md:mt-[-70px]">
					<PrototypeImg />
				</div>
			</motion.div>
		</section>
	);
}
