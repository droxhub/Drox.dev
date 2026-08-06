"use client";

import type { LucideIcon } from "lucide-react";
import { Target, TrendingUp, Users, Workflow } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import SectionHeader from "@/components/ui/section-header";
import SpecularEdge from "@/components/ui/specular-edge";
import { businessChallenges } from "@/config/content";
import { DURATION } from "@/lib/motion";

/**
 * Icons are presentation, so they live here rather than in `config/content.ts`
 * — the config stays copy the client can edit without touching a component.
 * Keyed by group name so reordering the config can't silently mismatch them.
 */
const GROUP_ICONS: Record<string, LucideIcon> = {
	Operational: Workflow,
	"Customer Experience": Users,
	Growth: TrendingUp,
};

/**
 * The two card glows, painted as background gradients rather than blurred boxes.
 *
 * They used to be `rounded-full` spans anchored outside the card under
 * `blur-[70px]`, pulled back inside by the parent's rounded `overflow-hidden`.
 * On iOS that clip does not hold. Anything carrying a `filter` is composited,
 * and WebKit does not reliably apply a rounded overflow clip to a composited
 * child — so the glow's *square* bounding box painted straight through the
 * corner it sits in, and the card rendered with three rounded corners and a
 * square bottom-left, exactly where the violet glow is anchored. Promoting the
 * clipping element with `transform-gpu` did not fix it on a real device.
 *
 * A radial gradient is the same shape with no filter. Nothing inside the card
 * is composited, so there is nothing left to escape the clip — the corner is
 * correct by construction rather than by compositor behaviour. It also drops
 * two 70px blurs per card, on three cards, out of every paint.
 *
 * The geometry carries over exactly. A 256px disc at `-bottom-24 -left-20` puts
 * its centre 48px in from the left and 32px up from the bottom; a 70px blur is
 * a 35px sigma, so the falloff dies ~3 sigma past the disc edge, at 233px. The
 * stops trace that Gaussian — flat through the core, half alpha at the disc
 * edge (128px, 55% of the extent), tail to nothing.
 */
const GLOW_BOTTOM_LEFT =
	"radial-gradient(circle 233px at 48px calc(100% - 32px), rgb(124 58 237 / 0.5) 0%, rgb(124 58 237 / 0.49) 25%, rgb(124 58 237 / 0.42) 40%, rgb(124 58 237 / 0.25) 55%, rgb(124 58 237 / 0.08) 70%, rgb(124 58 237 / 0) 100%)";

/** Twin of the above: a 224px purple disc at `-right-16 -top-20`, same 70px blur. */
const GLOW_TOP_RIGHT =
	"radial-gradient(circle 217px at calc(100% - 48px) 32px, rgb(147 51 234 / 0.4) 0%, rgb(147 51 234 / 0.39) 19%, rgb(147 51 234 / 0.34) 35%, rgb(147 51 234 / 0.2) 52%, rgb(147 51 234 / 0.06) 68%, rgb(147 51 234 / 0) 100%)";

/**
 * Company Profile p.12, near-verbatim.
 *
 * This sits directly under the hero because it is the section that makes a
 * visitor think "that's us" — the site previously went straight from an
 * abstract headline to a wall of statistics with nothing in between to
 * establish that Drox Dev understands the reader's situation.
 *
 * The cards use the same surface as the HowWeWork panels and the /about mission
 * cards — deep violet base, two soft glows, a hairline of light along the top
 * edge — rather than the dashed outline used elsewhere. Three dashed boxes of
 * plain bullets read as a spec sheet, which is the wrong register for the one
 * section that has to feel like recognition.
 *
 * On top of that the edge carries a specular highlight that tracks the cursor
 * (`components/ui/specular-edge.tsx`). It fades in as the pointer approaches
 * rather than switching on at the boundary, so all three cards respond to where
 * the cursor is on the section rather than one lighting up on hover.
 */
export default function BusinessChallenges() {
	const reduceMotion = useReducedMotion();

	return (
		// `overflow-x-clip`, because the specular overlay on each card is inset
		// past its edges and this grid runs the full width of a phone. `clip`
		// rather than `hidden`: it does not create a scroll container and leaves
		// the other axis `visible`, so the glow still bleeds vertically. Covers
		// the case the CSS `:has(canvas)` guard cannot — a hover-capable browser
		// zoomed to 200%, where the canvas does mount and the viewport is narrow
		// anyway (WCAG 2.2 SC 1.4.4).
		<section className="flex w-full flex-col items-center overflow-x-clip py-16 md:py-24">
			<SectionHeader
				badge="The Problem"
				icon={Target}
				subtitle={businessChallenges.subtitle}
				title={businessChallenges.title}
				size="lg"
			/>

			<div className="grid w-full max-w-7xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
				{businessChallenges.groups.map((group, index) => {
					const Icon = GROUP_ICONS[group.name];

					return (
						<motion.article
							key={group.name}
							/* No `overflow-hidden` here: the specular canvas is inset -20px
							   so its glow can bleed past the edge. The surface and glows are
							   clipped by the inner wrapper instead. */
							className="group relative rounded-panel p-7 ring-1 ring-inset ring-white/[0.06] transition-shadow duration-slow hover:shadow-2xl hover:shadow-violet-950/50 md:p-8"
							initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
							transition={{
								duration: reduceMotion ? 0 : DURATION.slow,
								delay: reduceMotion ? 0 : index * 0.1,
							}}
							viewport={{ once: true, margin: "-100px" }}
							whileInView={{ opacity: 1, y: 0 }}
						>
							{/* Surface. Same three layers as the HowWeWork panels: a deep
							    violet base, glows that bloom on hover, and a hairline along
							    the top edge that gives the card its shape without a border.
							    Clipped here rather than on the article so the specular canvas
							    outside it survives. */}
							{/* `clip-path` alongside the `overflow-hidden`, because on iOS the
							    overflow clip alone let the old blurred glows paint their square
							    bounding boxes through the corners (see GLOW_BOTTOM_LEFT). The
							    glows are gradients now and nothing here is composited, but a
							    hover opacity transition can still promote a layer mid-flight,
							    and clip-path is applied to the layer rather than in software. */}
							<span
								aria-hidden="true"
								className="absolute inset-0 overflow-hidden rounded-panel [clip-path:inset(0_round_var(--radius-panel))]"
							>
								<span className="absolute inset-0 bg-gradient-to-b from-card-top via-card-mid to-card-bottom" />
								{/* Opacity only on hover, never `scale` — animating a gradient's
								    geometry means repainting it every frame, on three cards. */}
								<span
									className="absolute inset-0 opacity-30 transition-opacity duration-slow group-hover:opacity-70"
									style={{ backgroundImage: GLOW_BOTTOM_LEFT }}
								/>
								<span
									className="absolute inset-0 opacity-20 transition-opacity duration-slow group-hover:opacity-50"
									style={{ backgroundImage: GLOW_TOP_RIGHT }}
								/>
								<span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent transition-opacity duration-slow group-hover:via-violet-400/80" />
							</span>

							{/* The shader draws the corner itself, so this has to be told the
							    host's radius in px — it cannot read the class. Keep in step
							    with --radius-panel (2rem = 32px) in styles/globals.css. */}
							<SpecularEdge
								baseColor="#2a1a52"
								lineColor="#ddd6fe"
								proximity={280}
								radius={32}
								shineFade={45}
								shineSize={12}
								thickness={1.5}
							/>

							<div className="relative z-10">
								<div className="mb-7 flex items-center gap-4">
									{/* Scaled-down twin of the /about mission-card icon tile. */}
									<span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-tile bg-violet-600 shadow-[0_0_30px_-10px_rgba(124,58,237,0.6)]">
										{Icon ? (
											<Icon
												aria-hidden="true"
												className="text-white"
												size={22}
											/>
										) : null}
									</span>
									<h3 className="text-lg font-medium leading-snug tracking-tight text-white md:text-xl">
										{group.name}
									</h3>
								</div>

								{/* Hairlines instead of the previous 1px dots. At five items a
								    row of loose bullets has no structure; a ruled list reads as
								    a checklist of things the reader can tick off. */}
								<ul className="space-y-0">
									{group.items.map((item) => (
										<li
											key={item}
											className="flex gap-3 border-b border-white/[0.06] py-3 text-base leading-relaxed text-default-500 last:border-0 last:pb-0"
										>
											<span
												aria-hidden="true"
												className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.9)]"
											/>
											{item}
										</li>
									))}
								</ul>
							</div>
						</motion.article>
					);
				})}
			</div>
		</section>
	);
}
