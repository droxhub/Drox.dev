import type { Metadata } from "next";

// The page itself is a client component, so metadata lives in the layout.
export const metadata: Metadata = {
	title: "Four Founders, One Accountable Team",
	description:
		"Drox Dev is a software engineering company in Kozhikode, Kerala, led by four equal founders who stay on every engagement. Direction, delivery, architecture and engineering each have a named owner.",
	alternates: { canonical: "/about" },
};

export default function AboutLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
