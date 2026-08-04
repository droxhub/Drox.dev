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

	useEffect(() => {
		// Initialize Lenis
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

		// Request animation frame loop
		let rafId: number;
		function raf(time: number) {
			lenis.raf(time);
			rafId = requestAnimationFrame(raf);
		}

		rafId = requestAnimationFrame(raf);

		// Cleanup on unmount
		return () => {
			cancelAnimationFrame(rafId);
			lenis.destroy();
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

	// Reset scroll position on route change
	useEffect(() => {
		if (lenisRef.current) {
			lenisRef.current.scrollTo(0, { immediate: true });
		}
	}, [pathname]);

	return <>{children}</>;
}
