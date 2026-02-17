"use client";

import { ArrowUpRight, Rocket } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { title } from "@/components/primitives";
import SectionHeader from "@/components/ui/section-header";

const data = [
	{
		src: "/projects/drox1.png",
	},
	{
		src: "/projects/alfa1.png",
	},
];

const Projects = () => {
	return (
		<section className="w-full py-16 md:py-24" id="projects">
			<div className="container mx-auto px-4 md:px-6 lg:px-8">
				{/* Centered Header Section */}
				<SectionHeader
					badge="Our Portfolio"
					icon={Rocket}
					title={
						<>
							<span className="gradient-line">
								Explore the{" "}
								<span className={title({ color: "violet", size: "lg" })}>
									projects
								</span>{" "}
								where
							</span>
							<br className="hidden md:block" />
							<span className="gradient-line">we played, experimented,</span>
							<br className="hidden md:block" />
							<span className="gradient-line">
								and built something amazing.
							</span>
						</>
					}
					size="lg"
				/>

				{/* 2-Column Grid Section */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-20">
					{data.map((project, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 40 }}
							viewport={{ once: true, margin: "-100px" }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: index * 0.1 }}
							className="group relative"
						>
							<div className="relative aspect-[16/11] w-full overflow-hidden rounded-[1rem] bg-[#0f0f1b] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-white/5 transition-all duration-500">
								<Image
									src={project.src}
									alt="Project Preview"
									fill
									className="object-cover transition-transform duration-1000 group-hover:scale-105"
								/>
								{/* Gradient Overlay */}
								<div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

								{/* Floating FAB */}
								<div className="absolute bottom-8 right-8 w-16 h-16 bg-black rounded-full flex items-center justify-center border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.8)] transition-all duration-500 group-hover:bg-white group-hover:text-black z-20 group-hover:scale-110">
									<ArrowUpRight className="w-7 h-7 text-white group-hover:text-black transition-colors" />
								</div>
							</div>
						</motion.div>
					))}
				</div>

				{/* Botton CTA */}
				<motion.div
					className="mt-12 md:mt-16 flex justify-center"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
				>
					<Link
						href="/"
						className="group inline-flex items-center gap-2 px-10 py-4 bg-[#121212] hover:bg-white hover:text-black text-white rounded-full transition-all duration-500 font-medium text-[16px] border border-white/10 shadow-2xl"
					>
						See more projects
						<ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
					</Link>
				</motion.div>
			</div>
		</section>
	);
};

export default Projects;
