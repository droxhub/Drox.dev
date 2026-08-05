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
 * carries a face, a name and a title; what that person is accountable for sits
 * below the card, because it is the part a buyer is actually reading for.
 *
 * The card is React Bits' ProfileCard — see components/ui/profile-card.tsx for
 * the port notes and docs/STATUS.md for how the portraits are prepared. The
 * user-info bar is off: upstream fills it with a social handle, a status and a
 * contact button, none of which have a truthful equivalent for a founder here.
 */
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
							iconUrl="/profile-card-pattern.svg"
							innerGradient="linear-gradient(145deg, rgba(124,58,237,0.55) 0%, rgba(76,29,149,0.30) 100%)"
							name={person.name}
							showUserInfo={false}
							title={person.role}
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
