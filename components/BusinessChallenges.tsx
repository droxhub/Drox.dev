"use client";

import { Target } from "lucide-react";
import { motion } from "motion/react";
import type { LogoItem } from "@/components/ui/LogoLoop";
import { LogoLoop } from "@/components/ui/LogoLoop";
import SectionHeader from "@/components/ui/section-header";
import { businessChallenges } from "@/config/content";
import { DURATION } from "@/lib/motion";

/**
 * Per-row speed and direction. Three different speeds rather than one, and
 * alternating direction, because three rows moving together at the same rate
 * read as one block sliding — the point of the stagger is that the rows are
 * independent streams.
 */
const ROWS = [
	{ direction: "left", speed: 38 },
	{ direction: "right", speed: 30 },
	{ direction: "left", speed: 46 },
] as const;

/**
 * The page colour, for the fade at each end of a row.
 *
 * `hsl(var(--background))` = `rgb(0,0,20)`, NOT `var(--color-canvas)` (`#030014`
 * = `rgb(3,0,20)`). Three levels of red is invisible on a monitor and plain on
 * an OLED phone in a dark room — the seam documented in docs/STATUS.md twice
 * over. `components/TechStack.tsx` passes `--color-canvas` here and has the same
 * latent seam; it was left alone rather than changed unasked.
 */
const FADE_COLOR = "hsl(var(--background))";

/**
 * Company Profile p.12, near-verbatim.
 *
 * This sits directly under the hero because it is the section that makes a
 * visitor think "that's us" — the site previously went straight from an
 * abstract headline to a wall of statistics with nothing in between to
 * establish that Drox Dev understands the reader's situation.
 *
 * ## Why this is not a list
 *
 * It was one three times: dashed outline boxes of bullets, then violet cards
 * holding an inset panel holding a ruled list, then an editorial two-column
 * layout with the pains as statements on hairlines. All three were rejected as
 * reading like a document, and the third proved the point — **fifteen short
 * phrases stacked vertically are list-shaped whatever chrome is put on them.**
 * Removing the boxes did not help because the boxes were never the problem.
 *
 * So the form changed rather than the styling. Each group is a horizontal
 * stream of pills moving at its own speed, and a reader scans across rather
 * than reading down. It reads as a run of real complaints going past, which is
 * the register this section wants, and it collapses ~1630px of vertical list
 * into three rows.
 *
 * `LogoLoop` is the marquee already used by `TechStack`, driven here with
 * `renderItem` so the items are pills rather than logos.
 *
 * **Do not turn this back into rows of text.** If it needs more weight the
 * levers are the pill size, the row gap and the speeds.
 *
 * Motion: `LogoLoop` freezes its own track under `prefers-reduced-motion`
 * (WCAG 2.2 SC 2.3.3), and `pauseOnHover` stops the row under the pointer.
 */
export default function BusinessChallenges() {
	return (
		/* Full-bleed, so this one is NOT wrapped in the homepage's gutter div —
		   see the note in app/page.tsx. A stream that visibly starts and stops
		   inside a 1280px box is not a stream; boxed to `max-w-7xl` on a 1440
		   screen the rows began and ended 80px in from each side and read as
		   three cropped strips. The rows now run to the viewport edges and
		   LogoLoop's fade blends them into the page there. The header keeps the
		   gutter, because it is text and text needs the margin. */
		<section className="flex w-full flex-col items-center overflow-x-clip py-16 md:py-24">
			<div className="w-full px-4 sm:px-6">
				<SectionHeader
					badge="The Problem"
					icon={Target}
					subtitle={businessChallenges.subtitle}
					title={businessChallenges.title}
					size="lg"
				/>
			</div>

			<div className="w-full space-y-7 md:space-y-9">
				{businessChallenges.groups.map((group, index) => {
					const row = ROWS[index % ROWS.length];

					/* `ariaLabel` per item so the pill is announced as its own text —
					   the visible node is decorative markup around a phrase. */
					const logos: LogoItem[] = group.items.map((item) => ({
						node: item,
						ariaLabel: item,
					}));

					return (
						<motion.div
							key={group.name}
							initial={{ opacity: 0, y: 20 }}
							transition={{
								duration: DURATION.slow,
								delay: index * 0.1,
							}}
							viewport={{ once: true, margin: "-100px" }}
							whileInView={{ opacity: 1, y: 0 }}
						>
							{/* The label sits BESIDE the stream from `md` up, not above it.

							    Stacked, each group was two elements and the section was six of
							    them in a column — the eye had to work out which caption owned
							    which row, and on a phone the labels were most of what you saw.
							    Beside it, the row reads as one statement: "Operational → these
							    problems". Below `md` it stays above, because pinning a 9rem
							    label to the left of a 390px screen would leave 240px of stream.

							    `min-w-0` on the stream is load bearing: a flex child defaults
							    to `min-width: auto`, which is the marquee's full content width,
							    so without it the row refuses to shrink and pushes the page
							    sideways. */}
							<div className="md:flex md:items-center md:gap-6 lg:gap-8">
								<h3 className="mb-3 px-4 text-xs font-medium uppercase tracking-[0.2em] text-violet-300/70 sm:px-6 md:mb-0 md:w-36 md:shrink-0 md:px-0 md:pl-6 md:text-right md:text-[0.8125rem] lg:w-44">
									{group.name}
								</h3>

								<div className="min-w-0 md:flex-1">
									<LogoLoop
										fadeOut
										pauseOnHover
										ariaLabel={`${group.name} problems`}
										direction={row.direction}
										fadeOutColor={FADE_COLOR}
										gap={16}
										logos={logos}
										speed={row.speed}
										renderItem={(item, key) => (
											<span
												key={key}
												className="flex items-center gap-2.5 whitespace-nowrap rounded-full bg-white/[0.04] px-5 py-3 text-base leading-none text-gray-300 ring-1 ring-inset ring-white/10 transition-colors duration-base hover:bg-white/[0.08] hover:text-white md:px-6 md:py-3.5 md:text-lg"
											>
												<span
													aria-hidden="true"
													className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.9)]"
												/>
												{"node" in item ? item.node : null}
											</span>
										)}
									/>
								</div>
							</div>
						</motion.div>
					);
				})}
			</div>
		</section>
	);
}
