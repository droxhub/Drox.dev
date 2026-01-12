"use client";

import React from "react";
import { Divider } from "@nextui-org/react";
import { motion } from "motion/react";
import {
  Lightbulb,
  MagnifyingGlass,
  Rocket,
  ShieldCheck,
  Target,
} from "@phosphor-icons/react";

import { title, subtitle } from "@/components/primitives";
import Badge from "@/components/chip";
import CTAButton from "@/components/ui/cta-button";
import ServiceCards from "@/components/ServiceCards";
import WhyChooseUs from "@/components/WhyChooseUs";

const processSteps = [
  {
    icon: MagnifyingGlass,
    title: "Discovery",
    description:
      "We start by understanding your business, goals, and challenges to create a tailored strategy.",
    gradient: "from-violet-400 to-purple-600",
  },
  {
    icon: Lightbulb,
    title: "Planning",
    description:
      "Our team designs a comprehensive roadmap with clear milestones and deliverables.",
    gradient: "from-blue-400 to-cyan-600",
  },
  {
    icon: Rocket,
    title: "Development",
    description:
      "We build your solution using best practices, ensuring quality and scalability.",
    gradient: "from-pink-400 to-rose-600",
  },
  {
    icon: ShieldCheck,
    title: "Testing & Launch",
    description:
      "Rigorous testing ensures everything works perfectly before we launch your project.",
    gradient: "from-green-400 to-emerald-600",
  },
  {
    icon: Target,
    title: "Optimization",
    description:
      "We continuously monitor and optimize to ensure peak performance and results.",
    gradient: "from-yellow-400 to-orange-600",
  },
];

export default function ServicesPage() {
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
          <h1 className={title({ size: "lg" })}>Our&nbsp;</h1>
          <h1 className={title({ color: "violet", size: "lg" })}>
            Services&nbsp;
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
          Comprehensive digital solutions tailored to your business needs. From
          concept to launch, we&apos;re with you every step of the way.
        </motion.p>
      </section>

      {/* Services Grid */}
      <ServiceCards />

      <Divider className="w-full max-w-7xl my-16 md:my-24" />

      {/* Process Section */}
      <section className="flex flex-col items-center w-full my-16 md:my-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-12 md:mb-16"
        >
          <h2 className={title({ size: "lg" })}>
            Our&nbsp;
            <span className={title({ color: "violet", size: "lg" })}>
              Process
            </span>
          </h2>
          <p
            className={subtitle({
              class: "max-w-3xl text-center mt-4",
            })}
          >
            A proven methodology that ensures successful project delivery
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 w-full max-w-7xl">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex flex-col items-center"
            >
              <div className="relative">
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-4`}
                >
                  <step.icon className="text-white" size={32} weight="fill" />
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-violet-500/50 to-transparent -ml-6" />
                )}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-center">
                {step.title}
              </h3>
              <p className="text-sm text-default-600 text-center">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <Divider className="w-full max-w-7xl my-16 md:my-24" />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* CTA Section */}
      <section className="flex flex-col items-center w-full my-16 md:my-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center max-w-3xl w-full"
        >
          <div className="bg-gradient-to-br from-violet-500/10 to-purple-600/10 border border-violet-500/20 rounded-2xl p-8 md:p-12 w-full">
            <h2 className={title({ size: "lg", color: "violet" })}>
              Ready to Get Started?
            </h2>
            <p className="text-base md:text-lg text-default-600 text-center mt-4 mb-6">
              Let&apos;s discuss how we can help transform your digital presence
              and achieve your business goals.
            </p>
            <div className="flex justify-center">
              <CTAButton href="/contact" text="Get in Touch" />
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
