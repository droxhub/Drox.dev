export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	/**
	 * `name` is the browser-tab title and the suffix on every page title.
	 * It was "DRO X" — a HeroUI starter leftover, not a company name.
	 */
	name: "Drox Dev",
	/** Wordmark form, for logo alt text and display. */
	wordmark: "DROX",
	url: "https://www.droxdev.com",
	/**
	 * Homepage meta description only. Every other route sets its own — a single
	 * shared description across all pages wastes every SERP snippet.
	 */
	description:
		"Drox Dev builds custom software, AI tools and business automation for growing companies. Based in Kozhikode, Kerala. Book a free 30-minute scoping call.",
	links: {
		github: "https://github.com/droxhub",
		linkedin: "https://www.linkedin.com/company/drox-dev/",
		instagram: "https://www.instagram.com/drox.dev",
	},
	/**
	 * Cal.com booking. `calLink` is everything after `cal.com/`.
	 *
	 * Live since 5 August 2026. This one string drives the embed on /contact,
	 * the reveal in the homepage closing CTA and the sticky mobile bar. Empty it
	 * and all three fall back to /contact rather than showing a calendar that
	 * 404s — which is what they did while it was unset.
	 *
	 * `duration` and `label` below are copy, not configuration: Cal.com does not
	 * read them. They have to be changed by hand if the event type's length ever
	 * changes.
	 */
	booking: {
		calLink: "droxdev/scoping-call",
		/** Must match the duration configured on the Cal.com event type. */
		duration: "30 minutes",
		label: "Book a 30-minute call",
	},
};
