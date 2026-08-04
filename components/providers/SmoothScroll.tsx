"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { MOBILE_MENU_EVENT, type MobileMenuEvent } from "@/lib/utils";

export default function SmoothScroll({
	children,
}: {
	children: React.ReactNode;
}) {
	const lenisRef = useRef<Lenis | null>(null);
	const pathname = usePathname();

	/**
	 * Smooth scroll is the single worst thing on this site for anyone with a
	 * vestibular disorder: it takes the one interaction a reader cannot avoid and
	 * makes the page keep gliding after they have stopped. WCAG 2.2 SC 2.3.3.
	 *
	 * So Lenis is not started at all under `prefers-reduced-motion: reduce` —
	 * `stop()` would still leave it intercepting the wheel. Without it the browser
	 * scrolls natively, which is exactly what was asked for.
	 *
	 * The listener matters as much as the initial check: the setting can be
	 * changed while the page is open, and on macOS it commonly is.
	 */
	useEffect(() => {
		const query = window.matchMedia("(prefers-reduced-motion: reduce)");
		let rafId = 0;

		const start = () => {
			if (lenisRef.current) return;

			const lenis = new Lenis({
				duration: 1.2,
				easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
				orientation: "vertical",
				gestureOrientation: "vertical",
				smoothWheel: true,
				wheelMultiplier: 1,
				touchMultiplier: 2,
				infinite: false,
				autoResize: true, // Auto resize on window resize
			});

			lenisRef.current = lenis;

			const raf = (time: number) => {
				lenis.raf(time);
				rafId = requestAnimationFrame(raf);
			};

			rafId = requestAnimationFrame(raf);
		};

		const stop = () => {
			if (rafId) cancelAnimationFrame(rafId);
			rafId = 0;
			lenisRef.current?.destroy();
			lenisRef.current = null;
		};

		const sync = () => {
			if (query.matches) stop();
			else start();
		};

		sync();
		query.addEventListener("change", sync);

		return () => {
			query.removeEventListener("change", sync);
			stop();
		};
	}, []);

	// Freeze the page while the mobile menu overlay is open. Both halves are
	// needed: Lenis intercepts the wheel, so `stop()` is what holds a desktop
	// scroll, but this instance runs without `syncTouch`, which means touch
	// scrolling stays native and only `overflow: hidden` stops it — i.e. the
	// overflow lock is the half that matters on a phone. Measured at no cost to
	// the open animation. Mobile-only, so there is no scrollbar-width shift.
	useEffect(() => {
		const onMenu = (event: Event) => {
			const { open } = (event as MobileMenuEvent).detail;

			if (open) {
				lenisRef.current?.stop();
				document.body.style.overflow = "hidden";
			} else {
				lenisRef.current?.start();
				document.body.style.overflow = "";
			}
		};

		window.addEventListener(MOBILE_MENU_EVENT, onMenu);

		return () => {
			window.removeEventListener(MOBILE_MENU_EVENT, onMenu);
			document.body.style.overflow = "";
		};
	}, []);

	// Reset scroll position on route change. The native fallback is not optional:
	// under reduced motion there is no Lenis instance, and without this the reader
	// would land halfway down every page they navigate to.
	useEffect(() => {
		if (lenisRef.current) {
			lenisRef.current.scrollTo(0, { immediate: true });
		} else {
			window.scrollTo(0, 0);
		}
	}, [pathname]);

	return <>{children}</>;
}
