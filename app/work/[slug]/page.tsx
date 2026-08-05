import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { title } from "@/components/primitives";
import CTAButton from "@/components/ui/cta-button";
import { caseStudies } from "@/config/content";
import { siteConfig } from "@/config/site";

export function generateStaticParams() {
	return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const study = caseStudies.find((s) => s.slug === slug);

	if (!study) return {};

	return {
		title: `${study.name} — Case Study`,
		description: `${study.summary} ${study.outcomes.map((o) => `${o.value} ${o.label.toLowerCase()}`).join(", ")}.`,
		alternates: { canonical: `/work/${study.slug}` },
	};
}

export default async function CaseStudyPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const study = caseStudies.find((s) => s.slug === slug);

	if (!study) notFound();

	// Breadcrumbs render in Google's results in place of a bare URL, and give
	// nested pages a visible path back to the section.
	const breadcrumbSchema = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{ "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
			{
				"@type": "ListItem",
				position: 2,
				name: "Our Work",
				item: `${siteConfig.url}/work`,
			},
			{
				"@type": "ListItem",
				position: 3,
				name: study.name,
				item: `${siteConfig.url}/work/${study.slug}`,
			},
		],
	};

	return (
		<div className="w-full px-4 sm:px-6 xl:px-0">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
			/>
			<article className="mx-auto max-w-4xl py-12 md:py-20">
				<Link
					className="text-sm text-default-500 transition-colors hover:text-white rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
					href="/work"
				>
					← All work
				</Link>

				<p className="mt-8 text-xs uppercase tracking-widest text-purple-400">
					{study.category}
				</p>
				<h1 className={title({ size: "lg", class: "mt-3" })}>
					<span className="gradient-line">{study.name}</span>
				</h1>
				<p className="mt-5 text-lg leading-relaxed text-default-500">
					{study.summary}
				</p>

				<div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-default-500">
					<span>{study.client}</span>
					<a
						className="text-violet-400 underline underline-offset-4 hover:text-violet-300 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
						href={study.liveUrl}
						rel="noopener noreferrer"
						target="_blank"
					>
						View the live system ↗
					</a>
				</div>

				<div className="relative mt-12 aspect-[16/11] w-full overflow-hidden rounded-[1.25rem] border border-white/5 bg-surface-inset shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
					<Image
						alt={study.imageAlt}
						className="object-cover"
						fill
						priority
						sizes="(max-width: 896px) 100vw, 896px"
						src={study.image}
					/>
				</div>

				{/* Outcomes first — it's what a buyer scrolls for. */}
				<div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
					{study.outcomes.map((outcome) => (
						<div
							key={outcome.label}
							className="rounded-[1.5rem] border-2 border-dashed border-default-100 p-7 text-center"
						>
							<p className="text-4xl font-bold tabular-nums tracking-tighter text-white md:text-5xl">
								{outcome.value}
							</p>
							<p className="mt-2 text-sm text-default-500">{outcome.label}</p>
						</div>
					))}
				</div>

				<section className="mt-16">
					<h2 className="text-2xl font-medium text-white md:text-3xl">
						The challenge
					</h2>
					<p className="mt-4 text-base leading-relaxed text-default-500 md:text-lg">
						{study.challenge}
					</p>
				</section>

				<section className="mt-16">
					<h2 className="text-2xl font-medium text-white md:text-3xl">
						What we built
					</h2>
					<p className="mt-4 text-base leading-relaxed text-default-500 md:text-lg">
						{study.solution}
					</p>

					<div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
						<div>
							<h3 className="mb-4 text-xs uppercase tracking-widest text-purple-400">
								Core modules
							</h3>
							<ul className="space-y-2">
								{study.modules.map((module) => (
									<li key={module} className="flex gap-3 text-sm text-gray-400">
										<span
											aria-hidden="true"
											className="mt-2 h-1 w-1 shrink-0 rounded-full bg-purple-500/60"
										/>
										{module}
									</li>
								))}
							</ul>
						</div>
						<div>
							<h3 className="mb-4 text-xs uppercase tracking-widest text-purple-400">
								Built with
							</h3>
							<div className="flex flex-wrap gap-2">
								{study.stack.map((tech) => (
									<span
										key={tech}
										className="rounded-full border border-hairline bg-surface-muted px-3 py-1.5 text-xs text-gray-400"
									>
										{tech}
									</span>
								))}
							</div>
						</div>
					</div>
				</section>

				<section className="mt-16 space-y-6">
					<h2 className="text-2xl font-medium text-white md:text-3xl">
						In their words
					</h2>
					{study.testimonials.map((testimonial) => (
						<figure
							key={testimonial.name}
							className="rounded-[1.5rem] border border-hairline/80 bg-gradient-to-b from-surface-muted to-surface p-7 md:p-8"
						>
							<blockquote className="text-base leading-relaxed text-gray-300 md:text-lg">
								“{testimonial.quote}”
							</blockquote>
							<figcaption className="mt-6 flex items-center gap-3">
								<Image
									alt=""
									className="h-11 w-11 rounded-full object-cover ring-2 ring-purple-500/20"
									height={44}
									src={testimonial.avatar}
									width={44}
								/>
								<div>
									<p className="text-sm font-semibold text-white">
										{testimonial.name}
									</p>
									<p className="text-xs text-default-500">{testimonial.role}</p>
								</div>
							</figcaption>
						</figure>
					))}
				</section>

				<div className="mt-16 flex justify-center">
					<CTAButton
						href="/contact"
						location={`case_study_${study.slug}`}
						text="Talk to us about a similar build"
					/>
				</div>
			</article>
		</div>
	);
}
