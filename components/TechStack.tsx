"use client";

import { Wrench } from "lucide-react";
import { motion } from "motion/react";
import React from "react";
import {
	SiFigma,
	SiMongodb,
	SiNextdotjs,
	SiNodedotjs,
	SiPython,
	SiReact,
	SiTailwindcss,
	SiTypescript,
} from "react-icons/si";
import { title } from "@/components/primitives";
import LogoLoop from "@/components/ui/LogoLoop";
import SectionHeader from "@/components/ui/section-header";

// Define responsive icon sizes
const iconSize = { mobile: 32, desktop: 48 };

const TechLogo = ({
	Icon,
}: {
	Icon: React.ComponentType<{ size: number; className?: string }>;
}) => <Icon className="w-8 h-8 md:w-12 md:h-12" size={iconSize.desktop} />;

const techLogos = [
	{
		node: <TechLogo Icon={SiReact} />,
		title: "React",
		href: "https://react.dev",
	},
	{
		node: <TechLogo Icon={SiNextdotjs} />,
		title: "Next.js",
		href: "https://nextjs.org",
	},
	{
		node: <TechLogo Icon={SiTypescript} />,
		title: "TypeScript",
		href: "https://www.typescriptlang.org",
	},
	{
		node: <TechLogo Icon={SiTailwindcss} />,
		title: "Tailwind CSS",
		href: "https://tailwindcss.com",
	},
	{
		node: <TechLogo Icon={SiNodedotjs} />,
		title: "Node.js",
		href: "https://nodejs.org",
	},
	{
		node: <TechLogo Icon={SiMongodb} />,
		title: "MongoDB",
		href: "https://www.mongodb.com",
	},
	{
		node: <TechLogo Icon={SiPython} />,
		title: "Python",
		href: "https://www.python.org",
	},
	{
		node: <TechLogo Icon={SiFigma} />,
		title: "Figma",
		href: "https://www.figma.com",
	},
];

const TechStack = () => {
	return (
		<section className="flex flex-col items-center w-full my-16 md:my-[100px]">
			<SectionHeader
				badge="Arms"
				icon={Wrench}
				title={
					<>
						<span className="gradient-line">
							<span className={title({ color: "violet", size: "lg" })}>
								Technologies
							</span>{" "}
							We Use
						</span>
					</>
				}
				subtitle="Building with cutting-edge tools and frameworks"
				size="lg"
			/>

			<motion.div
				className="w-full max-w-7xl h-[80px] md:h-[120px]"
				initial={{ opacity: 0, y: 20 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				viewport={{ once: true, margin: "-100px" }}
				whileInView={{ opacity: 1, y: 0 }}
			>
				<LogoLoop
					fadeOut
					scaleOnHover
					ariaLabel="Technology stack"
					direction="left"
					fadeOutColor="#030014"
					gap={60}
					hoverSpeed={20}
					logoHeight={32}
					logos={techLogos}
					speed={60}
				/>
			</motion.div>
		</section>
	);
};

export default TechStack;
