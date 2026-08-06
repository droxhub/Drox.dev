"use client";

import { Workflow } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import CTAButton from "@/components/ui/cta-button";
import SectionHeader from "@/components/ui/section-header";
import { engineeringProcess } from "@/config/content";
import { DURATION, EASE } from "@/lib/motion";

const { steps } = engineeringProcess;

/**
 * The de-risking section: it answers "what happens if I engage?", which is the
 * question the case study above it raises and the one a buyer has to answer
 * internally before they can recommend a supplier.
 *
 * Hover-expand strips. Sizing is driven by `flexGrow` rather than the fixed rem
 * widths the pattern usually ships with, so the row fills the container exactly
 * at any viewport instead of being centred at one hard-coded total. The same
 * animation drives both orientations — flex-grow follows the main axis, so
 * turning the container to `flex-col` on mobile makes it expand downwards with
 * no second code path.
 *
 * The detail lives in the interactive accordion on `/services`; both read the
 * same steps from `config/content.ts`.
 */
function StageStrip({
	step,
	isActive,
	onActivate,
}: {
	step: (typeof steps)[number];
	isActive: boolean;
	onActivate: () => void;
}) {
	const reduceMotion = useReducedMotion();

	/**
	 * Three timings rather than one, because the panel is doing three different
	 * jobs at once and running them at the same speed is what makes an expander
	 * feel abrupt.
	 *
	 * The size gets a spring, so the strip settles rather than stopping dead on a
	 * timer. The surface crossfades on a slow ease that tracks it. The text is
	 * asymmetric — it fades *in* late, once the panel has opened enough to hold
	 * it, and *out* fast, so the outgoing and incoming labels never overlap
	 * mid-move.
	 */
	const sizeTransition = reduceMotion
		? { duration: 0 }
		: { type: "spring" as const, visualDuration: 0.55, bounce: 0.16 };

	const surfaceTransition = {
		duration: reduceMotion ? 0 : DURATION.slow,
		ease: EASE.entrance,
	};

	const textTransition = (visible: boolean) =>
		reduceMotion
			? { duration: 0 }
			: {
					duration: visible ? DURATION.base : DURATION.fast,
					delay: visible ? 0.2 : 0,
					ease: EASE.entrance,
				};

	const number = (
		<>
			<span className="text-violet-500">0</span>
			{step.id}
		</>
	);

	return (
		<motion.li
			animate={{ flexGrow: isActive ? 6 : 1 }}
			className="min-h-0 min-w-0 basis-0 list-none"
			initial={false}
			transition={sizeTransition}
		>
			{/* One button per stage rather than handlers on a div: hover alone would
			    leave this unusable by keyboard and touch. Focus opens it too, so
			    tabbing through walks the process in order. */}
			<button
				aria-expanded={isActive}
				/* `rounded-tile` on mobile, not `rounded-panel`. A closed row is 52px
				   tall there, and a browser clamps a radius to half the shorter side
				   — so 32px rendered as 26px and the rows came out as pills rather
				   than cards. Worse, the clamp lifts as the row grows to 312px, so
				   the corners visibly unrolled from pill to card during the open,
				   which reads as a flicker. 16px never clamps at either size, so the
				   shape is constant throughout. Desktop strips are ~105px wide when
				   closed, where 32px is well clear of the clamp.

				   `transform-gpu` is a separate Safari fix: WebKit does not reliably
				   apply a rounded overflow clip to a composited child, and the two
				   glows below carry `blur-[70px]`/`blur-[80px]`, so their square
				   bounding boxes punch through the corner they sit in. Same fix and
				   same reason as BusinessChallenges. */
				className="group relative h-full w-full transform-gpu overflow-hidden rounded-tile text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas md:rounded-panel"
				onClick={onActivate}
				onFocus={onActivate}
				onMouseEnter={onActivate}
				type="button"
			>
				{/* Background. With the border gone the panel has to hold its own
				    shape, so the surface does the work: a deep violet base, two soft
				    glows that bloom as the stage opens, and a hairline of light along
				    the top edge. Same treatment as the mission cards on /about. */}
				<motion.span
					animate={{ opacity: isActive ? 1 : 0.55 }}
					aria-hidden="true"
					/* A brighter top stop on mobile. The two glows below are desktop
					   only now, and they were carrying most of the violet — without
					   them the open stage fell back to the bare gradient and read as
					   near-black, barely distinguishable from a closed row. Lifting
					   the first stop puts the colour back into the layer that is
					   already being painted, so it costs no extra layer. Desktop keeps
					   the original stops, where the glows still supply the bloom. */
					className="absolute inset-0 bg-gradient-to-b from-violet-950 via-card-top to-card-bottom md:from-card-top md:via-card-mid"
					initial={false}
					transition={surfaceTransition}
				/>
				{/* The two glows are desktop only (`hidden md:block`).
				 *
				 * A transition cross-fades six full-bleed layers in the outgoing strip
				 * and six in the incoming one, while both boxes are resizing — twelve
				 * full-size layers repainting per frame. Measured on a throttled phone
				 * profile, tapping through the stages: `flexGrow` alone drops 11% of
				 * frames, the two text layers take it to 20%, and these four
				 * decorative layers to 29%. Idle is 0% and scrolling the page is 4%,
				 * so the section was five times the cost of ordinary page work.
				 *
				 * These two are the expensive pair — 288px and 256px boxes under 70px
				 * and 80px blurs. Dropping them below `md` keeps the surface gradient
				 * and the top hairline, so the card treatment survives; what is lost
				 * on a phone is the bloom as a stage opens. Desktop is untouched,
				 * where the strips are larger and the devices faster.
				 *
				 * Opacity only, never `scale`: animating a 70px blur's size forces the
				 * browser to recompute the blur every frame.
				 */}
				<motion.span
					animate={{ opacity: isActive ? 0.9 : 0.22 }}
					aria-hidden="true"
					className="pointer-events-none absolute -bottom-24 -left-20 hidden h-72 w-72 rounded-full bg-violet-600/50 blur-[70px] md:block"
					initial={false}
					transition={surfaceTransition}
				/>
				<motion.span
					animate={{ opacity: isActive ? 0.7 : 0.15 }}
					aria-hidden="true"
					className="pointer-events-none absolute -right-16 -top-20 hidden h-64 w-64 rounded-full bg-fuchsia-500/40 blur-[80px] md:block"
					initial={false}
					transition={surfaceTransition}
				/>
				<motion.span
					animate={{ opacity: isActive ? 1 : 0.4 }}
					aria-hidden="true"
					className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/60 to-transparent"
					initial={false}
					transition={surfaceTransition}
				/>
				{/* Collapsed label. Horizontal on mobile where the strip is wide and
				    short, vertical on desktop where it's narrow and tall. Marked
				    decorative — the expanded layer below carries the real text. */}
				<motion.span
					animate={{ opacity: isActive ? 0 : 1 }}
					aria-hidden="true"
					className="absolute inset-0 flex items-center gap-4 px-5 md:flex-col md:items-start md:justify-start md:gap-5 md:py-7"
					initial={false}
					transition={textTransition(!isActive)}
				>
					<span className="text-3xl font-bold tabular-nums tracking-tighter text-foreground">
						{number}
					</span>
					<span className="whitespace-nowrap text-base text-default-500 md:[writing-mode:vertical-rl]">
						{step.title}
					</span>
				</motion.span>

				{/* Expanded content. Fixed width so the text doesn't reflow while the
				    strip animates — the panel just clips it when collapsed. Always in
				    the DOM, so it stays indexable and readable to a screen reader. */}
				<motion.span
					animate={{ opacity: isActive ? 1 : 0 }}
					className="absolute inset-0 flex w-[20rem] max-w-full flex-col justify-start gap-5 p-6 md:w-[22rem] md:justify-between md:gap-0 md:p-8"
					initial={false}
					transition={textTransition(isActive)}
				>
					{/* Desktop pins the number top and the prose bottom, because that
					    strip is tall and narrow and top-aligning both left it looking
					    half empty. Mobile keeps them together — the panel is wide and
					    short there, so splitting them just opens a hole in the middle. */}
					<span className="text-4xl font-bold tabular-nums tracking-tighter text-foreground md:text-5xl">
						{number}
					</span>
					<span className="block">
						<span className="mb-3 block text-xl font-medium text-foreground">
							{step.title}
						</span>
						<span className="block text-base leading-relaxed text-default-500">
							{step.description}
						</span>
					</span>
				</motion.span>
			</button>
		</motion.li>
	);
}

/**
 * `variant` selects the heading copy from `config/content.ts` and decides
 * whether the closing CTA appears — pointing at /services from /services would
 * be a link to the page you're already on.
 */
export default function HowWeWork({
	variant = "homepage",
}: {
	variant?: "homepage" | "services";
}) {
	const [active, setActive] = useState(0);
	const copy = engineeringProcess[variant];

	return (
		<section className="flex w-full flex-col items-center py-16 md:py-24">
			<SectionHeader
				badge="How We Work"
				icon={Workflow}
				subtitle={copy.subtitle}
				title={copy.title}
				size="lg"
			/>

			{/* Fixed height in both orientations is what lets flex-grow do the work,
			    so the mobile height has to be budgeted rather than guessed: the 6:1
			    ratio splits it into one expanded panel and six collapsed rows, and
			    at 42rem, less the six 8px gaps, that measures 312px for the open
			    stage — enough for the longest description, "Deployment" — and 52px
			    per closed row, which clears the 44px minimum tap target. At 34rem
			    the rows were 45px and the paragraph was running out of room. */}
			<ol className="flex h-[42rem] w-full max-w-7xl flex-col gap-2 md:h-[26rem] md:flex-row">
				{steps.map((step, index) => (
					<StageStrip
						isActive={active === index}
						key={step.key}
						onActivate={() => setActive(index)}
						step={step}
					/>
				))}
			</ol>

			{variant === "homepage" && (
				<motion.div
					className="mt-12 flex justify-center md:mt-16"
					initial={{ opacity: 0, y: 20 }}
					viewport={{ once: true }}
					whileInView={{ opacity: 1, y: 0 }}
				>
					<CTAButton
						href="/services"
						location="homepage_process"
						text="See the full process"
					/>
				</motion.div>
			)}
		</section>
	);
}
