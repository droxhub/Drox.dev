"use client";

import { useEffect, useRef, useState } from "react";

interface AmbientVideoProps {
	src: string;
	className?: string;
}

/**
 * A decorative background video that only loads when it is actually going to be
 * seen.
 *
 * The two videos on /about were `autoPlay` on a 22 MB source file, so every
 * visitor — including on mobile data — downloaded it before the page settled,
 * for an effect sitting behind `opacity-60` and a `backdrop-blur-md`.
 *
 * This component:
 *   - ships nothing until the element scrolls near the viewport
 *   - skips loading entirely below `md`, where the cost is highest and the
 *     effect is least visible
 *   - honours `prefers-reduced-motion`
 *
 * The source has since been re-encoded to 407 KB (VP9, 1280x720, 30fps). It
 * was 1920x1080 at 60fps and 18.5 Mbps — and, despite the `.webm` extension,
 * H.264, which is not a valid WebM codec, so Firefox refused to play it at all.
 */
export default function AmbientVideo({ src, className }: AmbientVideoProps) {
	const ref = useRef<HTMLVideoElement>(null);
	const [shouldLoad, setShouldLoad] = useState(false);

	useEffect(() => {
		const el = ref.current;

		if (!el) return;

		const reducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		const isSmallScreen = window.matchMedia("(max-width: 767px)").matches;

		if (reducedMotion || isSmallScreen) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setShouldLoad(true);
						observer.disconnect();
					}
				}
			},
			{ rootMargin: "200px" },
		);

		observer.observe(el);

		return () => observer.disconnect();
	}, []);

	// Play only once the source has actually been attached.
	useEffect(() => {
		if (!shouldLoad) return;

		ref.current?.play().catch(() => {
			// Autoplay refused. It's decorative — the gradient behind it is enough.
		});
	}, [shouldLoad]);

	return (
		<video
			ref={ref}
			/* Silent, uncontrolled, purely atmospheric — it carries no information
			   a caption could convey. Marking it decorative is the honest answer to
			   axe's video-caption check; adding an empty <track> would only be
			   dressing it up. It has no controls, so nothing focusable is being
			   hidden. */
			aria-hidden="true"
			className={className}
			loop
			muted
			playsInline
			preload="none"
			// Falls back to the section's gradient background when not loaded.
			src={shouldLoad ? src : undefined}
		/>
	);
}
