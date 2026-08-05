"use client";

import { track } from "@vercel/analytics";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { bookingHref } from "@/components/ui/cal-booking";
import { contactPage } from "@/config/content";
import { siteConfig } from "@/config/site";
import { MOBILE_MENU_EVENT, type MobileMenuEvent } from "@/lib/utils";

const { phone } = contactPage.contactInfo;

/** Routes where a persistent "get in touch" bar would be redundant. */
const SUPPRESSED_ROUTES = ["/contact"];

/**
 * Mobile had no persistent action anywhere on the site: the nav CTA scrolls out
 * of the viewport and never comes back, so a reader halfway down a page had to
 * scroll to an end to do anything.
 *
 * It appears at 50% scroll rather than immediately — before that the visitor
 * hasn't read enough to be asked, and covering 15% of a phone viewport from the
 * first pixel is what makes bars like this feel like an ad.
 */
export default function StickyMobileCTA() {
	const [visible, setVisible] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const pathname = usePathname();
	const reduceMotion = useReducedMotion();

	useEffect(() => {
		let frame = 0;

		const measure = () => {
			frame = 0;

			const scrollable =
				document.documentElement.scrollHeight - window.innerHeight;

			// A page shorter than ~1.3 viewports has no "halfway" worth speaking of,
			// and its own CTAs are already reachable.
			if (scrollable < window.innerHeight * 0.3) {
				setVisible(false);

				return;
			}

			setVisible(window.scrollY / scrollable >= 0.5);
		};

		const onScroll = () => {
			// Lenis drives native scroll, so this fires on every smooth-scroll frame.
			// Coalescing to one measurement per frame keeps it off the critical path.
			if (frame) return;
			frame = requestAnimationFrame(measure);
		};

		measure();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll, { passive: true });

		return () => {
			if (frame) cancelAnimationFrame(frame);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, []);

	// The navbar's mobile menu is also fixed to the bottom of the viewport, so
	// the two would sit on top of each other. The menu is the thing the visitor
	// just asked for, so this yields to it.
	useEffect(() => {
		const onMenu = (event: Event) => {
			setMenuOpen((event as MobileMenuEvent).detail.open);
		};

		window.addEventListener(MOBILE_MENU_EVENT, onMenu);

		return () => window.removeEventListener(MOBILE_MENU_EVENT, onMenu);
	}, []);

	if (SUPPRESSED_ROUTES.includes(pathname)) return null;

	return (
		<AnimatePresence>
			{visible && !menuOpen && (
				<motion.div
					animate={{ y: 0, opacity: 1 }}
					className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#050211]/95 backdrop-blur-md md:hidden"
					exit={reduceMotion ? { opacity: 0 } : { y: "100%", opacity: 0 }}
					initial={reduceMotion ? { opacity: 0 } : { y: "100%", opacity: 0 }}
					style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
					transition={{
						duration: reduceMotion ? 0.15 : 0.3,
						ease: [0.23, 1, 0.32, 1],
					}}
				>
					<div className="flex items-center gap-3 px-4 py-3">
						<Link
							className="flex flex-1 items-center justify-center rounded-full border border-gray-800/80 bg-gradient-to-t from-[#1a0b2e] to-[#0a0525] px-5 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:border-purple-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030014]"
							href={bookingHref}
							onClick={() =>
								track("cta_click", {
									text: siteConfig.booking.label,
									location: "sticky_mobile",
									href: bookingHref,
								})
							}
						>
							{siteConfig.booking.label}
						</Link>

						<a
							aria-label="Message us on WhatsApp"
							className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gray-800/80 bg-gradient-to-t from-[#1a0b2e] to-[#0a0525] text-purple-300 transition-colors duration-300 hover:border-purple-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030014]"
							href={`https://wa.me/${phone.whatsapp}`}
							onClick={() =>
								track("contact_click", {
									channel: "whatsapp",
									location: "sticky_mobile",
								})
							}
							rel="noopener noreferrer"
							target="_blank"
						>
							<SiWhatsapp size={22} />
						</a>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
