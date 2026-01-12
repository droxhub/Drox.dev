"use client";

import React, { useState } from "react";
import { Divider, Button } from "@nextui-org/react";
import { motion } from "motion/react";
import {
  Sparkle,
  RocketLaunch,
  Users,
  Heart,
  Code,
  Palette,
  Lightbulb,
  Target,
  CaretDown,
} from "@phosphor-icons/react";

import { title, subtitle } from "@/components/primitives";
import Badge from "@/components/chip";
import FeatureCard from "@/components/ui/feature-card";
import CTAButton from "@/components/ui/cta-button";

const values = [
  {
    icon: Sparkle,
    title: "Innovation First",
    description:
      "We push boundaries and explore cutting-edge technologies to deliver solutions that set you apart.",
    gradient: "from-violet-400 to-purple-600",
  },
  {
    icon: Heart,
    title: "Client-Centric",
    description:
      "Your success is our priority. We build lasting partnerships through transparent communication.",
    gradient: "from-pink-400 to-rose-600",
  },
  {
    icon: Code,
    title: "Technical Excellence",
    description:
      "Clean, scalable code and best practices ensure your project stands the test of time.",
    gradient: "from-blue-400 to-cyan-600",
  },
  {
    icon: Palette,
    title: "Design-Driven",
    description:
      "Beautiful, intuitive interfaces that create memorable user experiences and drive conversions.",
    gradient: "from-yellow-400 to-orange-600",
  },
  {
    icon: Target,
    title: "Results-Oriented",
    description:
      "Every project is built with clear objectives and measurable outcomes in mind.",
    gradient: "from-green-400 to-emerald-600",
  },
  {
    icon: Users,
    title: "Collaborative Spirit",
    description:
      "We work as an extension of your team, bringing expertise and enthusiasm to every project.",
    gradient: "from-cyan-400 to-blue-600",
  },
];

const milestones = [
  {
    year: "2020",
    title: "The Beginning",
    description: "Started with a vision to transform digital experiences",
  },
  {
    year: "2022",
    title: "Rapid Growth",
    description: "Expanded our team and delivered 50+ successful projects",
  },
  {
    year: "2024",
    title: "Industry Recognition",
    description: "Recognized as a leading creative technology partner",
  },
  {
    year: "2025",
    title: "Global Expansion",
    description: "Expanding our reach and serving clients worldwide",
  },
  {
    year: "2026",
    title: "Innovation Leader",
    description:
      "Setting new standards in digital transformation and innovation",
  },
];

export default function AboutPage() {
  const [showAllValues, setShowAllValues] = useState(false);
  const MOBILE_VISIBLE_COUNT = 3;

  return (
    <div className="flex flex-col items-center w-full px-4 sm:px-6 xl:px-0 overflow-x-hidden">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 px-4 sm:px-0">
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
          className="text-center w-full max-w-4xl"
        >
          <h1
            className={title({ size: "md", class: "sm:text-4xl lg:text-6xl" })}
          >
            Building Tomorrow&apos;s
          </h1>
          <br />
          <h1
            className={title({
              color: "violet",
              size: "md",
              class: "sm:text-4xl lg:text-6xl",
            })}
          >
            Digital Experiences Today
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
          We are passionate creators and strategic thinkers dedicated to turning
          ambitious visions into extraordinary digital realities.
        </motion.p>
      </section>

      {/* Mission & Vision Section */}
      <section className="flex flex-col items-center w-full my-16 md:my-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-7xl w-full">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-600/20 flex items-center justify-center">
                <RocketLaunch
                  className="text-violet-500"
                  size={28}
                  weight="fill"
                />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Our Mission</h2>
            </div>
            <p className="text-base md:text-lg text-default-600 leading-relaxed">
              Our mission is crystal clear: to empower smart brands with
              exceptional digital solutions that drive growth and create
              meaningful connections. We believe technology should serve people,
              not the other way around.
            </p>
            <p className="text-base md:text-lg text-default-600 leading-relaxed">
              Every line of code we write, every design we craft, and every
              strategy we develop is centered around one goal—your success.
              We&apos;re not just service providers; we&apos;re your partners in
              building a digital future that matters.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-600/20 flex items-center justify-center">
                <Lightbulb
                  className="text-violet-500"
                  size={28}
                  weight="fill"
                />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Our Vision</h2>
            </div>
            <p className="text-base md:text-lg text-default-600 leading-relaxed">
              To be the catalyst that transforms ideas into digital
              masterpieces. We envision a world where every brand has the tools,
              insights, and support needed to create unforgettable online
              experiences that resonate deeply with their audience.
            </p>
            <p className="text-base md:text-lg text-default-600 leading-relaxed">
              Through innovation, creativity, and unwavering dedication, we
              strive to set new standards in digital excellence and help our
              clients achieve remarkable success in their digital journey.
            </p>
          </motion.div>
        </div>
      </section>

      <Divider className="w-full max-w-7xl my-16 md:my-24" />

      {/* What Sets Us Apart */}
      <section className="flex flex-col items-center w-full my-16 md:my-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-12 md:mb-16"
        >
          <h2 className={title({ size: "lg" })}>What Sets Us Apart</h2>
          <p
            className={subtitle({
              class: "max-w-3xl text-center mt-4",
            })}
          >
            Our unique combination of expertise, passion, and commitment makes
            us the ideal choice for your digital journey
          </p>
        </motion.div>

        {/* Cards Container with relative positioning for overlay */}
        <div className="relative w-full max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {values.map((value, index) => {
              // On mobile, hide cards after MOBILE_VISIBLE_COUNT unless showAllValues is true
              const isHiddenOnMobile =
                !showAllValues && index >= MOBILE_VISIBLE_COUNT;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={isHiddenOnMobile ? "hidden md:block" : ""}
                >
                  <FeatureCard
                    description={value.description}
                    gradient={value.gradient}
                    icon={value.icon}
                    title={value.title}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Mobile-only: Blur overlay and Show All button */}
          {!showAllValues && (
            <div className="md:hidden absolute bottom-0 left-0 right-0 pointer-events-none">
              {/* Gradient blur overlay */}
              <div className="h-40 bg-gradient-to-t from-[#030014] via-[#030014]/95 to-transparent" />

              {/* Button container */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-auto">
                <Button
                  className="bg-gradient-to-r from-purple-600 to-violet-600 text-white font-medium px-6 py-2 shadow-lg shadow-purple-900/40"
                  endContent={<CaretDown size={18} weight="bold" />}
                  radius="full"
                  size="md"
                  onPress={() => setShowAllValues(true)}
                >
                  Show All Values
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Divider className="w-full max-w-7xl my-16 md:my-24" />

      {/* Our Story */}
      <section className="flex flex-col items-center w-full my-16 md:my-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-12 md:mb-16"
        >
          <h2 className={title({ size: "lg" })}>
            From Vision to Reality:{" "}
            <span className={title({ color: "violet", size: "lg" })}>
              Our Journey
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col items-center max-w-4xl w-full space-y-6 mb-12 md:mb-16"
        >
          <p className="text-base md:text-lg text-default-600 leading-relaxed text-center">
            At DROX, we&apos;ve built more than a company—we&apos;ve cultivated
            a culture where creativity meets craftsmanship, and every project is
            infused with collaboration, passion, and purpose.
          </p>
          <p className="text-base md:text-lg text-default-600 leading-relaxed text-center">
            Our team is the heartbeat of everything we do. It&apos;s not just
            about working together, but growing together—facing challenges
            head-on, celebrating victories big and small, and evolving as a
            unified force. We believe that the best results come from teams that
            are genuinely invested in each other&apos;s success.
          </p>
          <p className="text-base md:text-lg text-default-600 leading-relaxed text-center">
            DROX is more than a workplace; it&apos;s a journey powered by
            ambition, unity, and unwavering dedication. Every client we serve,
            every project we complete, and every relationship we build is a
            testament to our commitment to excellence and our belief in the
            transformative power of great digital experiences.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="flex flex-col items-center max-w-4xl w-full">
          <div className="space-y-8 w-full">
            {milestones.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 items-start justify-center"
              >
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-violet-500 to-purple-600" />
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-gradient-to-b from-violet-500/50 to-transparent mt-2 min-h-[60px]" />
                  )}
                </div>
                <div className="flex-1 pb-8 text-center">
                  <div className="flex flex-col items-center gap-2 mb-2">
                    <span className="text-violet-500 font-semibold text-lg">
                      {item.year}
                    </span>
                    <h3 className="text-2xl font-bold">{item.title}</h3>
                  </div>
                  <p className="text-base text-default-600">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
              Ready to Start Your Journey?
            </h2>
            <p className="text-base md:text-lg text-default-600 text-center mt-4 mb-6">
              Let&apos;s transform your vision into a digital reality. Get in
              touch and discover how we can elevate your brand.
            </p>
            <div className="flex justify-center">
              <CTAButton href="/contact" text="Let's Talk" />
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
