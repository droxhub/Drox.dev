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
							{/*
							 * `transform-gpu` is a Safari workaround, not decoration.
							 *
							 * WebKit does not reliably apply a rounded `overflow: hidden` clip
							 * to a *composited* child, and anything carrying a filter is
							 * composited — both glows below are `blur-[70px]`. The glow's square
							 * bounding box then punches through the corner it sits in. On an
							 * iPhone this card rendered with three rounded corners and a square
							 * bottom-left, which is exactly where the violet glow is anchored
							 * (`-bottom-24 -left-20`).
							 *
							 * Promoting the clipping element to its own layer makes WebKit apply
							 * the rounded clip on the compositor, where the child already lives.
							 * One layer per card, and the glows force a layer regardless.
							 *
							 * Not reproducible in headless Chromium or headless WebKit — neither
							 * uses iOS's compositing path. Check this on a real device.
							 */}
							<span
								aria-hidden="true"
								className="absolute inset-0 overflow-hidden rounded-panel transform-gpu"
							>
								<span className="absolute inset-0 bg-gradient-to-b from-card-top via-card-mid to-card-bottom" />
								{/* Opacity only on hover, never `scale` — animating a 70px blur
								    means recomputing it every frame, on three cards at once. */}
								<span className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-violet-600/50 opacity-30 blur-[70px] transition-opacity duration-slow group-hover:opacity-70" />
								<span className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-purple-600/40 opacity-20 blur-[70px] transition-opacity duration-slow group-hover:opacity-50" />
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
