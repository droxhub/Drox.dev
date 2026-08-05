"use client";

import { Users } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import ProfileCard from "@/components/ui/profile-card";
import SectionHeader from "@/components/ui/section-header";
import { founders } from "@/config/content";
import { DURATION, STAGGER } from "@/lib/motion";

/**
 * Four named, accountable founders — from Company Profile p.24.
 *
 * This is the answer to "who is actually doing the work, and will they still
 * be here", which is the first question asked of any young firm. Each card
 * carries a face, a name and the area that person owns; what they are
 * accountable for sits below the card, because it is the part a buyer is
 * actually reading for.
 *
 * The card shows `shortRole` ("Direction", "Operations") rather than the formal
 * `role` ("Chief Executive Officer"): four C-suite titles on four cards say
 * what the offices are, not who owns what, and they are the only strings in
 * this section long enough to wrap.
 *
 * The card is React Bits' ProfileCard — see components/ui/profile-card.tsx for
 * the port notes and docs/STATUS.md for how the portraits are prepared. The
 * user-info bar is off: upstream fills it with a social handle, a status and a
 * contact button, none of which have a truthful equivalent for a founder here.
 */
/**
 * The tile the card's holographic sweep is masked through, one per ownership
 * area — a navigation arrow, a cog, stacked layers, angle brackets.
 *
 * These are **luminance masks**, not icons: `.pc-shine` shows the sweep wherever
 * the tile is white and hides it wherever it is black, so they are black-backed
 * SVGs of 8px blocks rather than coloured artwork. White coverage is held
 * between 8.9% and 11.6% across the four, against the 8.9% of the shared tile
 * they replaced — a denser glyph reads as a brighter card, which would make one
 * founder look more important than the others.
 *
 * Keyed by `shortRole` and living here rather than in `config/content.ts`, the
 * same way `BusinessChallenges` keys its icons: reordering the config cannot
 * silently mismatch them, and the config stays copy the client can edit. The
 * fallback is the original shared tile, so an unrecognised area degrades to the
 * old look rather than to no mask at all — which would flood the whole card.
 */
const ROLE_PATTERNS: Record<string, string> = {
	Direction: "/founders/pattern-direction.svg",
	Operations: "/founders/pattern-operations.svg",
	Architecture: "/founders/pattern-architecture.svg",
	Engineering: "/founders/pattern-engineering.svg",
};

export default function Founders() {
	const reduceMotion = useReducedMotion();

	return (
		<section className="flex flex-col items-center w-full my-16 md:my-24">
			<SectionHeader
				badge="Leadership"
				icon={Users}
				size="lg"
				subtitle={founders.subtitle}
				title={founders.title}
			/>

			{/* items-start so a taller accountability line doesn't stretch its row. */}
			<div className="grid w-full max-w-7xl grid-cols-1 items-start gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
				{founders.people.map((person, index) => (
					<motion.div
						/* The card takes its height from its width, so an uncapped
						   two-across column produces a 650px-tall card. Only the
						   four-across layout is narrow enough to leave uncapped. */
						className="mx-auto flex w-full max-w-[320px] flex-col sm:max-w-[340px] lg:max-w-none"
						initial={{ opacity: 0, y: 20 }}
						key={person.name}
						transition={{ duration: DURATION.slow, delay: index * STAGGER }}
						viewport={{ once: true, margin: "-80px" }}
						whileInView={{ opacity: 1, y: 0 }}
					>
						<ProfileCard
							avatarFallback={person.initials}
							avatarUrl={person.photo ?? undefined}
							behindGlowColor="rgba(139, 92, 246, 0.45)"
							className="founder-profile-card"
							/* The tilt is pointer-driven motion with no informational
							   value — WCAG 2.2 SC 2.3.3. */
							enableTilt={!reduceMotion}
							iconUrl={
								ROLE_PATTERNS[person.shortRole] ?? "/profile-card-pattern.svg"
							}
							innerGradient="linear-gradient(145deg, rgba(124,58,237,0.55) 0%, rgba(76,29,149,0.30) 100%)"
							name={person.name}
							showUserInfo={false}
							title={person.shortRole}
						/>

						<p className="mt-5 px-1 text-sm leading-relaxed text-gray-400">
							{person.responsibility}
						</p>
					</motion.div>
				))}
			</div>
		</section>
	);
}
