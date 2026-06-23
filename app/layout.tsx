import "@/styles/globals.css";
import clsx from "clsx";
import { Metadata, Viewport } from "next";
import Footer from "@/components/Footer";

import Navbar from "@/components/navbar";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { fontHeading, fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import { Providers } from "./providers";

export const metadata: Metadata = {
	metadataBase: new URL("https://www.droxdev.com"),
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	openGraph: {
		title: siteConfig.name,
		description: siteConfig.description,
		url: "https://www.droxdev.com",
		siteName: siteConfig.name,
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "Droxdev.com – Building exceptional digital experiences",
			},
		],
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: siteConfig.name,
		description: siteConfig.description,
		images: ["/og-image.png"],
	},
	icons: {
		icon: "/icon.png",
	},
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
				<SmoothScroll>
					<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
						<div className="relative flex flex-col min-h-screen">
							<Navbar />
							<main className="w-full mx-auto pt-16 flex-grow mt-14 md:mt-20">
								{children}
							</main>
							<footer className="mt-[100px]">
								<Footer />
							</footer>
						</div>
					</Providers>
				</SmoothScroll>
			</body>
		</html>
	);
}
