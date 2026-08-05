/**
 * The motion scale, in the units `motion/react` wants.
 *
 * The CSS half of this lives in the `@theme` block of styles/globals.css as
 * `--transition-duration-*` and `--ease-*`, and generates the `duration-fast` /
 * `ease-entrance` utilities. These are the same numbers in seconds and as raw
 * bezier control points. CSS and JS animate the same site, so a value that
 * exists on one side and not the other is how a scale comes apart — change one,
 * change both.
 *
 * Reduced motion is not handled here. `<MotionConfig reducedMotion="user">` in
 * app/providers.tsx drops transform and layout animations for every `motion`
 * component at once, which is why almost nothing below needs a `reduceMotion`
 * branch of its own.
 */

/** Seconds, mirroring --transition-duration-* in styles/globals.css. */
export const DURATION = {
	/** 200ms — a state flip the eye should not have to wait for. */
	fast: 0.2,
	/** 300ms — anything already on screen changing appearance. */
	base: 0.3,
	/** 500ms — a large surface, or an element arriving. */
	slow: 0.5,
} as const;

/**
 * Cubic-bezier control points, mirroring --ease-* in styles/globals.css.
 *
 * Typed as a mutable tuple rather than left to `as const`: motion's `Easing`
 * accepts `[number, number, number, number]`, and a `readonly` tuple is not
 * assignable to it.
 */
type Bezier = [number, number, number, number];

export const EASE: Record<"standard" | "entrance", Bezier> = {
	/** The default. Also Tailwind's, so CSS and JS agree without a class. */
	standard: [0.4, 0, 0.2, 1],
	/** A hard decelerate, for something arriving or expanding. */
	entrance: [0.32, 0.72, 0, 1],
};

/**
 * Seconds between adjacent items in a staggered reveal — `delay: index *
 * STAGGER`. One value rather than the 0.08 / 0.1 that were in use: the gap
 * should come from the scale, not from how many cards the grid happens to hold.
 *
 * Hand-set delays that are still literals (Hero's 0.5, the FAQ's 0.3) are not
 * this. They sequence one specific element against one other specific element,
 * which is composition, not a rhythm.
 */
export const STAGGER = 0.08;
