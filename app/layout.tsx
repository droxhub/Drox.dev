import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import clsx from "clsx";
import { Metadata, Viewport } from "next";
import Footer from "@/components/Footer";

import Navbar from "@/components/navbar";
import SmoothScroll from "@/components/providers/SmoothScroll";
import StickyMobileCTA from "@/components/ui/sticky-mobile-cta";
import { fontHeading, fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import { Providers } from "./providers";

export const metadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	title: {
		default: "Drox Dev — Custom Software, AI & Business Automation",
		template: `%s — ${siteConfig.name}`,
	},
	description: siteConfig.description,
	alternates: { canonical: "/" },
	openGraph: {
		title: "Drox Dev — Custom Software, AI & Business Automation",
		description: siteConfig.description,
		url: siteConfig.url,
		siteName: siteConfig.name,
		images: [
			{
				url: "/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "Drox Dev — custom software, AI and business automation",
			},
		],
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Drox Dev — Custom Software, AI & Business Automation",
		description: siteConfig.description,
		images: ["/og-image.jpg"],
	},
	icons: {
		icon: "/icon.png",
	},
};

/**
 * Organization schema. This is what feeds Google's knowledge panel, and the
 * site previously shipped no structured data at all.
 */
const organizationSchema = {
	"@context": "https://schema.org",
	"@type": "Organization",
	name: "Drox Dev",
	url: siteConfig.url,
	logo: `${siteConfig.url}/logo.png`,
	description: siteConfig.description,
	foundingDate: "2026", // TODO: replace with the exact incorporation date
	address: {
		"@type": "PostalAddress",
		streetAddress: "Hilite Business Park",
		addressLocality: "Kozhikode",
		addressRegion: "Kerala",
		addressCountry: "IN",
		// TODO: add postalCode — procurement checks look for a complete address
	},
	contactPoint: {
		"@type": "ContactPoint",
		telephone: "+91-9946-642-643",
		email: "hello@droxdev.com",
		contactType: "sales",
		areaServed: "IN",
		availableLanguage: ["en", "ml"],
	},
	sameAs: [
		siteConfig.links.linkedin,
		siteConfig.links.github,
		siteConfig.links.instagram,
	],
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html suppressHydrationWarning lang="en">
			<head />
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable,
					fontHeading.variable,
				)}
				style={{ overflow: "auto" }}
			>
				{/* JSON-LD is the documented way to emit structured data; the content
				    is a static literal, never user input. */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(organizationSchema),
					}}
				/>
				<SmoothScroll>
					<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
						{/* The bottom padding reserves room for the sticky mobile CTA bar
						    so it can never cover the last row of the footer. */}
						<div className="relative flex flex-col min-h-screen pb-20 md:pb-0">
							{/* Lets keyboard and screen-reader users bypass the nav. */}
							<a
								className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-violet-600 focus:px-4 focus:py-2 focus:text-white"
								href="#main"
							>
								Skip to content
							</a>
							<Navbar />
							<main
								className="w-full mx-auto pt-16 flex-grow mt-14 md:mt-20"
								id="main"
							>
								{children}
							</main>
							<Footer />
						</div>
						<StickyMobileCTA />
					</Providers>
				</SmoothScroll>
				<Analytics />
			</body>
		</html>
	);
}
