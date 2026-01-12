"use client";

import React, { useState } from "react";
import { Divider } from "@nextui-org/react";
import { Input, Textarea, Button } from "@nextui-org/react";
import { motion } from "motion/react";
import {
  Envelope,
  Phone,
  MapPin,
  PaperPlaneTilt,
  GithubLogo,
  WhatsappLogo,
  LinkedinLogo,
  InstagramLogo,
  ChatCircle,
} from "@phosphor-icons/react";
import { Card, CardBody } from "@nextui-org/react";

import { title, subtitle } from "@/components/primitives";
import Badge from "@/components/chip";
import { contactPage } from "@/config/content";

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-block max-w-sm lg:max-w-4xl text-center justify-center"
        >
          <h1 className={title({ size: "lg" })}>
            {contactPage.hero.title.part1}&nbsp;
          </h1>
          <h1 className={title({ color: "violet", size: "lg" })}>
            {contactPage.hero.title.part2}
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={subtitle({
            class: "max-w-3xl text-center text-gray-500 py-2",
          })}
        >
          {contactPage.hero.subtitle}
        </motion.p>
      </section>

      {/* Contact Info Cards */}
      <section className="flex flex-col items-center w-full my-16 md:my-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <Card className="bg-default-100/50 border border-default-200/50 hover:border-primary/50 transition-all duration-300 group hover:scale-105 h-full">
                <CardBody className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <info.icon
                      className="text-purple-600 dark:text-purple-400"
                      size={32}
                      weight="regular"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                  <a
                    className="text-default-600 hover:text-primary transition-colors"
                    href={info.link}
                  >
                    {info.content}
                  </a>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <Divider className="w-full max-w-7xl my-16 md:my-24" />

      {/* Contact Form Section */}
      <section className="flex flex-col items-center w-full my-16 md:my-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-12 md:mb-16"
        >
          <h2 className={title({ size: "lg" })}>
            {contactPage.form.title.part1}&nbsp;
            <span className={title({ color: "violet", size: "lg" })}>
              {contactPage.form.title.part2}
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-2xl"
        >
          <Card className="bg-default-100/50 border border-default-200/50">
            <CardBody className="p-6 md:p-8">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    isRequired
                    classNames={{
                      input: "text-default-700",
                      label: "text-default-600",
                    }}
                    label={contactPage.form.fields.name.label}
                    name="name"
                    placeholder={contactPage.form.fields.name.placeholder}
                    value={formData.name}
                    variant="bordered"
                    onChange={handleChange}
                  />
                  <Input
                    isRequired
                    classNames={{
                      input: "text-default-700",
                      label: "text-default-600",
                    }}
                    label={contactPage.form.fields.email.label}
                    name="email"
                    placeholder={contactPage.form.fields.email.placeholder}
                    type="email"
                    value={formData.email}
                    variant="bordered"
                    onChange={handleChange}
                  />
                </div>
                <Input
                  isRequired
                  classNames={{
                    input: "text-default-700",
                    label: "text-default-600",
                  }}
                  label={contactPage.form.fields.subject.label}
                  name="subject"
                  placeholder={contactPage.form.fields.subject.placeholder}
                  value={formData.subject}
                  variant="bordered"
                  onChange={handleChange}
                />
                <Textarea
                  isRequired
                  classNames={{
                    input: "text-default-700",
                    label: "text-default-600",
                  }}
                  label={contactPage.form.fields.message.label}
                  minRows={6}
                  name="message"
                  placeholder={contactPage.form.fields.message.placeholder}
                  value={formData.message}
                  variant="bordered"
                  onChange={handleChange}
                />
                <Button
                  className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold"
                  color="primary"
                  isLoading={isSubmitting}
                  size="lg"
                  startContent={
                    !isSubmitting && <PaperPlaneTilt size={20} weight="fill" />
                  }
                  type="submit"
                >
                  {isSubmitting
                    ? contactPage.form.submitButton.loadingText
                    : contactPage.form.submitButton.text}
                </Button>
              </form>
            </CardBody>
          </Card>
        </motion.div>
      </section>

      <Divider className="w-full max-w-7xl my-16 md:my-24" />

      {/* Social Links Section */}
      <section className="flex flex-col items-center w-full my-16 md:my-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-12 md:mb-16"
        >
          <h2 className={title({ size: "lg" })}>{contactPage.social.title}</h2>
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
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group"
              href={social.link}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Card className="bg-default-100/50 border border-default-200/50 hover:border-primary/50 transition-all duration-300 w-20 h-20 flex items-center justify-center group-hover:scale-110">
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl"
        >
          <Card className="bg-gradient-to-br from-violet-500/10 to-purple-600/10 border border-violet-500/20">
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
                          contactPage.responseTime.time
                        )[0]
                      }
                      <span className="font-semibold text-violet-500">
                        {contactPage.responseTime.time}
                      </span>
                      {contactPage.responseTime.description.split(
                        contactPage.responseTime.time
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
