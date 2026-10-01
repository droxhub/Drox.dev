"use client";

import { track } from "@vercel/analytics";
import { ArrowRight, ArrowUpRight, Rocket } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { title } from "@/components/primitives";
import CTAButton from "@/components/ui/cta-button";
import RotatingImage from "@/components/ui/rotating-image";
import SectionHeader from "@/components/ui/section-header";
import { caseStudies, caseStudyDescription } from "@/config/content";
import { DURATION, STAGGER } from "@/lib/motion";

/** The homepage shows two rows at most; the full list lives on /work. */
const HOME_LIMIT = 6;

/**
 * Driven by the case studies in config/content.ts (Company Profile pp.19-20),
 * so the card and its case-study page can never disagree.
 */
const data = caseStudies.slice(0, HOME_LIMIT).map((study) => ({
	srcs: [study.image, ...(study.gallery ?? [])],
	alt: study.imageAlt,
	name: study.name,
	category: study.category,
	summary: caseStudyDescription(study),
	href: `/work/${study.slug}`,
}));

const hasMore = caseStudies.length > HOME_LIMIT;

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

				{/* Same width and grid as /work, so the two pages read as one set. */}
				<div className="mx-auto max-w-6xl px-4 sm:px-6 xl:px-0">
					<div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
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
									<div className="relative aspect-16/10 w-full overflow-hidden rounded-card bg-surface-inset shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] border border-white/5 transition-all duration-slow">
										<RotatingImage
											srcs={project.srcs}
											alt={project.alt}
											sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
											className="object-cover group-hover:scale-105"
											reverse={index % 2 === 1}
											zoom
										/>
										{/* Gradient Overlay */}
										<div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-slow" />

										{/* Floating FAB */}
										<div className="absolute bottom-4 right-4 w-11 h-11 bg-black rounded-full flex items-center justify-center border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.8)] transition-all duration-slow group-hover:bg-white group-hover:text-black z-20 group-hover:scale-110">
											<ArrowUpRight className="w-5 h-5 text-white group-hover:text-black transition-colors" />
										</div>
									</div>

									{/* A screenshot with no label is not a portfolio. */}
									<div className="mt-5">
										<p className="text-xs uppercase tracking-widest text-purple-400 mb-2">
											{project.category}
										</p>
										<h3 className="text-lg md:text-xl font-medium text-white mb-2">
											{project.name}
										</h3>
										<p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
											{project.summary}
										</p>
									</div>
								</Link>
							</motion.div>
						))}
					</div>

					{/* Only once the homepage is holding work back. */}
					{hasMore && (
						<div className="mt-10 flex justify-end">
							<Link
								className="group/all inline-flex items-center gap-2 rounded-full text-sm font-medium text-violet-400 transition-colors hover:text-violet-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
								href="/work"
								onClick={() =>
									track("view_all_work", { location: "homepage_projects" })
								}
							>
								View all {caseStudies.length} projects
								<ArrowRight className="h-4 w-4 transition-transform group-hover/all:translate-x-1" />
							</Link>
						</div>
					)}
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
