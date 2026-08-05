"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";

const EMBED_JS = "https://app.cal.com/embed/embed.js";

/**
 * True once a Cal.com event type has been configured in `config/site.ts`.
 * Every booking surface checks this and falls back to /contact when it's false,
 * so a missing link degrades to the form instead of to a dead calendar.
 */
export const isBookingEnabled = siteConfig.booking.calLink !== "";

/** Where a "book a call" control should point. */
export const bookingHref = isBookingEnabled ? "/contact#book" : "/contact";

type CalApi = ((...args: unknown[]) => void) & {
	loaded?: boolean;
	ns?: Record<string, CalApi>;
	q?: unknown[][];
};

/**
 * A typed port of the loader snippet Cal.com documents for the inline embed.
 * Its job is to create a queue so calls made before embed.js finishes loading
 * are replayed once it does — which is why we can't simply await an onload and
 * call `window.Cal` directly.
 *
 * The script is only requested on the first call, so nothing is fetched until
 * a booking surface actually mounts.
 */
function getCal(): CalApi {
	const w = window as typeof window & { Cal?: CalApi };

	if (w.Cal) return w.Cal;

	const push = (target: { q?: unknown[][] }, args: unknown[]) => {
		target.q = target.q ?? [];
		target.q.push(args);
	};

	const cal = ((...args: unknown[]) => {
		const self = w.Cal as CalApi;

		if (!self.loaded) {
			self.ns = {};
			self.q = self.q ?? [];
			const script = document.createElement("script");

			script.src = EMBED_JS;
			script.async = true;
			document.head.appendChild(script);
			self.loaded = true;
		}

		if (args[0] === "init") {
			const api = ((...inner: unknown[]) => {
				push(api, inner);
			}) as CalApi;

			api.q = [];

			const namespace = args[1];

			if (typeof namespace === "string") {
				self.ns![namespace] = self.ns![namespace] ?? api;
				push(self.ns![namespace], args);
				push(self, ["initNamespace", namespace]);
			} else {
				push(self, args);
			}

			return;
		}

		push(self, args);
	}) as CalApi;

	w.Cal = cal;

	return cal;
}

/**
 * The Cal.com calendar, rendered inline. Renders nothing at all when no event
 * type is configured — callers don't have to guard.
 */
export function CalInline({ className = "" }: { className?: string }) {
	const container = useRef<HTMLDivElement>(null);
	const initialised = useRef(false);
	const { calLink } = siteConfig.booking;

	useEffect(() => {
		// React 18 StrictMode runs effects twice in development; without this the
		// calendar mounts into the same element twice.
		if (!calLink || !container.current || initialised.current) return;
		initialised.current = true;

		const Cal = getCal();

		Cal("init", { origin: "https://cal.com" });
		Cal("inline", {
			elementOrSelector: container.current,
			calLink,
			config: { layout: "month_view" },
		});
		Cal("ui", {
			theme: "dark",
			hideEventTypeDetails: false,
			layout: "month_view",
			// A literal, deliberately. This is handed to Cal.com's embed and ends up
			// inside a cross-origin iframe, where a CSS custom property from this
			// document does not resolve. Keep it in sync with violet-500 by hand.
			styles: { branding: { brandColor: "#8b5cf6" } },
		});
	}, [calLink]);

	if (!calLink) return null;

	return (
		<div
			ref={container}
			className={`w-full overflow-hidden rounded-[1.75rem] border border-violet-500/20 bg-[#0a0817] ${className}`}
			style={{ minHeight: "620px" }}
		/>
	);
}
