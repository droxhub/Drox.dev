"use client";

import { motion, useReducedMotion } from "motion/react";
import type React from "react";
import { DURATION, EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Aceternity's Lamp effect, inverted so the beam shines *upward*.
 *
 * Upstream hangs the light bar near the top of a `min-h-screen` box and fans
 * the beam downward, with the content pulled up onto the light line. Here it
 * sits under the hero's CTA row — the slot the black-hole artwork used to
 * occupy — so the whole thing is mirrored: the bar is at the bottom and the
 * cone opens upward, toward the headline.
 *
 * The inversion is a single `-scale-y-100` on the beam group, not a
 * hand-mirrored copy of the geometry. The group holds no text, so flipping it
 * is exact, and there are no conic angles, mask directions or translate signs
 * to re-derive by hand. `children` sits outside that wrapper, so anything
 * passed in reads the right way up.
 *
 * ## Every layer is positioned from one line
 *
 * Upstream centres each layer with `inset-auto` inside a flex container and
 * then nudges it with `-translate-y-[Nrem]`, so every offset is relative to the
 * container's vertical centre and the filament lands at `centre - 7rem`. That
 * is unreadable and it is easy to port wrong — the first attempt here put the
 * cone's apex 14rem away from the filament, which turned the lamp into a
 * shapeless bloom.
 *
 * So the anchor is explicit instead: `--bar` is the filament, and every layer
 * declares its `top` as an offset from it. The values below are upstream's,
 * re-expressed against that line rather than against the centre:
 *
 * | layer | upstream | from `--bar` |
 * | --- | --- | --- |
 * | cone halves (`h-56`) | centred, apex `at center top` | `0` |
 * | filament (`h-0.5`) | `-translate-y-[7rem]` | `0` |
 * | hot core (`h-36`) | `-translate-y-[6rem]` | `-3.5rem` |
 * | bloom (`h-36`) | `-translate-y-1/2` | `-2rem` |
 * | end cap (`h-44`) | `-translate-y-[12.5rem]` | `-11rem` |
 *
 * Upstream's base softener (`h-48`, `top-1/2 translate-y-12`) and its
 * `backdrop-blur` strip are both dropped: the group-wide fade below already
 * takes the beam to nothing before the box edge, so they only added two
 * full-bleed layers — one of them blurred — that had to be kept colour-matched
 * to the page for no visible gain.
 *
 * `scale-y-125` is dropped with them. It exists upstream to stretch the cone
 * inside a `min-h-screen` box; here the box height is the prop that controls
 * the composition, so scaling on top of it only makes `--bar` mean two things.
 *
 * ## Three other deviations
 *
 * 1. **Violet, not cyan.** The palette is violet only; a cyan hero would be the
 *    one cyan thing on the site. `--lamp-glow` and `--lamp-core` are the dials.
 * 2. **The conic gradient is written out in full**, rather than composed from
 *    `bg-gradient-conic` + `--tw-gradient-stops`. That utility is a Tailwind v3
 *    config extension this repo does not have, and v4 builds gradient stops
 *    differently — the upstream class silently produces no gradient at all.
 * 3. **The page colour is `hsl(var(--background))`, and no utility gives it to
 *    you.** The end cap has to be *exactly* the page colour or it reads as a
 *    panel. `bg-canvas` is `#030014` = `rgb(3,0,20)` against the page's
 *    `rgb(0,0,20)` — three levels of red, invisible on a monitor and plain on
 *    an OLED phone in a dark room, the same seam the black-hole video had.
 *    `bg-background` is worse: it is a **Tailwind v3 `tailwind.config.js`
 *    colour**, and this project is v4 driven by the `@theme` block in
 *    styles/globals.css with no `@config`, so the utility resolves to
 *    `rgba(0,0,0,0)`. It is on `<body>` in `app/layout.tsx` and does nothing
 *    there either — the body is painted by a raw `background-color` rule in
 *    globals.css. Both were shipped here in turn; the transparent one is why
 *    the cone's outer edge showed and why the glow spilled out of the back.
 *    `--lamp-page` now holds the real value.
 *
 * Decorative throughout: `aria-hidden` on the artwork, and under reduced motion
 * the beam is painted at its final width instead of growing (WCAG 2.2 SC 2.3.3).
 */

/**
 * Where the filament sits, measured from the BOTTOM of the box — the group is
 * mirrored, so this is a distance from the top in the unflipped coordinates the
 * layers below are written in.
 *
 * **Fixed, not a percentage.** The cone is a fixed 14rem tall, so with a
 * percentage bar its far end lands at a different fraction of every box height:
 * 70% of the 32rem desktop box but 99% of the 19rem mobile one, where it was
 * cut flat by the box edge. A fixed offset makes the beam identical at every
 * size, and the height prop then only controls how much room sits above it.
 */
const BAR = "5rem";

/** Everything from here up is faded out, so the cone never meets a box edge. */
const FADE_FULL = "11rem";
const FADE_GONE = "17rem";

/**
 * How far in from each cone's outer edge the beam fades up from nothing.
 *
 * This is a mask on the cone itself. Upstream instead lays two opaque
 * page-coloured rectangles over each half and masks *those* — which leaves the
 * cone's own hard edge underneath, covered rather than removed. Measured across
 * it at 1280px: a one-pixel step from rgb(0,0,20) to rgb(4,2,26) at x=160,
 * exactly 30rem out from the centre. Masking the cone deletes the edge instead
 * of hiding it, and drops four layers that had to be colour-matched to the page.
 *
 * A percentage, not upstream's 10rem, because the cone's width is responsive —
 * a fixed 10rem is a third of the desktop cone but nearly all of the phone one,
 * which would leave the beam barely lit at the size it is already weakest.
 */
const OUTER_FADE = "34%";

/**
 * Widths, per breakpoint, for the two cone halves and the filament.
 *
 * The cone is TWO of these side by side, so the beam spans double — which is
 * why the phone step is small. At upstream's flat 30rem the pair is 960px, and
 * on a 390px phone that shows only the bright middle of the beam, edge to edge,
 * reading as a violet wash rather than a lamp. These hold the pair at 75–90% of
 * the viewport all the way down.
 */
const BEAM_W = "w-[11rem] sm:w-[16rem] md:w-[19rem] lg:w-[26rem] xl:w-[30rem]";

/** `top` for a layer whose offset from the filament is `rem`. */
const from = (rem: number) => `calc(${BAR} + ${rem}rem)`;

export const LampContainer = ({
	children,
	className,
}: {
	children?: React.ReactNode;
	className?: string;
}) => {
	const reduceMotion = useReducedMotion();

	/**
	 * The lamp switching on.
	 *
	 * **`scaleX`, where upstream animates `width`.** Width has to be a literal
	 * value to animate, which makes the beam one fixed size at every viewport —
	 * and a 30rem cone is wider than a 390px phone, so a phone saw only its
	 * bright middle, edge to edge, reading as a violet wash rather than a lamp.
	 * A transform leaves the widths to plain responsive classes.
	 *
	 * Scaling was tried on the whole group first, as one `scale-x-*` dial. It
	 * cannot work: `mask-image` on that group brings `mask-clip: border-box`
	 * with it, which clips the group's paint to its own box, and the scale then
	 * shrinks that clipped result — the entire lamp rendered as a hard-edged
	 * 242px rectangle. The full-bleed cover layers have to stay full-bleed, so
	 * only the beam itself scales.
	 *
	 * `x: "-50%"` replaces `-translate-x-1/2` on the centred layers: motion
	 * writes the whole `transform`, so a Tailwind translate on the same element
	 * would simply be overwritten.
	 *
	 * Under reduced motion the beam is painted at full width directly — there is
	 * no animation to withhold and nothing arrives late (WCAG 2.2 SC 2.3.3).
	 */
	const grow = (centred = false) => {
		const at = (scaleX: number) =>
			centred ? { scaleX, x: "-50%" } : { scaleX };

		return reduceMotion
			? { initial: { opacity: 1, ...at(1) } }
			: {
					initial: { opacity: 0.5, ...at(0.5) },
					whileInView: { opacity: 1, ...at(1) },
					transition: {
						delay: 0.3,
						duration: DURATION.slow * 1.6,
						ease: EASE.entrance,
					},
					viewport: { once: true },
				};
	};

	return (
		<div
			className={cn(
				"relative z-0 flex w-full flex-col items-center justify-center overflow-hidden",
				className,
			)}
			style={
				{
					"--lamp-glow": "var(--color-violet-500)",
					"--lamp-core": "var(--color-violet-400)",
					/* The filament and the hotspot just above it. A real lamp's source
					   blows out to white and only the spill carries the hue — a violet
					   filament reads as a violet line, not as something emitting. */
					"--lamp-hot": "#ffffff",
					"--lamp-page": "hsl(var(--background))",
					background: "var(--lamp-page)",
				} as React.CSSProperties
			}
		>
			{/* The mirror. Everything inside is drawn as upstream's downward lamp and
			    then flipped, so a larger `top` in here is further UP the screen. */}
			{/* One fade across the whole group, on top of upstream's per-cone masks.

			    Those masks are 160px of a 224px cone — not enough to reach nothing
			    before the box clips, so the beam's wide end ended on a hard line 960px
			    across, the width of the two halves. Measured across it: a one-pixel
			    step from rgb(0,0,20) to rgb(4,2,27). This takes the beam to zero
			    while it is still well inside the box, so there is nothing left to
			    cut. Written in local coordinates: the element is mirrored, so
			    `to bottom` here fades the TOP of the lamp on screen. */}
			{/* `scale-x-*` is the responsive size dial, and it is on the group rather
			    than on each layer so the beam, the bloom and the filament stay in
			    proportion. The cone is a fixed 30rem — 480px, wider than a 390px
			    phone — so at full size a phone sees only its bright middle, edge to
			    edge, which reads as a violet wash rather than as a lamp. Scaling
			    horizontally narrows the beam without moving the bar, which is
			    positioned vertically. */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 -scale-y-100"
				style={{
					maskImage: `linear-gradient(to bottom, white 0, white ${FADE_FULL}, transparent ${FADE_GONE})`,
				}}
			>
				<div className="relative isolate z-0 h-full w-full">
					{/* Left half of the cone. Its apex is the `at center top` of the
					    conic gradient, which is why its `top` is the bar line itself. */}
					<motion.div
						{...grow()}
						className={`absolute right-1/2 h-56 origin-right ${BEAM_W}`}
						style={{
							top: from(0),
							backgroundImage:
								"conic-gradient(from 70deg at center top, var(--lamp-glow), transparent, transparent)",
							maskImage: `linear-gradient(to right, transparent, black ${OUTER_FADE})`,
						}}
					/>

					{/* Right half — the same cone at the mirrored start angle. */}
					<motion.div
						{...grow()}
						className={`absolute left-1/2 h-56 origin-left ${BEAM_W}`}
						style={{
							top: from(0),
							backgroundImage:
								"conic-gradient(from 290deg at center top, transparent, transparent, var(--lamp-glow))",
							maskImage: `linear-gradient(to left, transparent, black ${OUTER_FADE})`,
						}}
					/>

					{/* The wide bloom sitting over the bar, then the tighter, hotter core
					    inside it. Both are BELOW the cap's z-40 so their lower halves are
					    hidden behind it — see the cap. */}
					<div
						className="absolute left-1/2 z-20 h-36 w-[10rem] -translate-x-1/2 rounded-full opacity-50 blur-3xl sm:w-[15rem] md:w-[18rem] lg:w-[24rem] xl:w-[28rem]"
						style={{ top: from(-2), background: "var(--lamp-glow)" }}
					/>
					<motion.div
						{...grow(true)}
						className="absolute left-1/2 z-20 h-36 w-24 rounded-full blur-2xl sm:w-36 md:w-44 lg:w-56 xl:w-64"
						style={{ top: from(-3.5), background: "var(--lamp-core)" }}
					/>

					{/* The white blow-out hugging the bar. Wide and short — `rounded-[100%]`
					    rather than `rounded-full` so it stays an ellipse at any width and
					    does not read as a third round blob. This is the layer that makes
					    the beam look emitted rather than painted. */}
					<motion.div
						{...grow(true)}
						className="absolute left-1/2 z-30 h-16 w-32 rounded-[100%] opacity-60 blur-2xl sm:w-48 md:w-60 lg:w-80 xl:w-96"
						style={{ top: from(-1.4), background: "var(--lamp-hot)" }}
					/>

					{/* Caps everything past the bar.

					    Upstream leaves the bloom above this in the stack, so it spills out
					    of the back of the lamp — light on the far side of its own
					    reflector, which is the one thing a lamp cannot do. The bloom and
					    the core are both `z-20` now, so this hides their lower halves and
					    the glow stops dead at the filament.

					    `w-[400%] -left-[150%]` rather than `w-full` so it still spans the
					    box whatever transform the group is given. */}
					<div
						className="absolute -left-[150%] z-40 h-44 w-[400%]"
						style={{ top: from(-11), background: "var(--lamp-page)" }}
					/>

					{/* The floor the lamp stands on.

					    Above the cap, unlike the bloom — the cap exists to stop the beam
					    spilling symmetrically out of the back, which is what a lamp cannot
					    do, but a *reflection* off the surface under it is exactly what a
					    lamp does. This is that, and it is what the reference has that a
					    bare cap-and-cone does not: the bar stops reading as a line drawn
					    on the page and starts reading as a light standing on something.

					    Dimmer and much shorter than the beam, and an ellipse anchored at
					    the bar's centre, so it falls off sideways as well as down. Its
					    `100%` edge is the element's own bottom, which after the mirror is
					    the bottom of the lamp box. */}
					<div
						className="absolute left-1/2 z-[45] h-20 w-[26rem] -translate-x-1/2 sm:w-[34rem] md:w-[42rem] lg:w-[56rem] xl:w-[64rem]"
						style={{
							top: from(-5),
							backgroundImage:
								"radial-gradient(ellipse 55% 100% at 50% 100%, rgb(167 139 250 / 0.30), rgb(167 139 250 / 0.10) 45%, transparent 72%)",
						}}
					/>

					{/* The filament — a 2px line, and the only hard edge in here. Above
					    everything, so it reads as the lit edge of the cap. */}
					<motion.div
						{...grow(true)}
						className={`absolute left-1/2 z-50 h-0.5 ${BEAM_W}`}
						style={{ top: from(0), background: "var(--lamp-hot)" }}
					/>
				</div>
			</div>

			{children ? (
				<div className="relative z-50 flex w-full flex-col items-center px-5">
					{children}
				</div>
			) : null}
		</div>
	);
};

export default LampContainer;
