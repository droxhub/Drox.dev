import { Figtree, Fira_Code as FontMono, Inter } from "next/font/google";

export const fontSans = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
	weight: ["400", "500", "600", "700"],
	display: "swap",
});

export const fontHeading = Figtree({
	subsets: ["latin"],
	variable: "--font-heading",
	weight: ["600"],
	display: "swap",
});

export const fontMono = FontMono({
	subsets: ["latin"],
	variable: "--font-mono",
	display: "swap",
});
