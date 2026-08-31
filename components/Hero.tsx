"use client";

import { motion } from "motion/react";
import Badge from "@/components/chip";
import { subtitle, title } from "@/components/primitives";
import ColourfulText from "@/components/ui/colourful-text";
import CTAButton from "@/components/ui/cta-button";
import { LampContainer } from "@/components/ui/lamp";
import { homepage } from "@/config/content";
import { DURATION } from "@/lib/motion";

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
				transition={{ duration: DURATION.slow }}
			>
				<Badge />
			</motion.div>

			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="relative z-10 mt-7 md:mt-8 w-full max-w-[34rem] md:max-w-3xl lg:max-w-4xl text-center"
				initial={{ opacity: 0, y: 20 }}
				transition={{ duration: DURATION.slow, delay: 0.1 }}
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
				transition={{ duration: DURATION.slow, delay: 0.2 }}
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

			{/* The lamp, shining up toward the CTAs. It replaced the black-hole video
			    and the scrolling note mockup on 31 August — see docs/STATUS.md.

			    The extra 2.5rem of width cancels this section's `px-5` so the beam
			    reaches the screen edges. **No `-left-5` with it** — the section is a
			    centring flex column, so an over-wide child already overhangs by half
			    the excess on each side; adding the offset shifted it a second time
			    and left a 20px dark strip down the right of every phone. And width
			    rather than `w-screen`, because 100vw includes the scrollbar and would
			    put horizontal overflow back on the homepage. **The section padding is
			    `px-5` at every breakpoint; if it changes, this changes with it.**

			    **Height is 19rem because the lamp is 19rem** — a 14rem cone standing
			    on a bar 5rem from the bottom. Anything taller is blank space above
			    the beam, and at the 32rem this shipped with, that was 208px pushing
			    the whole lamp below the fold on a 900px-tall desktop. `md` gets 2rem
			    more only so the beam is not flush against the buttons. */}
			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="w-[calc(100%+2.5rem)] mt-4 md:mt-6"
				initial={{ opacity: 0, y: 20 }}
				transition={{ duration: DURATION.slow, delay: 0.4 }}
			>
				<LampContainer className="h-[19rem] md:h-[21rem]" />
			</motion.div>
		</section>
	);
}
