"use client";

import { track } from "@vercel/analytics";
import { CalendarCheck, Mail, Phone } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { title } from "@/components/primitives";
import { CalInline, isBookingEnabled } from "@/components/ui/cal-booking";
import CTAButton from "@/components/ui/cta-button";
import { contactPage, homepage } from "@/config/content";
import { siteConfig } from "@/config/site";

const { closingCta } = homepage;
const { email, phone } = contactPage.contactInfo;

/**
 * The homepage previously ended on the FAQ with no call to action, so the
 * visitors who read the whole page — the most engaged ones — reached the
 * bottom with nothing to do.
 */
export default function ClosingCTA() {
	// The calendar isn't mounted with the page. This is the site's busiest
	// section and only a fraction of the readers who reach it want a booking
	// widget, so embed.js isn't requested until the button is pressed.
	const [showCalendar, setShowCalendar] = useState(false);
	const reduceMotion = useReducedMotion();

	return (
		<section className="flex flex-col items-center w-full py-16 md:py-24">
			<motion.div
				className="w-full max-w-4xl"
				initial={{ opacity: 0, y: 30 }}
				transition={{ duration: 0.6 }}
				viewport={{ once: true, margin: "-100px" }}
				whileInView={{ opacity: 1, y: 0 }}
			>
				<div className="rounded-[2rem] border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-purple-600/10 p-8 md:p-14 text-center">
					<h2 className={title({ size: "lg" })}>
						<span className="gradient-line">{closingCta.title}</span>
					</h2>

					<p className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-default-500 leading-relaxed">
						{closingCta.description}
					</p>

					<div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
						{isBookingEnabled ? (
							<CTAButton
								className="w-full sm:w-auto"
								icon={<CalendarCheck className="h-[18px] w-[18px]" />}
								iconMotion="down"
								location="homepage_closing"
								onClick={() => {
									setShowCalendar(true);
									track("booking_open", { location: "homepage_closing" });
								}}
								text={siteConfig.booking.label}
							/>
						) : (
							<CTAButton
								className="w-full sm:w-auto"
								href={closingCta.primary.href}
								location="homepage_closing"
								text={closingCta.primary.text}
							/>
						)}
						<CTAButton
							className="w-full sm:w-auto"
							external
							href={`https://wa.me/${phone.whatsapp}`}
							location="homepage_closing"
							text={closingCta.secondary.text}
						/>
					</div>

					{/* Revealed in place rather than in a modal, so the page keeps its
					    scroll position and nothing has to trap focus. */}
					<AnimatePresence>
						{showCalendar && (
							<motion.div
								animate={{ opacity: 1, height: "auto" }}
								className="mt-10 overflow-hidden text-left"
								exit={{ opacity: 0, height: 0 }}
								initial={
									reduceMotion
										? { opacity: 1, height: "auto" }
										: { opacity: 0, height: 0 }
								}
								transition={{ duration: reduceMotion ? 0 : 0.4 }}
							>
								<CalInline />
							</motion.div>
						)}
					</AnimatePresence>

					<p className="mt-6 text-sm text-default-400">
						{closingCta.reassurance}
					</p>

					{/* Risk reduction, at the point of conversion. A reader who got this
					    far but isn't ready to scope a whole build had nothing to click. */}
					<p className="mt-3 text-sm text-default-400">
						{closingCta.lowCommitment.lead}{" "}
						<Link
							className="text-purple-300 underline underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded"
							href={closingCta.lowCommitment.href}
							onClick={() =>
								track("cta_click", {
									text: closingCta.lowCommitment.linkText,
									location: "homepage_closing",
									href: closingCta.lowCommitment.href,
								})
							}
						>
							{closingCta.lowCommitment.linkText}
						</Link>
						.
					</p>

					{/* Direct channels, for buyers who won't use a form. */}
					<div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 border-t border-white/5 pt-8 text-sm">
						<a
							className="inline-flex items-center gap-2 text-default-400 hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
							href={email.link}
							onClick={() =>
								track("contact_click", {
									channel: "email",
									location: "homepage_closing",
								})
							}
						>
							<Mail className="text-purple-400" size={18} />
							{email.address}
						</a>
						<a
							className="inline-flex items-center gap-2 text-default-400 hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
							href={phone.link}
							onClick={() =>
								track("contact_click", {
									channel: "phone",
									location: "homepage_closing",
								})
							}
						>
							<Phone className="text-purple-400" size={18} />
							{phone.display}
						</a>
						<a
							className="inline-flex items-center gap-2 text-default-400 hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
							href={`https://wa.me/${phone.whatsapp}`}
							onClick={() =>
								track("contact_click", {
									channel: "whatsapp",
									location: "homepage_closing",
								})
							}
							rel="noopener noreferrer"
							target="_blank"
						>
							<SiWhatsapp
								aria-hidden="true"
								className="text-purple-400"
								size={18}
							/>
							WhatsApp
						</a>
					</div>
				</div>
			</motion.div>
		</section>
	);
}
