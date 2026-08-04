import type { Metadata } from "next";

// The page itself is a client component, so metadata lives in the layout.
export const metadata: Metadata = {
	title: "Custom Software, AI & Business Automation",
	description:
		"Custom software, AI solutions, business automation, web and mobile applications, and UI/UX design — built around how your business actually operates. Kozhikode, Kerala.",
	alternates: { canonical: "/services" },
};

export default function ServicesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
