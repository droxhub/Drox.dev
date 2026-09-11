"use client";

import {
	// BarChart3, FileCheck and Receipt belong to the commented-out document
	// types below. Restore them with the entries that use them.
	ArrowDown,
	ArrowRight,
	ArrowUp,
	ArrowUpRight,
	Briefcase,
	Check,
	CheckCircle2,
	ChevronRight,
	ClipboardList,
	Code2,
	Copy,
	Cpu,
	FileCog,
	FileOutput,
	FileSpreadsheet,
	FileText,
	FolderArchive,
	Handshake,
	Info,
	Layers3,
	type LucideIcon,
	Palette,
	Terminal,
	Workflow,
	Zap,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { title } from "@/components/primitives";
import CTAButton from "@/components/ui/cta-button";
import SectionHeader from "@/components/ui/section-header";
import { DURATION, EASE, STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { SKILL_CREATION_PROMPT } from "./prompt";

// ─── Constants ──────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = "919946642643";
const WHATSAPP_ENQUIRY_MSG = encodeURIComponent(
	"Hi Drox.dev, I want your help to create an AI Skill for my business document. I would like to know about your Skill creation service.",
);
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_ENQUIRY_MSG}`;

const SAMPLE_REQUEST = `Generate a new proposal for client "Vertex Cloud Systems".
Project scope: Enterprise multi-tenant SaaS architecture & SOC 2 compliance.
Total investment: $24,500
Timeline: 8 weeks across 3 milestones (30% deposit, 40% beta delivery, 30% sign-off).
Proposal validity: 30 days.`;

/**
 * The two card treatments the rest of the site uses, so this page does not
 * introduce a third. `houseCard` is the dashed card from /pricing and
 * WhyChooseUs; `surfaceCard` is the deep violet gradient surface from
 * HowWeWork and the /about mission cards.
 */
const houseCard =
	"rounded-panel border-2 border-dashed border-default-200 bg-transparent p-6 transition-colors duration-base hover:border-violet-500/50 dark:border-default-100 sm:p-7 md:p-8";

const surfaceCard =
	"relative overflow-hidden rounded-panel bg-gradient-to-b from-card-top via-card-mid to-card-bottom p-6 sm:p-7 md:p-8";

/** Inset well for code, file trees and sample text. */
const well = "rounded-tile border border-hairline bg-surface-inset";

/** Tertiary control: the CTA pill's border language, without the gradient. */
const ghostButton =
	"inline-flex items-center justify-center gap-2 rounded-full border border-hairline-strong px-4 py-2 text-xs font-medium text-gray-300 transition-colors duration-base hover:border-violet-500/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

const iconTile =
	"flex h-11 w-11 shrink-0 items-center justify-center rounded-tile border border-violet-500/30 bg-violet-500/10 text-violet-300";

const eyebrow = "text-xs font-medium uppercase tracking-widest text-violet-400";

// ─── Data ───────────────────────────────────────────────────────────────────

interface DocumentType {
	id: string;
	label: string;
	/** Fits a two-column pill row on a 320px phone; `label` is used everywhere else. */
	short: string;
	icon: LucideIcon;
	badge: string;
	tagline: string;
	extracts: string[];
}

/**
 * Proposal only, deliberately.
 *
 * `prompt.ts` is written for proposals: it opens by telling Claude a proposal
 * PDF was uploaded, names the output a "Proposal Generation Skill", and its
 * Phase 5 intake asks for project cost, payment structure and proposal
 * validity. Offering an Invoice or SOW button beside that text would hand the
 * reader a prompt for the wrong document.
 *
 * The other five types are kept below, commented out, for when there is a
 * prompt per type. Restoring them means uncommenting the entries, the pill row
 * in the Supported documents section, and the `selectedDocId` state — all three
 * are marked. The section heading goes back to the multi-document wording then.
 */
const documentTypes: DocumentType[] = [
	{
		id: "proposal",
		label: "Proposal",
		short: "Proposal",
		icon: Briefcase,
		// Goes back to "Most popular" when the pill row returns — with one type
		// on screen there is nothing for "most" to be measured against.
		badge: "Available now",
		tagline: "Reverse-engineers layout, branding, scope tables and sign-offs.",
		extracts: [
			"Exact cover and interior geometry",
			"Payment milestones and commercial intake",
			"Executive summary and deliverables layout",
			"Terms, conditions and sign-off blocks",
		],
	},
	// Each of these needs its own prompt before it can ship — see the note above.
	// {
	// 	id: "invoice",
	// 	label: "Invoice",
	// 	short: "Invoice",
	// 	icon: Receipt,
	// 	badge: "Finance",
	// 	tagline: "Automates line items, tax rules, currency and bank tables.",
	// 	extracts: [
	// 		"Multi-tier line item grid and calculations",
	// 		"Tax and GST/VAT number placement",
	// 		"Payment terms and bank account styling",
	// 		"Sequential numbering and client metadata",
	// 	],
	// },
	// {
	// 	id: "quotation",
	// 	label: "Quotation",
	// 	short: "Quotation",
	// 	icon: FileText,
	// 	badge: "Sales",
	// 	tagline: "Standardises itemised costs, validity periods and terms.",
	// 	extracts: [
	// 		"Itemised cost tables and discounts",
	// 		"Validity period intake rules",
	// 		"Custom margin and footnote rules",
	// 		"Dynamic scope bullet formatting",
	// 	],
	// },
	// {
	// 	id: "sow",
	// 	label: "Statement of Work",
	// 	short: "SOW",
	// 	icon: FileCheck,
	// 	badge: "Contracts",
	// 	tagline:
	// 		"Locks in phase deliverables, acceptance criteria and legal boundaries.",
	// 	extracts: [
	// 		"Phase milestone breakdown matrices",
	// 		"RACI and responsibility assignment tables",
	// 		"Acceptance testing criteria rules",
	// 		"Scope inclusion vs exclusion clauses",
	// 	],
	// },
	// {
	// 	id: "report",
	// 	label: "Report & Audit",
	// 	short: "Report",
	// 	icon: BarChart3,
	// 	badge: "Analytics",
	// 	tagline: "Standardises KPI cards, chart styling and executive summaries.",
	// 	extracts: [
	// 		"Key metrics and performance card layouts",
	// 		"Callout box and insight styles",
	// 		"Multi-column audit checklists",
	// 		"Structured findings and recommendation rules",
	// 	],
	// },
	// {
	// 	id: "other",
	// 	label: "Custom document",
	// 	short: "Custom",
	// 	icon: ClipboardList,
	// 	badge: "Any format",
	// 	tagline:
	// 		"Works with pitches, employee handbooks, onboarding guides and more.",
	// 	extracts: [
	// 		"Custom page furniture and recurring headers",
	// 		"Embedded brand fonts and vector extraction",
	// 		"Custom tone and voice rule enforcement",
	// 		"Zero guesswork on variable client data",
	// 	],
	// },
];

const whatYouNeed = [
	{
		title: "Your existing template",
		badge: "Single source of truth",
		icon: FileSpreadsheet,
		detail:
			"An existing PDF, DOCX or Keynote proposal, invoice or SOW. Claude analyses its exact geometry, margins, typography and page furniture.",
		tip: "A PDF with real visual styling works best for extraction.",
	},
	{
		title: "Your brand assets",
		badge: "Visual consistency",
		icon: Palette,
		detail:
			"Your logos, colour codes, font families and decorative design motifs. Claude extracts vector artwork directly from the document.",
		tip: "Vector logos inside the PDF are preserved automatically.",
	},
	{
		title: "Your project content",
		badge: "Dynamic variables",
		icon: Layers3,
		detail:
			"The unique client variables: project scope, timeline, commercial pricing and deliverables that change for each new client.",
		tip: "The Skill prompts you for any missing business data.",
	},
];

const promptPhases = [
	{
		phase: "01",
		name: "Forensic geometry",
		description:
			"Measures page points, margins, columns, rules and furniture with exact precision.",
	},
	{
		phase: "02",
		name: "Font identification",
		description:
			"Detects exact font weights, line heights, letter spacing and open-source equivalents.",
	},
	{
		phase: "03",
		name: "Asset extraction",
		description:
			"Isolates vector logos, corner artwork, masks and backgrounds directly from the PDF.",
	},
	{
		phase: "04",
		name: "Content architecture",
		description:
			"Separates reusable boilerplate sections from project-specific sections.",
	},
	{
		phase: "05",
		name: "Writing style rules",
		description:
			"Encodes point of view, bullet structure, commercial boundary voice and tone.",
	},
	{
		phase: "06",
		name: "Skill structure",
		description:
			"Packages SKILL.md, reference specs, generation scripts and validation routines.",
	},
	{
		phase: "07",
		name: "Commercial guardrails",
		description:
			"Enforces missing pricing intake before generation. No invented pricing.",
	},
	{
		phase: "08",
		name: "PDF engine pipeline",
		description:
			"Configures HTML/CSS with headless Chromium, or another high-fidelity pipeline.",
	},
	{
		phase: "09",
		name: "Automated validation",
		description:
			"Scans for overflow, placeholder text, broken tables and missing sign-offs.",
	},
	{
		phase: "10",
		name: "Visual regression test",
		description:
			"Renders side-by-side comparisons against the original PDF before completion.",
	},
];

const pipelineStages = [
	{
		step: "Step 1 · Input",
		name: "Your existing file",
		detail:
			"PDF, DOCX or Figma template with your fonts, layout and furniture.",
		icon: FileSpreadsheet,
		highlighted: false,
	},
	{
		step: "Step 2 · Automation",
		name: "Reusable .skill bundle",
		detail: "Extracts geometry, vector assets, voice rules and a PDF pipeline.",
		icon: Cpu,
		highlighted: true,
	},
	{
		step: "Step 3 · Output",
		name: "Production-ready PDF",
		detail: "Pass new client data and get a brand-aligned document in seconds.",
		icon: FileOutput,
		highlighted: false,
	},
];

const skillFiles = [
	{
		name: "SKILL.md",
		note: "master instructions and commercial guardrails",
		file: true,
	},
	{
		name: "references/",
		note: "geometry.md, typography.md, content-skeleton.md",
		file: false,
	},
	{
		name: "assets/",
		note: "extracted vector logos, backgrounds, corner furniture",
		file: false,
	},
	{
		name: "scripts/",
		note: "generate-pdf.js, validate-geometry.js",
		file: false,
	},
];

const reveal = {
	initial: { opacity: 0, y: 20 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true, margin: "-80px" },
} as const;

// ─── Hooks ──────────────────────────────────────────────────────────────────

/** Copies `text` and reports success for a short while. */
function useCopy(text: string) {
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		if (!copied) return;
		const timer = setTimeout(() => setCopied(false), 2500);
		return () => clearTimeout(timer);
	}, [copied]);

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
		} catch {
			// Clipboard API is unavailable over plain http and in some webviews.
			const textarea = document.createElement("textarea");
			textarea.value = text;
			textarea.setAttribute("readonly", "");
			textarea.style.position = "fixed";
			textarea.style.opacity = "0";
			document.body.appendChild(textarea);
			textarea.select();
			const ok = document.execCommand("copy");
			document.body.removeChild(textarea);
			setCopied(ok);
		}
	};

	return { copied, copy };
}

// ─── Sub-components ─────────────────────────────────────────────────────────

/**
 * The page's primary action, in the site's one button treatment. The label
 * flips to a confirmation for a moment; a status region announces it to
 * screen readers, since the visual change alone is not announced.
 */
function PromptCopyButton({
	label = "Copy the Skill prompt",
	location,
	size = "md",
	className,
}: {
	label?: string;
	location: string;
	size?: "sm" | "md";
	className?: string;
}) {
	const { copied, copy } = useCopy(SKILL_CREATION_PROMPT);

	return (
		<>
			<CTAButton
				className={className}
				icon={copied ? <Check size={18} /> : <Copy size={18} />}
				iconMotion="down"
				location={location}
				onClick={copy}
				size={size}
				text={copied ? "Copied" : label}
			/>
			<span className="sr-only" role="status">
				{copied ? "Skill prompt copied to clipboard" : ""}
			</span>
		</>
	);
}

function Divider() {
	return (
		<hr aria-hidden className="w-full max-w-5xl border-t border-hairline" />
	);
}

/** The hairline of light along the top edge of the surface card. */
function SurfaceGlow() {
	return (
		<>
			<span
				aria-hidden="true"
				className="pointer-events-none absolute -bottom-24 -left-20 hidden h-72 w-72 rounded-full bg-violet-600/40 blur-[70px] md:block"
			/>
			<span
				aria-hidden="true"
				className="pointer-events-none absolute -right-16 -top-20 hidden h-64 w-64 rounded-full bg-fuchsia-500/30 blur-[80px] md:block"
			/>
			<span
				aria-hidden="true"
				className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/60 to-transparent"
			/>
		</>
	);
}

function StepNumber({
	children,
	active = false,
}: {
	children: string;
	active?: boolean;
}) {
	return (
		<span
			className={cn(
				"flex h-11 w-11 shrink-0 items-center justify-center rounded-tile border font-mono text-sm font-medium",
				active
					? "border-violet-400/50 bg-violet-600/30 text-violet-100"
					: "border-hairline-strong bg-surface text-gray-300",
			)}
		>
			{children}
		</span>
	);
}

function StepHeader({
	number,
	heading,
	summary,
	active = false,
	action,
}: {
	number: string;
	heading: string;
	summary: string;
	active?: boolean;
	action?: React.ReactNode;
}) {
	return (
		<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
			<div className="flex items-start gap-4">
				<StepNumber active={active}>{number}</StepNumber>
				<div>
					<h3 className="text-lg font-medium text-white md:text-xl">
						{heading}
					</h3>
					<p className="mt-1 text-sm text-gray-400">{summary}</p>
				</div>
			</div>
			{action && <div className="shrink-0 sm:pl-4">{action}</div>}
		</div>
	);
}

/**
 * Overview of the ten phases, or the prompt itself. The full prompt is ~400
 * lines, so it opens into a read-only textarea: natively focusable and
 * keyboard-scrollable, and the reader can select from it, without the page
 * growing by several screens.
 */
function PromptInspector() {
	const [view, setView] = useState<"overview" | "prompt">("overview");
	const [expanded, setExpanded] = useState(false);

	return (
		<div className={cn(well, "overflow-hidden")}>
			<div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline bg-surface px-4 py-3">
				<div className="flex gap-1" role="group" aria-label="Prompt view">
					{(
						[
							{ id: "overview", label: "Overview", icon: Workflow },
							{ id: "prompt", label: "Full prompt", icon: Terminal },
						] as const
					).map(({ id, label, icon: Icon }) => (
						<button
							key={id}
							aria-pressed={view === id}
							className={cn(
								"inline-flex items-center gap-1.5 rounded-control px-3 py-1.5 text-xs font-medium transition-colors duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400",
								view === id
									? "bg-violet-600/30 text-white"
									: "text-gray-400 hover:bg-white/5 hover:text-white",
							)}
							onClick={() => setView(id)}
							type="button"
						>
							<Icon aria-hidden size={14} />
							{label}
						</button>
					))}
				</div>
				<span className="font-mono text-xs text-gray-400">
					10 phases · {SKILL_CREATION_PROMPT.length.toLocaleString()} characters
				</span>
			</div>

			{view === "overview" ? (
				<ol className="grid grid-cols-1 gap-2.5 p-4 sm:grid-cols-2 sm:p-5">
					{promptPhases.map((phase) => (
						<li
							key={phase.phase}
							className="flex items-start gap-3 rounded-control border border-hairline/60 bg-surface/60 p-3"
						>
							<span className="shrink-0 font-mono text-xs font-medium text-violet-400">
								{phase.phase}
							</span>
							<div>
								<p className="text-sm font-medium text-white">{phase.name}</p>
								<p className="mt-0.5 text-xs leading-relaxed text-gray-400">
									{phase.description}
								</p>
							</div>
						</li>
					))}
				</ol>
			) : (
				<div className="relative">
					{expanded ? (
						<textarea
							aria-label="Skill creation prompt"
							className="block h-[70vh] max-h-[36rem] w-full resize-none bg-transparent p-4 font-mono text-xs leading-relaxed text-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-400 sm:p-5"
							readOnly
							spellCheck={false}
							value={SKILL_CREATION_PROMPT}
						/>
					) : (
						<pre
							aria-hidden
							className="max-h-64 overflow-hidden whitespace-pre-wrap p-4 font-mono text-xs leading-relaxed text-gray-300 sm:p-5"
						>
							{SKILL_CREATION_PROMPT}
						</pre>
					)}
					<div
						className={cn(
							"flex justify-center",
							expanded
								? "border-t border-hairline bg-surface py-3"
								: "absolute inset-x-0 bottom-0 items-end bg-gradient-to-t from-surface-inset via-surface-inset/90 to-transparent pb-4 pt-16",
						)}
					>
						<button
							aria-expanded={expanded}
							className={ghostButton}
							onClick={() => setExpanded((value) => !value)}
							type="button"
						>
							{expanded ? "Collapse prompt" : "Show the full prompt"}
							<ArrowDown
								aria-hidden
								className={cn(
									"transition-transform duration-base",
									expanded && "rotate-180",
								)}
								size={14}
							/>
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

/**
 * Desktop-only. On phones the site already fixes a contact bar to the bottom
 * edge (StickyMobileCTA, from 50% scroll), and two bars in the same place is
 * the one thing worse than none. Mobile readers reach the copy button in the
 * hero, in step 1 and in the closing section.
 */
function FloatingActions() {
	const [visible, setVisible] = useState(false);
	const reduceMotion = useReducedMotion();

	useEffect(() => {
		let frame = 0;

		const measure = () => {
			frame = 0;
			setVisible(window.scrollY > 640);
		};

		const onScroll = () => {
			if (frame) return;
			frame = requestAnimationFrame(measure);
		};

		measure();
		window.addEventListener("scroll", onScroll, { passive: true });

		return () => {
			if (frame) cancelAnimationFrame(frame);
			window.removeEventListener("scroll", onScroll);
		};
	}, []);

	return (
		<AnimatePresence>
			{visible && (
				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="fixed inset-x-0 bottom-6 z-40 mx-auto hidden w-fit items-center gap-2 rounded-full border border-hairline-strong bg-surface-deep/95 p-1.5 shadow-2xl shadow-black/60 backdrop-blur-md md:flex"
					exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
					initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
					transition={{ duration: DURATION.base, ease: EASE.entrance }}
				>
					<PromptCopyButton
						label="Copy the prompt"
						location="ai-skill-guide-floating"
						size="sm"
					/>
					<a
						aria-label="Ask Drox Dev on WhatsApp"
						className="flex h-10 w-10 items-center justify-center rounded-full text-violet-300 transition-colors duration-base hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
						href={WHATSAPP_HREF}
						rel="noopener noreferrer"
						target="_blank"
					>
						<SiWhatsapp aria-hidden="true" size={18} />
					</a>
					<button
						aria-label="Back to top"
						className="flex h-10 w-10 items-center justify-center rounded-full text-gray-400 transition-colors duration-base hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
						onClick={() =>
							window.scrollTo({
								top: 0,
								behavior: reduceMotion ? "auto" : "smooth",
							})
						}
						type="button"
					>
						<ArrowUp aria-hidden size={16} />
					</button>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function AISkillGuidePage() {
	const sample = useCopy(SAMPLE_REQUEST);

	// Restore alongside the pill row when there is more than one document type:
	// const [selectedDocId, setSelectedDocId] = useState(documentTypes[0].id);
	// const activeDoc =
	// 	documentTypes.find((doc) => doc.id === selectedDocId) ?? documentTypes[0];
	const activeDoc = documentTypes[0];

	return (
		<div className="flex w-full flex-col items-center px-4 sm:px-6 xl:px-0">
			{/* ── Hero ─────────────────────────────────────────────────────── */}
			<section className="flex w-full max-w-5xl flex-col items-center py-12 md:py-20">
				<SectionHeader
					as="h1"
					badge="AI document automation guide"
					className="mb-0 md:mb-0"
					icon={FileCog}
					size="xl"
					subtitle="Already have a branded proposal, invoice or SOW template? Reverse-engineer it into a repeatable Claude Skill and generate precise, on-brand documents in seconds."
					title={
						<span className="gradient-line">
							Turn your document template into a reusable{" "}
							<span className={title({ color: "violet", size: "xl" })}>
								AI Skill
							</span>
						</span>
					}
				/>

				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="mt-9 flex w-full max-w-[19rem] flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-4 md:mt-10"
					initial={{ opacity: 0, y: 20 }}
					transition={{ duration: DURATION.slow, delay: 0.3 }}
				>
					<PromptCopyButton location="ai-skill-guide-hero" />
					<CTAButton
						href="#how-it-works"
						icon={<ArrowDown size={18} />}
						iconMotion="down"
						location="ai-skill-guide-hero"
						text="See how it works"
					/>
				</motion.div>

				{/* The transformation, in one picture: file in, Skill, PDF out. */}
				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="relative mt-14 w-full overflow-hidden rounded-panel border border-hairline bg-gradient-to-b from-surface-muted to-surface p-5 sm:p-7 md:mt-16"
					initial={{ opacity: 0, y: 24 }}
					transition={{ duration: DURATION.slow, delay: 0.4 }}
				>
					<div
						aria-hidden
						className="pointer-events-none absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] opacity-[0.035] [background-size:16px_16px]"
					/>

					<ol className="relative grid grid-cols-1 items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:gap-2">
						{pipelineStages.map((stage, index) => {
							const Icon = stage.icon;
							return (
								<li key={stage.name} className="contents">
									<div
										className={cn(
											"relative flex flex-col items-center rounded-tile border p-5 text-center",
											stage.highlighted
												? "border-violet-500/40 bg-gradient-to-b from-violet-600/20 to-violet-950/20"
												: "border-hairline bg-surface/60",
										)}
									>
										{stage.highlighted && (
											<span className="absolute -top-2.5 whitespace-nowrap rounded-full border border-violet-300/60 bg-violet-600 px-2.5 py-0.5 text-xs font-medium text-white">
												Automated by Claude
											</span>
										)}
										<span
											className={cn(
												iconTile,
												"mb-3",
												stage.highlighted && "mt-1",
											)}
										>
											<Icon aria-hidden size={20} />
										</span>
										<span className={eyebrow}>{stage.step}</span>
										<span className="mt-1.5 text-sm font-medium text-white">
											{stage.name}
										</span>
										<span className="mt-1 text-xs leading-relaxed text-gray-400">
											{stage.detail}
										</span>
									</div>
									{index < pipelineStages.length - 1 && (
										<div
											aria-hidden
											className="flex items-center justify-center text-violet-400"
										>
											<ArrowRight className="rotate-90 sm:rotate-0" size={18} />
										</div>
									)}
								</li>
							);
						})}
					</ol>

					<ul className="relative mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-hairline pt-4 text-xs text-gray-300">
						{[
							"No visual approximation",
							"Extracts real vectors and fonts",
							"Built-in commercial guardrails",
						].map((point) => (
							<li key={point} className="inline-flex items-center gap-1.5">
								<CheckCircle2
									aria-hidden
									className="text-violet-400"
									size={14}
								/>
								{point}
							</li>
						))}
					</ul>
				</motion.div>
			</section>

			<Divider />

			{/* ── What you need ────────────────────────────────────────────── */}
			<section className="w-full max-w-5xl py-16 md:py-24">
				<SectionHeader
					badge="Prerequisites"
					icon={ClipboardList}
					size="lg"
					subtitle="Three inputs. Claude handles the forensic disassembly, asset bundling and pipeline construction."
					title="What you need to start"
				/>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
					{whatYouNeed.map((item, index) => {
						const Icon = item.icon;
						return (
							<motion.article
								key={item.title}
								{...reveal}
								className={cn(houseCard, "flex flex-col")}
								transition={{ duration: DURATION.slow, delay: index * STAGGER }}
							>
								<span className={iconTile}>
									<Icon aria-hidden size={20} />
								</span>
								<p className={cn(eyebrow, "mt-5")}>{item.badge}</p>
								<h3 className="mt-2 text-lg font-medium text-white">
									{item.title}
								</h3>
								<p className="mb-5 mt-3 text-sm leading-relaxed text-gray-400 md:text-base">
									{item.detail}
								</p>
								<p className="mt-auto flex items-start gap-2 border-t border-hairline pt-4 text-xs leading-relaxed text-gray-400">
									<Info
										aria-hidden
										className="mt-0.5 shrink-0 text-violet-400"
										size={13}
									/>
									{item.tip}
								</p>
							</motion.article>
						);
					})}
				</div>
			</section>

			<Divider />

			{/* ── Document types ───────────────────────────────────────────── */}
			<section className="w-full max-w-5xl py-16 md:py-24">
				<SectionHeader
					badge="Supported document"
					icon={FileText}
					size="lg"
					subtitle="The prompt is written for proposals. It reads your existing proposal as the source of truth and reproduces its standard exactly."
					title="Built for your proposal template"
				/>

				{/* The document-type pill row. Restore it, and the `selectedDocId`
				    state above, when a second type has a prompt of its own — one pill
				    on its own is a control that controls nothing.

				<div
					aria-label="Document type"
					className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-3"
					role="group"
				>
					{documentTypes.map((doc) => {
						const Icon = doc.icon;
						const selected = doc.id === selectedDocId;
						return (
							<button
								key={doc.id}
								aria-pressed={selected}
								className={cn(
									"inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
									selected
										? "border-violet-400/70 bg-violet-600/25 text-white"
										: "border-hairline-strong text-gray-400 hover:border-violet-500/50 hover:text-white",
								)}
								onClick={() => setSelectedDocId(doc.id)}
								type="button"
							>
								<Icon
									aria-hidden
									className={selected ? "text-violet-300" : "text-gray-500"}
									size={15}
								/>
								<span className="sm:hidden">{doc.short}</span>
								<span className="hidden sm:inline">{doc.label}</span>
							</button>
						);
					})}
				</div>

				*/}

				<motion.div
					key={activeDoc.id}
					animate={{ opacity: 1, y: 0 }}
					className={surfaceCard}
					initial={{ opacity: 0, y: 8 }}
					transition={{ duration: DURATION.fast }}
				>
					<SurfaceGlow />
					<div className="relative flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
						<div className="flex items-start gap-4">
							<span className={iconTile}>
								<activeDoc.icon aria-hidden size={22} />
							</span>
							<div>
								<p className={eyebrow}>{activeDoc.badge}</p>
								<h3 className="mt-1 text-lg font-medium text-white md:text-xl">
									{activeDoc.label} Skill
								</h3>
								<p className="mt-1 text-sm text-gray-400">
									{activeDoc.tagline}
								</p>
							</div>
						</div>
						<div className="shrink-0">
							<PromptCopyButton
								label="Copy the prompt"
								location={`ai-skill-guide-doc-${activeDoc.id}`}
								size="sm"
							/>
						</div>
					</div>

					<div className="relative mt-6">
						<p className={eyebrow}>
							What the Skill reverse-engineers and validates
						</p>
						<ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
							{activeDoc.extracts.map((item) => (
								<li
									key={item}
									className="flex items-start gap-2.5 rounded-tile border border-white/10 bg-black/20 p-3 text-sm text-gray-200"
								>
									<CheckCircle2
										aria-hidden
										className="mt-0.5 shrink-0 text-violet-400"
										size={16}
									/>
									{item}
								</li>
							))}
						</ul>
					</div>
				</motion.div>
			</section>

			<Divider />

			{/* ── How it works ─────────────────────────────────────────────── */}
			<section
				className="w-full max-w-5xl scroll-mt-28 py-16 md:py-24"
				id="how-it-works"
			>
				<SectionHeader
					badge="Step by step"
					icon={Workflow}
					size="lg"
					subtitle="Four steps. Claude reverse-engineers your document in a single run and hands you a production-ready Skill."
					title="How to build your document Skill"
				/>

				<ol className="flex flex-col gap-6 md:gap-8">
					{/* Step 1 */}
					<motion.li
						{...reveal}
						className={cn(houseCard, "border-violet-500/40")}
						transition={{ duration: DURATION.slow }}
					>
						<StepHeader
							action={
								<PromptCopyButton
									label="Copy the prompt"
									location="ai-skill-guide-step-1"
									size="sm"
								/>
							}
							active
							heading="Paste the prompt and attach your template"
							number="01"
							summary="Send the prompt and your template PDF in a single Claude message."
						/>
						<p className="mt-6 text-sm leading-relaxed text-gray-400 md:text-base">
							Open Claude, paste the Skill creation prompt, and attach your
							existing document template in the same message. Claude analyses
							geometry, fonts, branding, section structure and writing
							conventions in forensic detail.
						</p>
						<div className="mt-6">
							<PromptInspector />
						</div>
					</motion.li>

					{/* Step 2 */}
					<motion.li
						{...reveal}
						className={houseCard}
						transition={{ duration: DURATION.slow }}
					>
						<StepHeader
							heading="Download the generated .skill package"
							number="02"
							summary="Claude compiles the forensic rules into an independent, reusable package."
						/>
						<p className="mt-6 text-sm leading-relaxed text-gray-400 md:text-base">
							Once the analysis finishes, Claude provides a downloadable bundle.
							It contains everything required to reproduce your document design
							without the original template.
						</p>
						<div className={cn(well, "mt-6 p-4 font-mono text-xs")}>
							<p className="flex items-center gap-2 border-b border-hairline pb-2.5 font-medium text-violet-300">
								<FolderArchive aria-hidden size={16} />
								proposal-generation.skill
							</p>
							<ul className="mt-2.5 space-y-2">
								{skillFiles.map((entry) => (
									<li
										key={entry.name}
										className="flex flex-wrap items-center gap-x-2 gap-y-0.5"
									>
										{entry.file ? (
											<FileText
												aria-hidden
												className="text-violet-400"
												size={14}
											/>
										) : (
											<ChevronRight
												aria-hidden
												className="text-gray-500"
												size={14}
											/>
										)}
										<span
											className={entry.file ? "text-white" : "text-gray-300"}
										>
											{entry.name}
										</span>
										<span className="text-gray-400">{entry.note}</span>
									</li>
								))}
							</ul>
						</div>
					</motion.li>

					{/* Step 3 */}
					<motion.li
						{...reveal}
						className={houseCard}
						transition={{ duration: DURATION.slow }}
					>
						<StepHeader
							heading="Add the Skill to Claude"
							number="03"
							summary="Store it once in Claude Skills or a Claude Project for permanent access."
						/>
						<p className="mt-6 text-sm leading-relaxed text-gray-400 md:text-base">
							Go to the Skills or Projects section of your Claude workspace and
							upload the bundle. The Skill is now attached and available to you
							and your team on demand.
						</p>
					</motion.li>

					{/* Step 4 */}
					<motion.li
						{...reveal}
						className={houseCard}
						transition={{ duration: DURATION.slow }}
					>
						<StepHeader
							action={
								<>
									<button
										className={ghostButton}
										onClick={sample.copy}
										type="button"
									>
										{sample.copied ? (
											<Check
												aria-hidden
												className="text-violet-300"
												size={14}
											/>
										) : (
											<Copy aria-hidden size={14} />
										)}
										{sample.copied ? "Copied" : "Copy sample request"}
									</button>
									<span className="sr-only" role="status">
										{sample.copied ? "Sample request copied to clipboard" : ""}
									</span>
								</>
							}
							heading="Generate new documents on demand"
							number="04"
							summary="Give it the new client variables and get a finished, validated PDF."
						/>
						<p className="mt-6 text-sm leading-relaxed text-gray-400 md:text-base">
							Whenever you need a new proposal, invoice or SOW, prompt Claude
							with the raw business parameters. The Skill formats the
							typography, calculates totals, applies your branding and validates
							the final PDF.
						</p>
						<div className={cn(well, "mt-6 p-4")}>
							<p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-gray-400">
								<Terminal aria-hidden size={13} />
								Example request to Claude
							</p>
							<pre className="mt-3 whitespace-pre-wrap font-mono text-xs leading-relaxed text-violet-200 sm:text-sm">
								{SAMPLE_REQUEST}
							</pre>
						</div>
					</motion.li>
				</ol>
			</section>

			<Divider />

			{/* ── Plans ────────────────────────────────────────────────────── */}
			<section className="w-full max-w-5xl py-16 md:py-24">
				<SectionHeader
					badge="Usage and plans"
					icon={Zap}
					size="lg"
					subtitle="You can build and test this workflow on Claude Free. Here is what to expect on each plan."
					title="Do I need a Claude subscription?"
				/>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					<motion.article
						{...reveal}
						className={cn(houseCard, "flex flex-col")}
						transition={{ duration: DURATION.slow }}
					>
						<div className="flex items-start justify-between gap-4">
							<div className="flex items-center gap-3">
								<span className={iconTile}>
									<CheckCircle2 aria-hidden size={18} />
								</span>
								<h3 className="text-lg font-medium text-white">Claude Free</h3>
							</div>
							<span className="rounded-full border border-hairline-strong px-3 py-1 text-xs font-medium text-gray-300">
								$0 / month
							</span>
						</div>
						<p className="mt-5 text-sm leading-relaxed text-gray-400 md:text-base">
							Works for testing and small document templates. Because the prompt
							performs a forensic disassembly, it consumes significant usage in
							one go.
						</p>
						<ul className="mb-5 mt-4 space-y-2 text-sm text-gray-300">
							{[
								"Generates the complete .skill bundle without payment",
								"The generated Skill never expires",
							].map((point) => (
								<li key={point} className="flex items-start gap-2">
									<Check
										aria-hidden
										className="mt-0.5 shrink-0 text-violet-400"
										size={14}
									/>
									{point}
								</li>
							))}
						</ul>
						<p className="mt-auto border-t border-hairline pt-4 text-xs leading-relaxed text-gray-400">
							If you hit the hourly limit, wait for the window to reset and send
							the same message again.
						</p>
					</motion.article>

					<motion.article
						{...reveal}
						className={cn(houseCard, "flex flex-col border-violet-500/50")}
						transition={{ duration: DURATION.slow, delay: STAGGER }}
					>
						<div className="flex items-start justify-between gap-4">
							<div className="flex items-center gap-3">
								<span className={iconTile}>
									<Zap aria-hidden size={18} />
								</span>
								<h3 className="text-lg font-medium text-white">
									Claude Pro or Team
								</h3>
							</div>
							<span className="rounded-full border border-violet-500/40 bg-violet-500/15 px-3 py-1 text-xs font-medium text-violet-200">
								Recommended
							</span>
						</div>
						<p className="mt-5 text-sm leading-relaxed text-gray-400 md:text-base">
							Higher usage limits and Claude Projects. The right fit for
							agencies and businesses producing proposals and contracts every
							week.
						</p>
						<ul className="mb-5 mt-4 space-y-2 text-sm text-gray-300">
							{[
								"Handles large, complex templates of 20+ pages",
								"Generates documents without waiting on limits",
							].map((point) => (
								<li key={point} className="flex items-start gap-2">
									<Check
										aria-hidden
										className="mt-0.5 shrink-0 text-violet-400"
										size={14}
									/>
									{point}
								</li>
							))}
						</ul>
						<p className="mt-auto border-t border-hairline pt-4 text-xs leading-relaxed text-gray-400">
							No Claude Pro? Drox Dev can build and test the Skill for you.
						</p>
					</motion.article>
				</div>
			</section>

			<Divider />

			{/* ── Closing: two paths ───────────────────────────────────────── */}
			<section className="w-full max-w-5xl py-16 md:py-24">
				<SectionHeader
					badge="Choose your path"
					icon={Code2}
					size="lg"
					subtitle="Do it yourself with the free guide, or have Drox Dev engineer and validate a Skill for your business."
					title="Ready to automate?"
				/>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					<motion.article
						{...reveal}
						className={cn(houseCard, "flex flex-col")}
						transition={{ duration: DURATION.slow }}
					>
						<div className="flex items-center gap-3">
							<span className={iconTile}>
								<Code2 aria-hidden size={20} />
							</span>
							<div>
								<h3 className="text-lg font-medium text-white">
									Build it yourself
								</h3>
								<p className="text-xs text-gray-400">Free and self-guided</p>
							</div>
						</div>
						<p className="mt-5 text-sm leading-relaxed text-gray-400 md:text-base">
							If you have Claude access and 15 minutes, copy the prompt, attach
							your existing template, and Claude generates your custom Skill.
						</p>
						<ul className="mt-4 space-y-2 text-sm text-gray-300">
							{[
								"The complete 10-phase prompt",
								"Works on Claude Free",
								"Full ownership of the generated Skill",
							].map((point) => (
								<li key={point} className="flex items-start gap-2">
									<Check
										aria-hidden
										className="mt-0.5 shrink-0 text-violet-400"
										size={14}
									/>
									{point}
								</li>
							))}
						</ul>
						<div className="mt-auto flex flex-col items-center gap-3 pt-8">
							<PromptCopyButton
								className="w-full"
								location="ai-skill-guide-closing"
							/>
							<Link
								className="inline-flex items-center gap-1 rounded-inline text-xs text-gray-400 transition-colors duration-base hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
								href="#how-it-works"
							>
								Back to the walkthrough
								<ArrowUp aria-hidden size={12} />
							</Link>
						</div>
					</motion.article>

					<motion.article
						{...reveal}
						className={cn(surfaceCard, "flex flex-col")}
						transition={{ duration: DURATION.slow, delay: STAGGER }}
					>
						<SurfaceGlow />
						<div className="relative flex items-center gap-3">
							<span className={iconTile}>
								<Handshake aria-hidden size={20} />
							</span>
							<div>
								<h3 className="text-lg font-medium text-white">Done for you</h3>
								<p className="text-xs text-violet-300">
									Engineered and tested by Drox Dev
								</p>
							</div>
						</div>
						<p className="relative mt-5 text-sm leading-relaxed text-gray-300 md:text-base">
							No Claude subscription, or you want the geometry checked by hand?
							Send us your document. We extract the vector assets, write the
							validation scripts and deliver a tested Skill.
						</p>
						<ul className="relative mt-4 space-y-2 text-sm text-gray-200">
							{[
								"Pixel-accurate geometry and font matching",
								"Vector logo and graphic asset extraction",
								"Tested across varied client scopes",
								"Delivered in 24 to 48 hours",
							].map((point) => (
								<li key={point} className="flex items-start gap-2">
									<CheckCircle2
										aria-hidden
										className="mt-0.5 shrink-0 text-violet-400"
										size={14}
									/>
									{point}
								</li>
							))}
						</ul>
						<div className="relative mt-auto flex flex-col items-center gap-3 pt-8">
							<CTAButton
								className="w-full"
								external
								href={WHATSAPP_HREF}
								icon={<SiWhatsapp aria-hidden="true" size={18} />}
								id="whatsapp-dual-cta-btn"
								location="ai-skill-guide-closing"
								text="Enquire on WhatsApp"
							/>
							<p className="text-xs text-gray-400">
								Quick response · direct engineer consultation
							</p>
						</div>
					</motion.article>
				</div>

				<p className="mt-12 text-center md:mt-16">
					<Link
						className="group inline-flex items-center gap-1.5 rounded-inline text-sm text-gray-400 transition-colors duration-base hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
						href="/services"
					>
						Explore all Drox Dev services
						<ArrowUpRight
							aria-hidden
							className="text-violet-400 transition-transform duration-base group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
							size={14}
						/>
					</Link>
				</p>
			</section>

			<FloatingActions />
		</div>
	);
}
