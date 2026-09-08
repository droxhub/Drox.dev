import type { MetadataRoute } from "next";
import { caseStudies } from "@/config/content";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
	const routes = [
		{ path: "", priority: 1, changeFrequency: "weekly" as const },
		{ path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
		{ path: "/work", priority: 0.9, changeFrequency: "monthly" as const },
		...caseStudies.map((study) => ({
			path: `/work/${study.slug}`,
			priority: 0.9,
			changeFrequency: "monthly" as const,
		})),
		{ path: "/pricing", priority: 0.8, changeFrequency: "monthly" as const },
		{ path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
		{ path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
		{
			path: "/resources/ai-skill-guide",
			priority: 0.7,
			changeFrequency: "monthly" as const,
		},
		{ path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
		{ path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
		{
			path: "/accessibility",
			priority: 0.3,
			changeFrequency: "yearly" as const,
		},
	];

	// Static build timestamp — fine for a marketing site that redeploys on change.
	const lastModified = new Date();

	return routes.map(({ path, priority, changeFrequency }) => ({
		url: `${siteConfig.url}${path}`,
		lastModified,
		changeFrequency,
		priority,
	}));
}
