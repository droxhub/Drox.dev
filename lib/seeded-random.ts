/**
 * A tiny deterministic PRNG (mulberry32).
 *
 * The decorative particle fields on this site were all built the same way:
 * generate positions with `Math.random()` inside an effect, then `setState`.
 * The effect existed only to dodge a hydration mismatch — the server and the
 * client would otherwise disagree about where every dot goes.
 *
 * Seeding the randomness instead makes them agree, which removes the effect,
 * the state and the cascading re-render, and lets the visual paint on the first
 * pass rather than after hydration. The layout is then identical on every load,
 * which for a background starfield is a feature rather than a cost.
 *
 * Returns a function with the same shape as `Math.random` — [0, 1).
 */
export function seededRandom(seed: number): () => number {
	let state = seed >>> 0;

	return () => {
		state = (state + 0x6d2b79f5) >>> 0;

		let t = state;

		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);

		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}
