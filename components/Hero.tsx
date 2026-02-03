"use client";

import { motion } from "motion/react";
import Badge from "@/components/chip";
import { subtitle, title } from "@/components/primitives";
import PrototypeImg from "@/components/prototype-img";
import ColourfulText from "@/components/ui/colourful-text";

export default function Hero() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			{" "}
			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="relative z-10"
				initial={{ opacity: 0, y: 20 }}
				transition={{ duration: 0.5 }}
			>
				<Badge />
			</motion.div>
			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="inline-block max-w-sm md:max-w-2xl lg:max-w-4xl text-center justify-center text-2xl relative z-10"
				initial={{ opacity: 0, y: 20 }}
				transition={{ duration: 0.5, delay: 0.1 }}
			>
				<h1 className={title({ size: "xl" })}>
					Make <ColourfulText text="Beautiful" />
				</h1>
				<br />
				<h1 className={title({ size: "xl" })}>Digital Experiences</h1>
				<div className="flex justify-center">
					<p className={subtitle({ fullWidth: true })}>
						Beautiful, fast and modern web solutions.
					</p>
				</div>
			</motion.div>
			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="mt-0 sm:mt-[-20px] md:mt-[-30px] lg:mt-[-50px] w-full"
				initial={{ opacity: 0, y: 20 }}
				transition={{ duration: 0.6, delay: 0.5 }}
			>
				<div className="mt-[-80px]">
					<PrototypeImg />
				</div>
			</motion.div>
		</section>
	);
}
