"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import {
	CheckCircle,
	Copy,
	Check,
	FileText,
	Sparkles,
	ArrowRight,
	MessageCircle,
	ChevronRight,
	Briefcase,
	FileCheck,
	Receipt,
	ClipboardList,
	BarChart3,
	AlertCircle,
} from "lucide-react";
import { title } from "@/components/primitives";
import CTAButton from "@/components/ui/cta-button";
import { DURATION } from "@/lib/motion";

// ─── Constants ──────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = "919946642643";
const WHATSAPP_ENQUIRY_MSG = encodeURIComponent(
	"Hi Drox.dev, I want your help to create an AI Skill for my business document. I don't have a Claude subscription and would like to know about your Skill creation service.",
);
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_ENQUIRY_MSG}`;

/**
 * The Skill Creation Prompt that users copy to give Claude.
 * Update this text to reflect the actual prompt you distribute.
 */
const SKILL_CREATION_PROMPT = `You are a document-skill creator. I am going to share my business document template with you.

Please analyse the document carefully, including:
- Page layout and structure
- Fonts, colours and branding
- All sections, headings and sub-headings
- Tables, columns and row patterns
- Content placeholders and variable fields
- Footer, header and page numbering

Once analysed, create a reusable .skill file that captures every design and structural rule. The .skill file should allow me to generate a new document that perfectly matches my template's design simply by providing new content.

Format the .skill file as a structured JSON object with keys for: layout, branding, sections, tables, contentPatterns, and generationInstructions.

Here is my template: [ATTACH YOUR DOCUMENT HERE]`;

// ─── Data ────────────────────────────────────────────────────────────────────

const documentTypes = [
	{ label: "Proposal", icon: Briefcase },
	{ label: "Invoice", icon: Receipt },
	{ label: "Quotation", icon: FileText },
	{ label: "SOW", icon: FileCheck },
	{ label: "Report", icon: BarChart3 },
	{ label: "Other Business Docs", icon: ClipboardList },
];

const steps = [
	{
		number: "01",
		title: "Paste the Prompt + Attach Your Template",
		description:
			"Open Claude. Copy our Skill Creation Prompt below and paste it into Claude — then attach your existing document template in the same message. Claude reads both together, analysing your design, fonts, layout, branding, sections, tables and content patterns.",
		subNote:
			"One message. Prompt + your document attached. That's all Claude needs.",
		showCopyButton: true,
	},
	{
		number: "02",
		title: "Download the Skill File",
		description:
			"Claude generates a reusable .skill file that captures every design and structural rule from your template. Download it and keep it stored safely — this is your document-generation Skill.",
	},
	{
		number: "03",
		title: "Upload the Skill to Claude",
		description:
			"Go to the Skills section in Claude and upload your .skill file. Your document Skill is now ready to use — no setup needed again.",
	},
	{
		number: "04",
		title: "Generate Your New Document",
		description:
			"Give Claude your new document details — client name, project, investment, timeline, payment terms — and ask it to create the document using your Skill. New content in, finished document out.",
	},
];


const whatYouNeed = [
	{
		title: "Your existing template",
		detail:
			"The proposal, invoice, SOW or other document you want to automate.",
	},
	{
		title: "Your brand assets",
		detail: "Logo, fonts, colours and other brand elements used in the document.",
	},
	{
		title: "Your document content",
		detail: "The information that changes from one document to another.",
	},
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionBadge({ children }: { children: React.ReactNode }) {
	return (
		<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-gray-400 text-xs font-medium tracking-wide uppercase">
			{children}
		</span>
	);
}

function PromptCopyButton() {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(SKILL_CREATION_PROMPT);
			setCopied(true);
			setTimeout(() => setCopied(false), 2500);
		} catch {
			// Fallback for browsers without clipboard API
			const textarea = document.createElement("textarea");
			textarea.value = SKILL_CREATION_PROMPT;
			document.body.appendChild(textarea);
			textarea.select();
			document.execCommand("copy");
			document.body.removeChild(textarea);
			setCopied(true);
			setTimeout(() => setCopied(false), 2500);
		}
	};

	return (
		<button
			id="copy-skill-prompt-btn"
			type="button"
			onClick={handleCopy}
			aria-label="Copy Skill Creation Prompt to clipboard"
			className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-semibold text-white text-sm bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 border border-violet-500/50 hover:border-violet-400/70 shadow-lg shadow-violet-900/30 hover:shadow-violet-900/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
		>
			{copied ? (
				<>
					<Check size={16} className="text-green-300" />
					Copied!
				</>
			) : (
				<>
					<Copy size={16} className="group-hover:scale-110 transition-transform" />
					Copy Skill Creation Prompt
				</>
			)}
		</button>
	);
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AISkillGuidePage() {
	return (
		<div className="flex flex-col items-center w-full px-4 sm:px-6 xl:px-0">

			{/* ── 1. HERO ─────────────────────────────────────────────────────── */}
			<section className="relative flex flex-col items-center justify-center gap-5 py-10 md:py-24 w-full max-w-4xl mx-auto text-center">
				{/* Ambient glow */}
				<div
					aria-hidden
					className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] md:w-[600px] h-[200px] md:h-[300px] bg-violet-600/10 blur-[100px] rounded-full pointer-events-none -z-10"
				/>

				<motion.div
					animate={{ opacity: 1, y: 0 }}
					initial={{ opacity: 0, y: 20 }}
					transition={{ duration: DURATION.slow }}
				>
					<SectionBadge>
						<Sparkles size={12} /> AI Document Automation
					</SectionBadge>
				</motion.div>

				<motion.div
					animate={{ opacity: 1, y: 0 }}
					initial={{ opacity: 0, y: 24 }}
					transition={{ duration: DURATION.slow, delay: 0.1 }}
					className="relative z-10 w-full"
				>
					<h1 className="text-[32px] sm:text-[42px] md:text-[56px] font-semibold leading-tight tracking-tight">
						Turn Your{" "}
						<span className={title({ color: "violet", size: "xl" })}>
							Document Template
						</span>{" "}
						Into an AI Skill
					</h1>
				</motion.div>

				<motion.p
					animate={{ opacity: 1 }}
					initial={{ opacity: 0 }}
					transition={{ duration: DURATION.slow, delay: 0.2 }}
					className="text-sm sm:text-base md:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed"
				>
					Already have a professional document template? Turn it into a
					reusable Claude Skill — and generate new documents in seconds,
					every time.
				</motion.p>

				{/* Template → Skill → Document flow — stacks vertically on mobile */}
				<motion.div
					animate={{ opacity: 1, scale: 1 }}
					initial={{ opacity: 0, scale: 0.95 }}
					transition={{ duration: DURATION.slow, delay: 0.3 }}
					className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mt-1 w-full"
				>
					<span className="px-4 py-2 rounded-xl border border-gray-700 text-gray-300 text-sm font-semibold w-full sm:w-auto text-center">
						Your Template
					</span>
					<ArrowRight size={14} className="text-violet-400 rotate-90 sm:rotate-0 shrink-0" />
					<span className="px-4 py-2 rounded-xl border border-violet-500/40 text-violet-200 bg-violet-500/10 text-sm font-semibold w-full sm:w-auto text-center">
						Claude Skill
					</span>
					<ArrowRight size={14} className="text-violet-400 rotate-90 sm:rotate-0 shrink-0" />
					<span className="px-4 py-2 rounded-xl border border-blue-500/40 text-blue-200 bg-blue-500/10 text-sm font-semibold w-full sm:w-auto text-center">
						New Document
					</span>
				</motion.div>
			</section>

			<div className="w-full max-w-7xl border-t border-white/5" />

			{/* ── 2. WHAT YOU NEED (prerequisites — before anything else) ────── */}
			<section className="w-full max-w-5xl mx-auto py-12 md:py-20">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-80px" }}
					transition={{ duration: DURATION.slow }}
					className="flex flex-col items-center text-center mb-8 md:mb-12 gap-4"
				>
					<SectionBadge>Before You Start</SectionBadge>
					<h2 className="text-[28px] sm:text-[36px] md:text-[45px] font-semibold leading-tight tracking-tight">
						What You{" "}
						<span className={title({ color: "violet", size: "lg" })}>Need</span>
					</h2>
					<p className="text-gray-400 text-base md:text-lg max-w-2xl">
						Three things. That&apos;s all it takes to get started.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
					{whatYouNeed.map((item, i) => (
						<motion.div
							key={item.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: DURATION.base, delay: i * 0.1 }}
							className="flex flex-col gap-3 p-5 sm:p-6 rounded-xl border border-white/[0.06]"
						>
							<CheckCircle size={15} className="text-gray-500 shrink-0 mt-0.5" />
							<div>
								<p className="text-white font-semibold mb-1">{item.title}</p>
								<p className="text-gray-400 text-sm leading-relaxed">
									{item.detail}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</section>

			<div className="w-full max-w-7xl border-t border-white/5" />

			{/* ── 3. WHAT CAN YOU AUTOMATE (scope — what documents) ──────────── */}
			<section className="w-full max-w-5xl mx-auto py-12 md:py-20">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-80px" }}
					transition={{ duration: DURATION.slow }}
					className="flex flex-col items-center text-center mb-10 md:mb-12 gap-4"
				>
					<SectionBadge>Document Types</SectionBadge>
					<h2 className="text-[28px] sm:text-[36px] md:text-[45px] font-semibold leading-tight tracking-tight">
						Works With{" "}
						<span className={title({ color: "violet", size: "lg" })}>
							Any Business Document
						</span>
					</h2>
					<p className="text-gray-400 text-base md:text-lg max-w-2xl">
						Create a separate Skill for each document type you want to automate.
					</p>
				</motion.div>

				<div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
					{documentTypes.map((doc, i) => {
						const Icon = doc.icon;
						return (
							<motion.div
								key={doc.label}
								initial={{ opacity: 0, y: 16 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: DURATION.base, delay: i * 0.06 }}
								className="flex items-center gap-2.5 p-3.5 sm:p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]"
							>
								<Icon size={15} className="text-gray-500 shrink-0" />
								<span className="text-gray-300 font-medium text-sm">
									{doc.label}
								</span>
							</motion.div>
						);
					})}
				</div>
			</section>

			<div className="w-full max-w-7xl border-t border-white/5" />

			{/* ── 4. HOW IT WORKS (the step-by-step process) ─────────────────── */}
			<section id="how-it-works" className="w-full max-w-5xl mx-auto py-12 md:py-24">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-80px" }}
					transition={{ duration: DURATION.slow }}
					className="flex flex-col items-center text-center mb-10 md:mb-16 gap-4"
				>
					<SectionBadge>Step by Step</SectionBadge>
					<h2 className="text-[28px] sm:text-[36px] md:text-[45px] font-semibold leading-tight tracking-tight">
						How It{" "}
						<span className={title({ color: "violet", size: "lg" })}>Works</span>
					</h2>
					<p className="text-gray-400 text-base md:text-lg max-w-2xl">
						Four steps from your existing template to a reusable document Skill.
					</p>
				</motion.div>

				<div className="flex flex-col gap-4">
					{steps.map((step, i) => {
						const Icon = step.icon;
						return (
							<motion.div
								key={step.number}
								initial={{ opacity: 0, x: -30 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true, margin: "-60px" }}
								transition={{ duration: DURATION.slow, delay: i * 0.08 }}
								className="group relative flex gap-4 sm:gap-5 p-4 sm:p-6 rounded-xl border border-white/[0.06] transition-colors duration-200 hover:border-white/10"
							>
								{/* Step number circle + connector */}
								<div className="flex flex-col items-center gap-2 shrink-0">
									<div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/10 bg-white/[0.04] shrink-0">
										<span className="text-xs font-mono font-bold text-gray-400">{step.number}</span>
									</div>
									{i < steps.length - 1 && (
										<div className="w-px h-full min-h-[20px] bg-white/[0.06]" />
									)}
								</div>

								<div className="flex-1 min-w-0 pt-1">
									<h3 className="text-white font-semibold text-base sm:text-lg leading-snug mb-2">
										{step.title}
									</h3>
									<p className="text-gray-400 text-sm sm:text-base leading-relaxed">
										{step.description}
									</p>

									{/* Sub-note for combined step */}
									{step.subNote && (
										<p className="mt-3 text-sm text-gray-500 italic">
											{step.subNote}
										</p>
									)}

									{/* Copy prompt button inline in step 01 */}
									{step.showCopyButton && (
										<div className="mt-5">
											<PromptCopyButton />
										</div>
									)}
								</div>
							</motion.div>
						);
					})}
				</div>
			</section>

			{/* ── Divider ──────────────────────────────────────────────────── */}
			<div className="w-full max-w-7xl border-t border-white/5 my-4" />

			{/* ── Claude Subscription Info ─────────────────────────────────── */}
			<section className="w-full max-w-5xl mx-auto py-12 md:py-20">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-80px" }}
					transition={{ duration: DURATION.slow }}
					className="flex flex-col items-center text-center mb-8 md:mb-10 gap-4"
				>
					<SectionBadge>Claude Access</SectionBadge>
					<h2 className="text-[28px] sm:text-[36px] md:text-[45px] font-semibold leading-tight tracking-tight">
						Do I Need a{" "}
						<span className={title({ color: "violet", size: "lg" })}>
							Claude Subscription?
						</span>
					</h2>
					<p className="text-gray-400 text-base md:text-lg max-w-2xl">
						You can try this workflow with Claude&apos;s Free plan. However, Free
						has usage limits.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
					{/* Free plan card */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: DURATION.base }}
						className="p-5 sm:p-6 rounded-xl border border-white/[0.06]"
					>
						<div className="flex items-center gap-2.5 mb-3">
							<CheckCircle size={16} className="text-gray-500 shrink-0" />
							<h3 className="text-white font-medium text-sm">Free Plan</h3>
						</div>
						<p className="text-gray-400 text-sm leading-relaxed">
							You can try this workflow with Claude&apos;s Free plan. Skill
							creation and document generation may consume your available usage,
							especially with large templates or complex documents.
						</p>
					</motion.div>

					{/* If you hit the limit card */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: DURATION.base, delay: 0.1 }}
						className="p-5 sm:p-6 rounded-xl border border-white/[0.06]"
					>
						<div className="flex items-center gap-2.5 mb-3">
							<AlertCircle size={16} className="text-gray-500 shrink-0" />
							<h3 className="text-white font-medium text-sm">If You Hit the Limit</h3>
						</div>
						<ul className="space-y-2.5">
							{[
								"Wait until your usage resets",
								"Switch to another Claude account with available usage",
							].map((item) => (
								<li key={item} className="flex items-start gap-2.5">
									<ChevronRight
										size={15}
										className="text-amber-400 shrink-0 mt-0.5"
									/>
									<span className="text-gray-400 text-sm">{item}</span>
								</li>
							))}
						</ul>
						<p className="mt-4 text-gray-500 text-xs leading-relaxed">
							Your .skill file is reusable — you don&apos;t need to recreate the
							Skill every time.
						</p>
					</motion.div>
				</div>

				{/* Note */}
				<motion.p
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: DURATION.slow, delay: 0.2 }}
					className="mt-6 text-center text-gray-500 text-sm"
				>
					Note: Claude&apos;s available features and usage limits can vary by
					plan and may change over time. Check your Claude account for current
					limits.
				</motion.p>
			</section>

			<div className="w-full max-w-7xl border-t border-white/5" />

			{/* ── 6. FINAL CTA — two paths: self-serve OR get help ───────────── */}
			<section className="w-full max-w-5xl mx-auto py-12 md:py-24">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-80px" }}
					transition={{ duration: DURATION.slow }}
					className="flex flex-col items-center text-center mb-8 md:mb-12 gap-4"
				>
					<h2 className="text-[28px] sm:text-[36px] md:text-[45px] font-semibold leading-tight tracking-tight">
						Ready? Choose{" "}
						<span className={title({ color: "violet", size: "lg" })}>
							How to Start
						</span>
					</h2>
					<p className="text-gray-400 text-base md:text-lg max-w-xl">
						Follow the guide yourself, or let us create the Skill for you.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
					{/* Follow the guide yourself */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: DURATION.base }}
						className="flex flex-col gap-4 p-5 sm:p-6 rounded-xl border border-white/[0.06]"
					>
						<div className="flex items-center gap-2.5">
							<Sparkles size={15} className="text-gray-500 shrink-0" />
							<h3 className="text-white font-semibold text-base">
								I&apos;ll Do It Myself
							</h3>
						</div>
						<p className="text-gray-400 text-sm leading-relaxed flex-1">
							Have Claude access? Start with Step 1 of the guide above — copy
							the prompt, attach your template, and Claude does the rest.
						</p>
						<div className="flex flex-col gap-2">
							{/* Scroll to guide */}
							<button
								type="button"
								onClick={() =>
									document
										.getElementById("how-it-works")
										?.scrollIntoView({ behavior: "smooth", block: "start" })
								}
								className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-white/10 bg-white/[0.04] text-white text-sm font-medium hover:bg-white/[0.07] transition-colors duration-200"
							>
								<ArrowRight size={14} className="rotate-180" />
								Scroll to the Guide
							</button>
							{/* Or copy prompt directly */}
							<PromptCopyButton />
						</div>
					</motion.div>

					{/* Get support */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: DURATION.base, delay: 0.1 }}
						className="flex flex-col gap-4 p-5 sm:p-6 rounded-xl border border-white/[0.06]"
					>
						<div className="flex items-center gap-2.5">
							<MessageCircle size={15} className="text-gray-500 shrink-0" />
							<h3 className="text-white font-semibold text-base">
								Create It for Me
							</h3>
						</div>
						<p className="text-gray-400 text-sm leading-relaxed flex-1">
							No Claude subscription, or prefer to hand it off? Send us your
							template on WhatsApp and we&apos;ll create the Skill for you.
						</p>
						<CTAButton
							id="whatsapp-dual-cta-btn"
							text="Enquire on WhatsApp"
							href={WHATSAPP_HREF}
							external
							location="ai-skill-guide-dual-cta"
							icon={<MessageCircle size={18} />}
						/>
					</motion.div>
				</div>

				{/* Tagline */}
				<motion.p
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: DURATION.slow, delay: 0.3 }}
					className="mt-12 text-center text-gray-600 text-sm italic"
				>
					Your Template. Your Standard. Automated.
				</motion.p>
			</section>

			{/* ── Footer link back to Services ─────────────────────────────── */}
			<section className="pb-16">
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: DURATION.slow }}
					className="flex items-center gap-2 text-gray-500 text-sm hover:text-gray-300 transition-colors"
				>
					<Link href="/services" className="flex items-center gap-1.5 group">
						<ArrowRight
							size={14}
							className="rotate-180 group-hover:-translate-x-1 transition-transform"
						/>
						Explore all Drox Dev services
					</Link>
				</motion.div>
			</section>
		</div>
	);
}
