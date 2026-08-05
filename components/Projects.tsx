"use client";

import { track } from "@vercel/analytics";
import { ArrowUpRight, Rocket } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { title } from "@/components/primitives";
import CTAButton from "@/components/ui/cta-button";
import SectionHeader from "@/components/ui/section-header";
import { caseStudies } from "@/config/content";
import { DURATION, STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Driven by the case studies in config/content.ts (Company Profile pp.19-20),
 * so the card and its case-study page can never disagree.
 *
 * Droxlink belongs here too — it's live at grb-soft-web.vercel.app — but the
 * only image in `public/projects/` was a mockup of droxdev.com itself, not of
 * Droxlink. Add a real Droxlink screenshot and a `caseStudies` entry rather
 * than shipping a card that shows the wrong product.
 */
const data = caseStudies.map((study) => ({
	src: study.image,
	alt: study.imageAlt,
	name: study.name,
	category: study.category,
	summary: `${study.summary} ${study.outcomes
		.map((o) => `${o.value} ${o.label.toLowerCase()}`)
		.join(", ")}.`,
	href: `/work/${study.slug}`,
}));

const Projects = () => {
	return (
		<section className="w-full py-16 md:py-24" id="projects">
			<div className="container mx-auto">
				{/* Centered Header Section */}
				<SectionHeader
					badge="Our Portfolio"
					icon={Rocket}
					title={
						<>
							<span className="gradient-line">
								Systems we&apos;ve{" "}
								<span className={title({ color: "violet", size: "lg" })}>
									built
								</span>
								,
							</span>
							<br className="hidden md:block" />
							<span className="gradient-line"> and what they changed.</span>
						</>
					}
					size="lg"
				/>

				{/* Two-up when there's more than one project; a single project stays
				    centred and readable instead of stranded in half a grid. */}
				<div
					className={cn(
						"grid grid-cols-1 gap-10 md:gap-16 lg:gap-20",
						data.length > 1
							? "md:grid-cols-2"
							: "max-w-2xl mx-auto justify-items-center text-center",
					)}
				>
					{data.map((project, index) => (
						<motion.div
							key={project.name}
							initial={{ opacity: 0, y: 40 }}
							viewport={{ once: true, margin: "-100px" }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: DURATION.slow, delay: index * STAGGER }}
							className="group relative"
						>
							{/* The hover arrow used to imply a link on a plain div. The whole
							    card is now genuinely clickable and keyboard-focusable. */}
							<Link
								className="block rounded-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
								href={project.href}
								onClick={() =>
									track("project_click", {
										project: project.name,
										location: "homepage_projects",
									})
								}
							>
								<div className="relative aspect-[16/11] w-full overflow-hidden rounded-card bg-surface-inset shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-white/5 transition-all duration-slow">
									<Image
										src={project.src}
										alt={project.alt}
										fill
										sizes="(max-width: 768px) 100vw, 50vw"
										className="object-cover transition-transform duration-slow group-hover:scale-105"
									/>
									{/* Gradient Overlay */}
									<div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-slow" />

									{/* Floating FAB */}
									<div className="absolute bottom-8 right-8 w-16 h-16 bg-black rounded-full flex items-center justify-center border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.8)] transition-all duration-slow group-hover:bg-white group-hover:text-black z-20 group-hover:scale-110">
										<ArrowUpRight className="w-7 h-7 text-white group-hover:text-black transition-colors" />
									</div>
								</div>

								{/* A screenshot with no label is not a portfolio. */}
								<div className="mt-6">
									<p className="text-xs uppercase tracking-widest text-purple-400 mb-2">
										{project.category}
									</p>
									<h3 className="text-xl md:text-2xl font-medium text-white mb-3">
										{project.name}
									</h3>
									<p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-xl">
										{project.summary}
									</p>
								</div>
							</Link>
						</motion.div>
					))}
				</div>

				{/* Was `href="/"` — it reloaded the page the visitor was already on. */}
				<motion.div
					className="mt-12 md:mt-16 flex justify-center"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
				>
					<CTAButton
						href="/contact"
						location="projects"
						text="Talk to us about a similar build"
					/>
				</motion.div>
			</div>
		</section>
	);
};

export default Projects;
