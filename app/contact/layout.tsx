import type { Metadata } from "next";

// The page itself is a client component, so metadata lives in the layout.
export const metadata: Metadata = {
	title: "Book a Scoping Call",
	description:
		"Tell us what you're trying to build and we'll assess it properly before anything is committed. Email, phone or WhatsApp. We reply within one business day.",
	alternates: { canonical: "/contact" },
};

export default function ContactLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
