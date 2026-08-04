import type { ReactNode } from "react";
import { title } from "@/components/primitives";

interface LegalPageProps {
	heading: string;
	updated: string;
	intro: string;
	children: ReactNode;
}

/**
 * Shared shell for /privacy, /terms and /accessibility. Deliberately plain —
 * these pages are read by procurement and by people looking for a specific
 * clause, not browsed.
 */
export default function LegalPage({
	heading,
	updated,
	intro,
	children,
}: LegalPageProps) {
	return (
		<div className="w-full px-4 sm:px-6 xl:px-0">
			<article className="mx-auto max-w-3xl py-12 md:py-20">
				<h1 className={title({ size: "lg" })}>
					<span className="gradient-line">{heading}</span>
				</h1>

				<p className="mt-6 text-sm text-default-400">Last updated: {updated}</p>

				<p className="mt-6 text-base md:text-lg text-default-500 leading-relaxed">
					{intro}
				</p>

				<div className="legal-body mt-12 space-y-10">{children}</div>

				<hr className="my-14 border-white/10" />

				<p className="text-sm text-default-400 leading-relaxed">
					Questions about this page? Email{" "}
					<a
						className="text-violet-400 hover:text-violet-300 underline underline-offset-4 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
						href="mailto:hello@droxdev.com"
					>
						hello@droxdev.com
					</a>
					. We reply within one business day.
				</p>
			</article>
		</div>
	);
}

/** A numbered section within a legal page. */
export function LegalSection({
	title: sectionTitle,
	children,
}: {
	title: string;
	children: ReactNode;
}) {
	return (
		<section>
			<h2 className="text-xl md:text-2xl font-medium text-white mb-4">
				{sectionTitle}
			</h2>
			<div className="space-y-4 text-default-500 leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_a]:text-violet-400 [&_a]:underline [&_a]:underline-offset-4">
				{children}
			</div>
		</section>
	);
}
