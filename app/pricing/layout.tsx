import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Pricing & Engagement Models",
	description:
		"What it costs to work with Drox Dev: a written proposal before any work starts, no surprise invoices, and 30 days' notice either way. Five engagement models, from fixed-price projects to long-term partnership.",
	alternates: { canonical: "/pricing" },
};

export default function PricingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
