"use client";

import { Menu, X } from "lucide-react";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/config/content";
import { DURATION, EASE } from "@/lib/motion";
import { MOBILE_MENU_EVENT } from "@/lib/utils";
import CTAButton from "./ui/cta-button";
import GooeyNav from "./ui/GooeyNav";

const items = navigation.items;

/**
 * Hoisted so their identity is stable across renders — as inline literals they
 * were new arrays on every render, which defeats the memo on GooeyNav.
 */
const GOOEY_COLORS = [1, 2, 3, 1, 2, 3, 1, 4];
const GOOEY_PARTICLE_DISTANCES: [number, number] = [90, 10];

export default function Navigation() {
	const [isOpen, setIsOpen] = useState(false);
	const [scrollDir, setScrollDir] = useState("up");
	const panelRef = useRef<HTMLDivElement>(null);
	const toggleRef = useRef<HTMLButtonElement>(null);
	const reduceMotion = useReducedMotion();

	// Use usePathname hook normally - component is marked as "use client"
	// If SSR issue persists, we'll handle it with a fallback
	const pathname = usePathname() || "/";

	// findIndex returns -1 when nothing matches — clamp it, don't `|| 0` it
	// (index 0 is falsy, and -1 is truthy, so `||` gets this exactly backwards).
	const matchedIndex = items.findIndex((item) => {
		if (item.href.startsWith("#")) return pathname === "/";

		return item.href === pathname;
	});
	const activeIndex = matchedIndex < 0 ? 0 : matchedIndex;

	useEffect(() => {
		let lastScrollY = window.scrollY;

		const updateScrollDir = () => {
			const currentScrollY = window.scrollY;

			// The menu used to close on any 10px of scroll, so a slight thumb drag
			// while reading dismissed it. It now closes on navigation or the X only.
			if (currentScrollY > lastScrollY && currentScrollY > 100) {
				setScrollDir("down"); // scrolling down
			} else {
				setScrollDir("up"); // scrolling up
			}
			lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
		};

		window.addEventListener("scroll", updateScrollDir, { passive: true });

		return () => window.removeEventListener("scroll", updateScrollDir);
	}, []);

	// Announced so the sticky mobile CTA can hide itself and SmoothScroll can
	// freeze the page behind the overlay. Those two live elsewhere in the tree,
	// and an event keeps each of them owning its own behaviour.
	useEffect(() => {
		window.dispatchEvent(
			new CustomEvent(MOBILE_MENU_EVENT, { detail: { open: isOpen } }),
		);
	}, [isOpen]);

	// A tapped link navigates without unmounting the navbar, so the overlay
	// would otherwise still be covering the page on arrival. Every link in the
	// panel also closes it on click; this is what catches browser back/forward.
	// Adjusted during render rather than in an effect — same pattern as
	// GooeyNav's active-index sync. https://react.dev/reference/react/useState
	const [syncedPath, setSyncedPath] = useState(pathname);

	if (syncedPath !== pathname) {
		setSyncedPath(pathname);
		if (isOpen) setIsOpen(false);
	}

	// The overlay covers the page, so focus has to be kept inside it — without
	// this, tabbing walks into links that are no longer visible. The close
	// button sits in the navbar rather than the panel, so it is spliced onto the
	// front of the loop.
	useEffect(() => {
		if (!isOpen) return;

		const focusables = () => {
			const nodes: HTMLElement[] = [];

			if (toggleRef.current) nodes.push(toggleRef.current);
			if (panelRef.current) {
				nodes.push(
					...Array.from(
						panelRef.current.querySelectorAll<HTMLElement>(
							"a[href], button:not([disabled])",
						),
					),
				);
			}

			return nodes;
		};

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsOpen(false);
				toggleRef.current?.focus();

				return;
			}

			if (event.key !== "Tab") return;

			const nodes = focusables();
			if (nodes.length === 0) return;

			const first = nodes[0];
			const last = nodes[nodes.length - 1];
			const active = document.activeElement as HTMLElement | null;

			if (event.shiftKey && (active === first || !active)) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && active === last) {
				event.preventDefault();
				first.focus();
			}
		};

		document.addEventListener("keydown", onKeyDown);

		// Deferred a frame to keep a forced synchronous layout out of the frame
		// the user tapped. This measured flat rather than faster — the cost here
		// was GooeyNav re-rendering, see its memo — but focusing after the paint
		// is the right shape regardless.
		const focusFrame = requestAnimationFrame(() => {
			panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
		});

		return () => {
			cancelAnimationFrame(focusFrame);
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [isOpen]);

	return (
		<>
			<motion.nav
				animate={{ y: scrollDir === "down" ? -100 : 0 }} // move out when scrolling down
				className="fixed top-0 left-0 right-0 z-40 transition-all duration-base mt-5 px-2 md:px-0"
				initial={{ y: 0 }}
				transition={{ duration: DURATION.base, ease: EASE.standard }}
			>
				{/* While the menu is open the bar empties out to just the close
				    button, as on apple.com — the logo and the CTA would otherwise sit
				    in a bordered pill floating on an otherwise plain overlay. `border`
				    stays applied and only its colour changes, so nothing shifts. */}
				<div
					className={`max-w-7xl mx-auto px-6 flex items-center justify-between border rounded-card h-20 overflow-hidden transition-colors duration-fast md:bg-surface-nav md:border-white/10 ${
						isOpen
							? "bg-transparent border-transparent"
							: "bg-surface-nav border-white/10"
					}`}
				>
					{/* Logo */}
					<div
						className={`flex-1 flex items-center transition-opacity duration-fast md:opacity-100 md:pointer-events-auto ${
							isOpen ? "opacity-0 pointer-events-none" : ""
						}`}
					>
						<Link
							className="select-none cursor-pointer hover:opacity-80 transition-opacity"
							href="/"
						>
							{/* "Drox Dev", not "DROX Logo". Alt text describes what the
							    image *is to the reader* — this one is the company name, and
							    it is the only content of a link to the homepage, so it is
							    also that link's accessible name. Google was rendering the
							    search result headline as "DROX Logo", which is exactly this
							    string; the old alt named the file's job rather than the
							    brand. */}
							<Image
								priority
								alt="Drox Dev"
								className="h-auto"
								height={37}
								src="/logo.png"
								width={130}
							/>
						</Link>
					</div>

					{/* Centered Menu */}
					<div className="flex-1 hidden md:flex justify-center">
						<div className="relative flex items-center justify-center h-12">
							<GooeyNav
								animationTime={600}
								colors={GOOEY_COLORS}
								initialActiveIndex={activeIndex >= 0 ? activeIndex : 0}
								items={items}
								particleCount={15}
								particleDistances={GOOEY_PARTICLE_DISTANCES}
								particleR={100}
								timeVariance={300}
							/>
						</div>
					</div>

					{/* Primary CTA — visible at every breakpoint. It was previously
					    `hidden md:inline-flex`, which left mobile visitors with no way to
					    contact the company from the first screen. */}
					<div className="flex-1 flex justify-end items-center gap-1">
						{/* Was styled by `neumorphic-button`, a class defined nowhere in the
						    repo — so this rendered as unstyled text. Same component as every
						    other button on the site now, at the compact size. */}
						<CTAButton
							className={`whitespace-nowrap transition-opacity duration-fast md:ml-2 md:opacity-100 md:pointer-events-auto ${
								isOpen ? "opacity-0 pointer-events-none" : ""
							}`}
							href={navigation.contactButton.href}
							location="navbar"
							showIcon={false}
							size="sm"
							text={navigation.contactButton.text}
						/>
						{/* Mobile Menu Button */}
						<button
							aria-controls="mobile-nav"
							aria-expanded={isOpen}
							aria-label={isOpen ? "Close menu" : "Open menu"}
							className="md:hidden text-white p-2 rounded-control focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
							onClick={() => setIsOpen(!isOpen)}
							ref={toggleRef}
							type="button"
						>
							{isOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>
			</motion.nav>

			{/* Mobile menu — full-screen overlay, in the style of apple.com.

			    Always mounted, shown by animating opacity, rather than mounted on
			    open inside <AnimatePresence>. Mounting a full-screen element, laying
			    it out and painting it all happened in the frame the user tapped, and
			    that frame was the stutter — it measured 67ms under a 4x CPU throttle
			    however the contents were animated. Kept mounted, opening is a
			    compositor-only opacity change. It is inert when closed: no pointer
			    events, out of the tab order, hidden from assistive tech. */}
			<div
				aria-hidden={!isOpen}
				/* Below the nav's own z-40, so the close button stays above the
				   overlay rather than being covered by it.

				   Opaque, with no `backdrop-blur`: blurring a full-screen layer cost
				   an extra 16ms on the worst frame, and the reference is flat colour
				   anyway. */
				className={`fixed inset-0 z-30 bg-surface-deep md:hidden ${
					reduceMotion ? "" : "transition-opacity duration-fast"
				} ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
				id="mobile-nav"
				ref={panelRef}
			>
				{/* pt clears the nav pill: 1.25rem top margin + 5rem height. */}
				<div className="flex h-full flex-col overflow-y-auto px-7 pb-10 pt-28">
					<ul className="flex list-none flex-col gap-1 p-0">
						{items.map((item, index) => {
							const isActive = index === activeIndex;

							return (
								<li
									/* Applied only while open, so re-adding the class on each
									   open replays the stagger on an element that never
									   unmounts. */
									className={isOpen ? "menu-item-in" : undefined}
									key={item.href}
									style={{ animationDelay: `${40 + index * 30}ms` }}
								>
									{/* py-2.5 rather than the reference's tighter rhythm: it
									    keeps the row at 52px, over the 44px WCAG 2.2 target-size
									    minimum, while still reading as a tight list rather than a
									    stack of buttons. */}
									<Link
										aria-current={isActive ? "page" : undefined}
										className={`block py-2.5 text-[1.6rem] font-semibold leading-tight tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-4 focus-visible:ring-offset-surface-deep ${
											isActive ? "text-violet-300" : "text-white"
										}`}
										href={item.href}
										onClick={() => {
											// Tapping the page you are already on produces no
											// pathname change, so nothing would close the overlay.
											if (item.href === pathname) setIsOpen(false);
										}}
										tabIndex={isOpen ? undefined : -1}
									>
										{item.label}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</>
	);
}
