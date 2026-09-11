import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Turn Your Document Template Into an AI Skill",
	description:
		"Learn how to convert your existing proposal template into a reusable Claude AI Skill. Generate professional proposals faster — with your own design, branding and structure.",
	alternates: { canonical: "/resources/ai-skill-guide" },
	openGraph: {
		title: "Turn Your Document Template Into an AI Skill — Drox Dev",
		description:
			"Convert your proposal template into a reusable Claude Skill — generated in seconds, in your own brand style.",
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
