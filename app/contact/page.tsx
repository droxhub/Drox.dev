"use client";

import { Card, CardBody, Divider } from "@heroui/react";
import { track } from "@vercel/analytics";
import {
	Github,
	Instagram,
	Linkedin,
	Mail,
	MapPin,
	MessageCircle,
	Phone,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import React, { useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import Badge from "@/components/chip";

import { subtitle, title } from "@/components/primitives";
import { CalInline, isBookingEnabled } from "@/components/ui/cal-booking";
import { contactPage } from "@/config/content";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

// Fields previously had no <label> at all (placeholder-only), `outline-none`
// with no focus replacement, and a hardcoded dark-purple background forced on
// in both themes.
const labelClass =
	"block mb-2 text-sm font-medium text-default-700 dark:text-default-200";
const fieldClass =
	"w-full px-4 py-3 rounded-2xl border-2 border-default-200 bg-default-50 text-default-900 placeholder-default-400 transition-colors duration-200 dark:border-white/10 dark:bg-[#200045] dark:text-white dark:placeholder-default-400 hover:border-default-300 dark:hover:bg-[#2a0055] focus-visible:outline-none focus-visible:border-violet-500 focus-visible:ring-2 focus-visible:ring-violet-400/40";

/**
 * Both icon sets are represented here: lucide carries the general UI set and the
 * social marks it still ships, and react-icons/si covers the ones it doesn't —
 * WhatsApp has no lucide equivalent. They are different component types, so the
 * map is typed by the props actually used at the call site rather than by either
 * library's own type.
 */
type SocialIcon = React.ComponentType<{
	className?: string;
	size?: number;
	"aria-hidden"?: boolean | "true" | "false";
}>;

const socialIconMap: Record<string, SocialIcon> = {
	GitHub: Github,
	Whatsapp: SiWhatsapp,
	LinkedIn: Linkedin,
	Instagram: Instagram,
};

const contactInfo = [
	{
		icon: Mail,
		title: "Email",
		content: contactPage.contactInfo.email.address,
		link: contactPage.contactInfo.email.link,
		gradient: "from-violet-400 to-purple-600",
	},
	{
		icon: Phone,
		title: "Phone",
		content: contactPage.contactInfo.phone.display,
		link: contactPage.contactInfo.phone.link,
		gradient: "from-blue-400 to-cyan-600",
	},
	{
		icon: MessageCircle,
		title: "WhatsApp",
		content: contactPage.contactInfo.phone.display,
		link: `https://wa.me/${contactPage.contactInfo.phone.whatsapp}`,
		gradient: "from-green-400 to-emerald-600",
	},
	{
		icon: MapPin,
		title: "Location",
		content: contactPage.contactInfo.location.address,
		link: contactPage.contactInfo.location.link,
		gradient: "from-pink-400 to-rose-600",
	},
];

const socialLinks = contactPage.social.links.map((link) => ({
	icon: socialIconMap[link.name] || Github,
	name: link.name,
	link: link.url,
	gradient: link.gradient,
}));

export default function ContactPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		// "Subject" replaced with two qualifiers — they cost less completion than a
		// free-text line and tell us far more about whether we can help.
		budget: "",
		timeline: "",
		message: "",
		// Honeypot. Hidden from people, filled by bots.
		company: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [status, setStatus] = useState<"idle" | "sent" | "blocked">("idle");

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value } = e.target;

		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const whatsappNumber = contactPage.contactInfo.phone.whatsapp;

	const buildWhatsappUrl = () => {
		const lines = [
			`Hello! I'm ${formData.name}.`,
			"",
			`Email: ${formData.email}`,
			formData.budget ? `Budget: ${formData.budget}` : null,
			formData.timeline ? `Timeline: ${formData.timeline}` : null,
			"",
			formData.message,
		].filter((line) => line !== null);

		return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Honeypot: bots fill hidden fields, people don't.
		if (formData.company) return;

		setIsSubmitting(true);
		track("contact_form_submit", { channel: "whatsapp" });

		const opened = window.open(buildWhatsappUrl(), "_blank");

		// window.open returns null when a popup blocker intervenes, or when the
		// browser has no WhatsApp handler. Previously this failed silently and the
		// enquiry was lost with no feedback; now we show the user a fallback.
		if (opened) {
			setStatus("sent");
			setFormData({
				name: "",
				email: "",
				budget: "",
				timeline: "",
				message: "",
				company: "",
			});
		} else {
			setStatus("blocked");
			track("contact_form_blocked", { channel: "whatsapp" });
		}

		setIsSubmitting(false);
	};

	return (
		<div className="flex flex-col items-center w-full px-4 sm:px-6 xl:px-0">
			{/* Hero Section */}
			<section className="flex flex-col items-center justify-center gap-4 py-12 md:py-20">
				<motion.div
					animate={{ opacity: 1, y: 0 }}
					initial={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.5 }}
				>
					<Badge />
				</motion.div>

				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="inline-block max-w-sm lg:max-w-4xl text-center justify-center"
					initial={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.5, delay: 0.1 }}
				>
					<h1 className={title({ size: "lg" })}>
						<span className="gradient-line">
							{contactPage.hero.title.part1}&nbsp;
							<span className={title({ color: "violet", size: "lg" })}>
								{contactPage.hero.title.part2}
							</span>
						</span>
					</h1>
				</motion.div>

				<motion.p
					animate={{ opacity: 1 }}
					className={subtitle({
						class: "max-w-3xl text-center text-gray-400 py-2",
					})}
					initial={{ opacity: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					{contactPage.hero.subtitle}
				</motion.p>
			</section>

			{/* Booking. First thing on the page when it's configured: picking a slot
			    removes the email round-trip entirely, which is the largest structural
			    conversion gain available to a services site. Renders nothing until a
			    Cal.com event type is set in config/site.ts. */}
			{isBookingEnabled && (
				<section
					className="flex w-full max-w-4xl scroll-mt-28 flex-col items-center my-12 md:my-16"
					id="book"
				>
					<motion.div
						className="w-full text-center"
						initial={{ opacity: 0, y: 20 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true, margin: "-100px" }}
						whileInView={{ opacity: 1, y: 0 }}
					>
						<h2 className={title({ size: "lg" })}>
							<span className="gradient-line">Book a scoping call</span>
						</h2>
						<p className="mx-auto mt-4 max-w-2xl text-base text-default-500 md:text-lg">
							{siteConfig.booking.duration} with a founder. Pick a time that
							works — no form, no waiting for a reply. Prefer to write first?
							The form is further down this page.
						</p>
					</motion.div>

					<div className="mt-10 w-full">
						<CalInline />
					</div>
				</section>
			)}

			{/* Contact Info Cards */}
			<section className="flex flex-col items-center w-full my-16 md:my-24">
				<div className="w-full max-w-6xl">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
						{contactInfo.map((info, index) => (
							<motion.a
								key={index}
								href={info.link}
								initial={{ opacity: 0, y: 20 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								viewport={{ once: true, margin: "-100px" }}
								whileInView={{ opacity: 1, y: 0 }}
								className={cn(
									"flex flex-col border-r py-10 relative group/feature border-hairline cursor-pointer",
									index === 0 && "border-l border-hairline",
									"border-b border-hairline lg:last:border-r-0",
								)}
							>
								<div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-purple-900/10 to-transparent pointer-events-none" />
								<div className="mb-4 relative z-10 px-10 text-purple-400">
									<info.icon className="w-6 h-6" />
								</div>
								<div className="text-lg font-bold mb-2 relative z-10 px-10">
									<div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-hairline-strong group-hover/feature:bg-purple-500 transition-all duration-200 origin-center" />
									<span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-white">
										{info.title}
									</span>
								</div>
								<p className="text-sm text-gray-400 max-w-xs relative z-10 px-10 break-all">
									{info.content}
								</p>
							</motion.a>
						))}
					</div>
				</div>
			</section>

			<Divider className="w-full max-w-7xl my-16 md:my-24" />

			{/* Contact Form Section */}
			<section className="flex flex-col items-center w-full my-16 md:my-24">
				<motion.div
					className="flex flex-col items-center mb-12 md:mb-16"
					initial={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true, margin: "-100px" }}
					whileInView={{ opacity: 1, y: 0 }}
				>
					<h2 className={title({ size: "lg" })}>
						<span className="gradient-line">
							{contactPage.form.title.part1}&nbsp;
							<span className={title({ color: "violet", size: "lg" })}>
								{contactPage.form.title.part2}
							</span>
						</span>
					</h2>
					<p
						className={subtitle({
							class: "max-w-3xl text-center mt-4",
						})}
					>
						{contactPage.form.subtitle}
					</p>
				</motion.div>

				<motion.div
					className="w-full max-w-2xl"
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{
						duration: 0.4,
						scale: { type: "spring", visualDuration: 0.8, bounce: 0.2 },
					}}
				>
					<div
						className="bg-gradient-to-b from-default-50 to-default-100/80 dark:from-default-100/10 dark:to-default-50/5 backdrop-blur-sm rounded-3xl shadow-lg p-6 md:p-8 mx-auto relative z-10 border border-default-200/50 dark:border-default-100/20"
						style={{
							boxShadow:
								"0 15px 30px rgba(0, 0, 0, 0.1), -20px 0 30px rgba(0, 0, 0, 0.05)",
						}}
					>
						<form onSubmit={handleSubmit}>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
								<div>
									<label className={labelClass} htmlFor="name">
										Your name
									</label>
									<input
										autoComplete="name"
										className={fieldClass}
										id="name"
										name="name"
										onChange={handleChange}
										required
										type="text"
										value={formData.name}
									/>
								</div>
								<div>
									<label className={labelClass} htmlFor="email">
										Work email
									</label>
									<input
										autoComplete="email"
										className={fieldClass}
										id="email"
										inputMode="email"
										name="email"
										onChange={handleChange}
										placeholder={contactPage.form.fields.email.placeholder}
										required
										type="email"
										value={formData.email}
									/>
								</div>
							</div>

							{/* Qualifiers. Optional, so they cost no completion. */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
								<div>
									<label className={labelClass} htmlFor="budget">
										Approximate budget{" "}
										<span className="font-normal text-default-500">
											(optional)
										</span>
									</label>
									<select
										className={fieldClass}
										id="budget"
										name="budget"
										onChange={handleChange}
										value={formData.budget}
									>
										<option value="">Not sure yet</option>
										<option value="Under ₹5 lakh">Under ₹5 lakh</option>
										<option value="₹5–15 lakh">₹5–15 lakh</option>
										<option value="₹15–50 lakh">₹15–50 lakh</option>
										<option value="Over ₹50 lakh">Over ₹50 lakh</option>
									</select>
								</div>
								<div>
									<label className={labelClass} htmlFor="timeline">
										Timeline{" "}
										<span className="font-normal text-default-500">
											(optional)
										</span>
									</label>
									<select
										className={fieldClass}
										id="timeline"
										name="timeline"
										onChange={handleChange}
										value={formData.timeline}
									>
										<option value="">Not sure yet</option>
										<option value="As soon as possible">
											As soon as possible
										</option>
										<option value="1–3 months">1–3 months</option>
										<option value="3–6 months">3–6 months</option>
										<option value="Just exploring">Just exploring</option>
									</select>
								</div>
							</div>

							<div className="mb-5">
								<label className={labelClass} htmlFor="message">
									What are you trying to build or fix?
								</label>
								<textarea
									className={`${fieldClass} h-[150px] resize-y`}
									id="message"
									name="message"
									onChange={handleChange}
									placeholder={contactPage.form.fields.message.placeholder}
									required
									rows={5}
									value={formData.message}
								/>
							</div>

							{/* Honeypot — hidden from people, filled by bots. */}
							<div aria-hidden="true" className="hidden">
								<label htmlFor="company">Company (leave blank)</label>
								<input
									autoComplete="off"
									id="company"
									name="company"
									onChange={handleChange}
									tabIndex={-1}
									type="text"
									value={formData.company}
								/>
							</div>

							<div className="flex justify-center">
								<button
									className="w-full md:w-[68%] flex justify-center items-center group bg-gradient-to-br from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-xl cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
									disabled={isSubmitting}
									type="submit"
								>
									{isSubmitting ? (
										<span>{contactPage.form.submitButton.loadingText}</span>
									) : (
										<>
											<SiWhatsapp
												aria-hidden="true"
												className="mr-2"
												size={20}
											/>
											{contactPage.form.submitButton.text}
										</>
									)}
								</button>
							</div>

							{/* The form used to say "Sending…" and then go silent, whether
							    or not the handoff worked. Both outcomes now say so. */}
							<div aria-live="polite" className="mt-5 min-h-[1.5rem]">
								{status === "sent" && (
									<p className="text-center text-sm text-emerald-400">
										WhatsApp should have opened in a new tab with your message
										ready to send. Press send there and we&apos;ll reply within
										one business day.
									</p>
								)}
								{status === "blocked" && (
									<p className="text-center text-sm text-amber-400">
										We couldn&apos;t open WhatsApp — your browser may have
										blocked the popup.{" "}
										<a
											className="underline underline-offset-4 hover:text-white"
											href={buildWhatsappUrl()}
											rel="noopener noreferrer"
											target="_blank"
										>
											Open it manually
										</a>{" "}
										or email{" "}
										<a
											className="underline underline-offset-4 hover:text-white"
											href={contactPage.contactInfo.email.link}
										>
											{contactPage.contactInfo.email.address}
										</a>
										.
									</p>
								)}
							</div>

							<p className="mt-4 text-center text-xs text-default-500">
								This opens WhatsApp with your details filled in. Prefer email?{" "}
								<a
									className="underline underline-offset-4 hover:text-white"
									href={contactPage.contactInfo.email.link}
								>
									{contactPage.contactInfo.email.address}
								</a>
								. We only use your details to reply — see our{" "}
								<Link
									className="underline underline-offset-4 hover:text-white"
									href="/privacy"
								>
									Privacy Policy
								</Link>
								.
							</p>
						</form>
					</div>
				</motion.div>
			</section>

			<Divider className="w-full max-w-7xl my-16 md:my-24" />

			{/* Social Links Section */}
			<section className="flex flex-col items-center w-full my-16 md:my-24">
				<motion.div
					className="flex flex-col items-center mb-12 md:mb-16"
					initial={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true, margin: "-100px" }}
					whileInView={{ opacity: 1, y: 0 }}
				>
					<h2 className={title({ size: "lg" })}>
						<span className="gradient-line">{contactPage.social.title}</span>
					</h2>
					<p
						className={subtitle({
							class: "max-w-3xl text-center mt-4",
						})}
					>
						{contactPage.social.subtitle}
					</p>
				</motion.div>

				<div className="flex flex-wrap justify-center gap-4">
					{socialLinks.map((social, index) => (
						<motion.a
							key={index}
							/* Icon-only link: without this a screen reader announces it as
							   just "link", with the URL as its only clue. */
							aria-label={`${social.name} (opens in a new tab)`}
							className="group"
							href={social.link}
							initial={{ opacity: 0, scale: 0.8 }}
							rel="noopener noreferrer"
							target="_blank"
							transition={{ duration: 0.4, delay: index * 0.1 }}
							viewport={{ once: true, margin: "-100px" }}
							whileInView={{ opacity: 1, scale: 1 }}
						>
							<Card className="bg-default-100/50 border border-default-200/50 hover:border-primary/50 transition-all duration-300 w-20 h-20 flex items-center justify-center group-hover:scale-110 rounded-2xl">
								<CardBody className="p-0 flex items-center justify-center">
									<social.icon
										aria-hidden="true"
										className="text-purple-600 dark:text-purple-400"
										size={32}
									/>
								</CardBody>
							</Card>
						</motion.a>
					))}
				</div>
			</section>

			{/* Office Hours / Additional Info */}
			<section className="flex flex-col items-center w-full my-16 md:my-24">
				<motion.div
					className="w-full max-w-4xl"
					initial={{ opacity: 0, y: 30 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true, margin: "-100px" }}
					whileInView={{ opacity: 1, y: 0 }}
				>
					<Card className="bg-gradient-to-br from-violet-500/10 to-purple-600/10 border border-violet-500/20 rounded-2xl">
						<CardBody className="p-8 md:p-12">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								<div>
									<h3 className="text-xl font-semibold mb-4">
										{contactPage.officeHours.title}
									</h3>
									<div className="space-y-2 text-default-600">
										{contactPage.officeHours.hours.map((hour, idx) => (
											<p key={idx}>
												<span className="font-semibold">{hour.day}:</span>{" "}
												{hour.time}
											</p>
										))}
									</div>
								</div>
								<div>
									<h3 className="text-xl font-semibold mb-4">
										{contactPage.responseTime.title}
									</h3>
									<div className="space-y-2 text-default-600">
										<p>
											{
												contactPage.responseTime.description.split(
													contactPage.responseTime.time,
												)[0]
											}
											<span className="font-semibold text-violet-400">
												{contactPage.responseTime.time}
											</span>
											{contactPage.responseTime.description.split(
												contactPage.responseTime.time,
											)[1] || "."}
										</p>
									</div>
								</div>
							</div>
						</CardBody>
					</Card>
				</motion.div>
			</section>
		</div>
	);
}
