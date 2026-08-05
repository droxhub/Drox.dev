import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { title } from "@/components/primitives";
import CTAButton from "@/components/ui/cta-button";
import { caseStudies } from "@/config/content";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
	title: "Our Work",
	description:
		"Systems Drox Dev has built and what they changed — including the Alfa Event Management System, which coordinates 100+ events and 200+ staff.",
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

			<div className="mx-auto max-w-5xl py-12 md:py-20">
				<h1 className={title({ size: "lg" })}>
					<span className="gradient-line">Systems we&apos;ve built,</span>{" "}
					<span className="gradient-line">and what they changed.</span>
				</h1>
				<p className="mt-6 max-w-2xl text-lg leading-relaxed text-default-500">
					Every engagement starts with an operational problem, not a
					specification. Here is what that has produced so far.
				</p>

				<div className="mt-14 flex flex-col gap-14 md:gap-20">
					{caseStudies.map((study) => (
						<Link
							key={study.slug}
							className="group block rounded-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
							href={`/work/${study.slug}`}
						>
							<div className="relative aspect-[16/10] w-full overflow-hidden rounded-card border border-white/5 bg-surface-inset shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
								<Image
									alt={study.imageAlt}
									className="object-cover transition-transform duration-slow group-hover:scale-105"
									fill
									sizes="(max-width: 768px) 100vw, 900px"
									src={study.image}
								/>
							</div>

							<div className="mt-6">
								<p className="text-xs uppercase tracking-widest text-purple-400">
									{study.category}
								</p>
								<h2 className="mt-2 text-2xl md:text-3xl font-medium text-white">
									{study.name}
								</h2>
								<p className="mt-3 max-w-2xl leading-relaxed text-default-500">
									{study.summary}
								</p>

								<ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
									{study.outcomes.map((outcome) => (
										<li key={outcome.label}>
											<span className="block text-2xl font-semibold text-white">
												{outcome.value}
											</span>
											<span className="text-sm text-default-500">
												{outcome.label}
											</span>
										</li>
									))}
								</ul>

								<span className="mt-6 inline-block text-sm text-violet-400 transition-transform group-hover:translate-x-1">
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
