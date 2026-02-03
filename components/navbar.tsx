"use client";

import { List, X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { contactPage, navigation } from "@/config/content";
import GooeyNav from "./ui/GooeyNav";

const items = navigation.items;

export default function Navigation() {
	const [isOpen, setIsOpen] = useState(false);
	const [scrollDir, setScrollDir] = useState("up");

	// Use usePathname hook normally - component is marked as "use client"
	// If SSR issue persists, we'll handle it with a fallback
	const pathname = usePathname() || "/";

	// Simple active index calculation - only used for initial state
	const activeIndex =
		items.findIndex((item) => {
			if (item.href.startsWith("#")) return pathname === "/";

			return item.href === pathname;
		}) || 0;

	useEffect(() => {
		let lastScrollY = window.scrollY;

		const updateScrollDir = () => {
			const currentScrollY = window.scrollY;

			// Close mobile menu when user starts scrolling
			if (Math.abs(currentScrollY - lastScrollY) > 10) {
				setIsOpen(false);
			}

			if (currentScrollY > lastScrollY && currentScrollY > 100) {
				setScrollDir("down"); // scrolling down
			} else {
				setScrollDir("up"); // scrolling up
			}
			lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
		};

		window.addEventListener("scroll", updateScrollDir);

		return () => window.removeEventListener("scroll", updateScrollDir);
	}, []);

	return (
		<motion.nav
			animate={{ y: scrollDir === "down" ? -100 : 0 }} // move out when scrolling down
			className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 mt-5 px-2 md:px-0"
			initial={{ y: 0 }}
			transition={{ duration: 0.4, ease: "easeInOut" }}
		>
			<div className="max-w-7xl mx-auto px-6 flex items-center justify-between bg-[#000014] border border-white/10 rounded-3xl h-20 overflow-hidden">
				{/* Logo */}
				<div className="flex-1 flex items-center">
					<Link
						className="select-none cursor-pointer hover:opacity-80 transition-opacity"
						href="/"
					>
						<Image
							priority
							alt="DROX Logo"
							height={40}
							src="/logo.png"
							width={130}
						/>
					</Link>
				</div>

				{/* Centered Menu */}
				<div className="flex-1 hidden md:flex justify-center">
					<div className="relative flex items-center justify-center h-12">
						<GooeyNav
							animationTime={600}
							colors={[1, 2, 3, 1, 2, 3, 1, 4]}
							initialActiveIndex={activeIndex >= 0 ? activeIndex : 0}
							items={items}
							particleCount={15}
							particleDistances={[90, 10]}
							particleR={100}
							timeVariance={300}
						/>
					</div>
				</div>

				{/* Contact Now Button */}
				<div className="flex-1 flex justify-end items-center">
					<a
						className="neumorphic-button text-lg font-medium px-8 py-3 ml-2 hidden md:inline-flex"
						href={`https://wa.me/${contactPage.contactInfo.phone.whatsapp}`}
						rel="noopener noreferrer"
						target="_blank"
					>
						Chat Now
					</a>
					{/* Mobile Menu Button */}
					<button
						aria-label="Open menu"
						className="md:hidden text-white  p-2 ml-2"
						onClick={() => setIsOpen(!isOpen)}
					>
						{isOpen ? <X size={24} /> : <List size={24} />}
					</button>
				</div>
			</div>

			{/* Mobile Bottom Navigation Bar */}
			<AnimatePresence>
				{isOpen ? (
					<motion.div
						animate={{ y: 0, opacity: 1 }}
						className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-4 pb-6"
						exit={{ y: 100, opacity: 0 }}
						initial={{ y: 100, opacity: 0 }}
						transition={{ type: "spring", damping: 25, stiffness: 300 }}
					>
						<div className="bg-[#000014] backdrop-blur-xl rounded-3xl p-4 border border-white/10 shadow-2xl overflow-hidden">
							<div className="flex justify-center">
								<GooeyNav
									animationTime={600}
									colors={[1, 2, 3, 1, 2, 3, 1, 4]}
									initialActiveIndex={activeIndex >= 0 ? activeIndex : 0}
									items={items}
									particleCount={15}
									particleDistances={[90, 10]}
									particleR={100}
									timeVariance={300}
								/>
							</div>
						</div>
					</motion.div>
				) : null}
			</AnimatePresence>
		</motion.nav>
	);
}
