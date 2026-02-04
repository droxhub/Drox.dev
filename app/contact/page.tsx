"use client";

import { Card, CardBody, Divider } from "@heroui/react";
import {
	ChatCircle,
	Envelope,
	GithubLogo,
	InstagramLogo,
	LinkedinLogo,
	MapPin,
	PaperPlaneTilt,
	Phone,
	WhatsappLogo,
} from "@phosphor-icons/react";
import { motion } from "motion/react";
import React, { useState } from "react";
import Badge from "@/components/chip";
import { subtitle, title } from "@/components/primitives";
import { contactPage } from "@/config/content";
import { cn } from "@/lib/utils";

// Map icons to social links
const socialIconMap: Record<string, typeof GithubLogo> = {
	GitHub: GithubLogo,
	Whatsapp: WhatsappLogo,
	LinkedIn: LinkedinLogo,
	Instagram: InstagramLogo,
};

const contactInfo = [
	{
		icon: Envelope,
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
		icon: ChatCircle,
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
	icon: socialIconMap[link.name] || GithubLogo,
	name: link.name,
	link: link.url,
	gradient: link.gradient,
}));

export default function ContactPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;

		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Create WhatsApp message with form data
		const whatsappNumber = contactPage.contactInfo.phone.whatsapp;
		const message = `Hello! I'm ${formData.name}.\n\nSubject: ${formData.subject}\n\nEmail: ${formData.email}\n\nMessage: ${formData.message}`;
		const encodedMessage = encodeURIComponent(message);
		const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

		// Redirect to WhatsApp
		window.open(whatsappUrl, "_blank");

		// Reset form after a short delay
		setTimeout(() => {
			setIsSubmitting(false);
			setFormData({ name: "", email: "", subject: "", message: "" });
		}, 500);
	};

	return (
		<div className="flex flex-col items-center w-full px-4 sm:px-6 xl:px-0">
			{/* Hero Section */}
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
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
						class: "max-w-3xl text-center text-gray-500 py-2",
					})}
					initial={{ opacity: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					{contactPage.hero.subtitle}
				</motion.p>
			</section>

			{/* Contact Info Cards */}
			<section className="flex flex-col items-center w-full my-16 md:my-24">
				<div className="w-full max-w-6xl px-4 sm:px-6 xl:px-0">
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
									"flex flex-col border-r py-10 relative group/feature border-[#1C1A31] cursor-pointer",
									index === 0 && "border-l border-[#1C1A31]",
									"border-b border-[#1C1A31] lg:last:border-r-0",
								)}
							>
								<div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-purple-900/10 to-transparent pointer-events-none" />
								<div className="mb-4 relative z-10 px-10 text-purple-400">
									<info.icon className="w-6 h-6" />
								</div>
								<div className="text-lg font-bold mb-2 relative z-10 px-10">
									<div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-[#2C2A51] group-hover/feature:bg-purple-500 transition-all duration-200 origin-center" />
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
									<input
										type="text"
										name="name"
										placeholder={contactPage.form.fields.name.placeholder}
										className="w-full px-4 py-3 bg-[#200045] dark:bg-[#200045] rounded-2xl text-white placeholder-default-400 outline-none border-2 border-transparent focus:border-violet-500 dark:focus:border-violet-400 hover:bg-[#2a0055] dark:hover:bg-[#2a0055] transition-all duration-200"
										onChange={handleChange}
										value={formData.name}
										required
									/>
								</div>
								<div>
									<input
										type="email"
										name="email"
										placeholder={contactPage.form.fields.email.placeholder}
										className="w-full px-4 py-3 bg-[#200045] dark:bg-[#200045] rounded-2xl text-white placeholder-default-400 outline-none border-2 border-transparent focus:border-violet-500 dark:focus:border-violet-400 hover:bg-[#2a0055] dark:hover:bg-[#2a0055] transition-all duration-200"
										onChange={handleChange}
										value={formData.email}
										required
									/>
								</div>
							</div>
							<div className="mb-4">
								<input
									type="text"
									name="subject"
									placeholder={contactPage.form.fields.subject.placeholder}
									className="w-full px-4 py-3 bg-[#200045] dark:bg-[#200045] rounded-2xl text-white placeholder-default-400 outline-none border-2 border-transparent focus:border-violet-500 dark:focus:border-violet-400 hover:bg-[#2a0055] dark:hover:bg-[#2a0055] transition-all duration-200"
									onChange={handleChange}
									value={formData.subject}
									required
								/>
							</div>
							<div className="mb-5">
								<textarea
									name="message"
									placeholder={contactPage.form.fields.message.placeholder}
									rows={8}
									className="w-full px-5 py-3 h-[170px] bg-[#200045] dark:bg-[#200045] rounded-2xl text-white placeholder-default-400 outline-none border-2 border-transparent focus:border-violet-500 dark:focus:border-violet-400 hover:bg-[#2a0055] dark:hover:bg-[#2a0055] resize-y transition-all duration-200"
									onChange={handleChange}
									value={formData.message}
									required
								/>
							</div>
							<div className="flex justify-center">
								<button
									type="submit"
									disabled={isSubmitting}
									className="w-full md:w-[68%] flex justify-center items-center group bg-gradient-to-br from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-xl cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50"
								>
									{isSubmitting ? (
										<span>Sending...</span>
									) : (
										<>
											<PaperPlaneTilt
												className="mr-2"
												size={20}
												weight="fill"
											/>
											{contactPage.form.submitButton.text}
										</>
									)}
								</button>
							</div>
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
										className="text-purple-600 dark:text-purple-400"
										size={32}
										weight="regular"
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
											<span className="font-semibold text-violet-500">
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
