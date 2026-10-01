import type { Metadata } from "next";
import Link from "next/link";
import { title } from "@/components/primitives";
import CTAButton from "@/components/ui/cta-button";
import RotatingImage from "@/components/ui/rotating-image";
import { caseStudies } from "@/config/content";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
	title: "Our Work",
	description:
		"Systems Drox Dev has built and what they changed — client platforms like the Alfa Event Management System and Haiwa Snacks, and our own products, Droxlink and DroxMenu.",
	alternates: { canonical: "/work" },
};

/**
 * Case-study pages existed at /work/[slug] but /work itself returned 404, so
 * the section had no landing page for nav, search or a shared link to point at.
 */
const breadcrumbSchema = {
	"@context": "https://schema.org",
	"@type": "BreadcrumbList",
	itemListElement: [
		{
			"@type": "ListItem",
			position: 1,
			name: "Home",
			item: siteConfig.url,
		},
		{
			"@type": "ListItem",
			position: 2,
			name: "Our Work",
			item: `${siteConfig.url}/work`,
		},
	],
};

export default function WorkIndexPage() {
	return (
		<div className="w-full px-4 sm:px-6 xl:px-0">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
			/>

			<div className="mx-auto max-w-6xl py-12 md:py-20">
				<h1 className={title({ size: "lg" })}>
					<span className="gradient-line">Systems we&apos;ve built,</span>{" "}
					<span className="gradient-line">and what they changed.</span>
				</h1>
				<p className="mt-6 max-w-2xl text-lg leading-relaxed text-default-500">
					Every engagement starts with an operational problem, not a
					specification. Here is what that has produced so far.
				</p>

				{/* Compact cards, three to a row on desktop — the full-size image
				    lives on each case-study page. */}
				<div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
					{caseStudies.map((study, index) => (
						<Link
							key={study.slug}
							className="group flex flex-col rounded-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
							href={`/work/${study.slug}`}
						>
							<div className="relative aspect-16/10 w-full overflow-hidden rounded-card border border-white/5 bg-surface-inset shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
								<RotatingImage
									alt={study.imageAlt}
									className="object-cover group-hover:scale-105"
									reverse={index % 2 === 1}
									sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
									srcs={[study.image, ...(study.gallery ?? [])]}
									zoom
								/>
							</div>

							<div className="mt-5 flex flex-1 flex-col">
								<p className="text-xs uppercase tracking-widest text-purple-400">
									{study.category}
								</p>
								<h2 className="mt-2 text-lg md:text-xl font-medium text-white">
									{study.name}
								</h2>
								<p className="mt-2 text-sm leading-relaxed text-default-500">
									{study.summary}
								</p>

								{study.outcomes.length > 0 && (
									<ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
										{study.outcomes.map((outcome) => (
											<li key={outcome.label}>
												<span className="block text-lg font-semibold text-white">
													{outcome.value}
												</span>
												<span className="text-xs text-default-500">
													{outcome.label}
												</span>
											</li>
										))}
									</ul>
								)}

								<span className="mt-auto pt-4 inline-block text-sm text-violet-400 transition-transform group-hover:translate-x-1">
									Read the case study →
								</span>
							</div>
						</Link>
					))}
				</div>

				<div className="mt-20 flex justify-center">
					<CTAButton
						href="/contact"
						location="work_index"
						text="Talk to us about a similar build"
					/>
				</div>
			</div>
		</div>
	);
}
