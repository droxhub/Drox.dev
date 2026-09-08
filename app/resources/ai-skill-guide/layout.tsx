import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Turn Your Document Template Into an AI Skill",
	description:
		"Learn how to convert your existing proposal, invoice, SOW or other business document templates into a reusable Claude AI Skill. Generate professional documents faster — with your own design, branding and structure.",
	alternates: { canonical: "/resources/ai-skill-guide" },
	openGraph: {
		title: "Turn Your Document Template Into an AI Skill — Drox Dev",
		description:
			"Convert any business document template into a reusable Claude Skill. Proposals, invoices, SOWs and more — generated in seconds, in your brand style.",
		type: "article",
	},
};

export default function AISkillGuideLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
