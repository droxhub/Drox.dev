"use client";

import React, { useState } from "react";
import { Divider, Button } from "@nextui-org/react";
import { motion } from "motion/react";
import {
  IconSparkles,
  IconRocket,
  IconUsers,
  IconHeart,
  IconCode,
  IconPalette,
  IconBulb,
  IconTarget,
  IconCaretDownFilled,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

import { title, subtitle } from "@/components/primitives";
import Badge from "@/components/chip";
import BorderedFeatureCard from "@/components/ui/bordered-feature-card";
import CTAButton from "@/components/ui/cta-button";

const values = [
  {
    icon: <IconSparkles />,
    title: "Innovation First",
    description:
      "Cutting-edge tech that sets you apart.",
  },
  {
    icon: <IconHeart />,
    title: "Client-Centric",
    description:
      "Your success drives everything we do.",
  },
  {
    icon: <IconCode />,
    title: "Technical Excellence",
    description:
      "Clean, scalable code built to last.",
  },
  {
    icon: <IconPalette />,
    title: "Design-Driven",
    description:
      "Beautiful interfaces that convert.",
  },
  {
    icon: <IconTarget />,
    title: "Results-Oriented",
    description:
      "Clear objectives, measurable outcomes.",
  },
  {
    icon: <IconUsers />,
    title: "Collaborative Spirit",
    description:
      "Your extended team, fully invested.",
  },
];

const milestones = [
  {
    year: "2020",
    title: "The Beginning",
    description: "Vision to transform digital experiences",
  },
  {
    year: "2022",
    title: "Rapid Growth",
    description: "50+ successful projects delivered",
  },
  {
    year: "2024",
    title: "Industry Recognition",
    description: "Leading creative technology partner",
  },
  {
    year: "2025",
    title: "Global Expansion",
    description: "Serving clients worldwide",
  },
  {
    year: "2026",
    title: "Innovation Leader",
    description:
      "Setting new standards in digital transformation",
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
          className="relative z-10"
        >
          <Badge />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-block max-w-sm md:max-w-2xl lg:max-w-4xl text-center justify-center text-2xl relative z-10"
        >
          <h1 className={title({ size: "lg" })}>
            <span style={{
              background: 'linear-gradient(to bottom, #FFFFFF 0%, #9B9B9E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Building Tomorrow&apos;s </span>
          </h1>
          <br />
          <h1 className={title({ color: "violet", size: "lg" })}>
            Digital Experiences
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={subtitle({
            class: "max-w-2xl text-center text-gray-500 py-2",
          })}
        >
          Passionate creators turning visions into digital realities.
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
                <IconRocket
                  className="text-violet-500"
                  size={28}
                />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Our Mission</h2>
            </div>
            <p className="text-base md:text-lg text-default-600 leading-relaxed">
              Empower brands with exceptional digital solutions that drive growth and create meaningful connections. Technology should serve people—every line of code, every design, every strategy centers on your success.
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
                <IconBulb
                  className="text-violet-500"
                  size={28}
                />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Our Vision</h2>
            </div>
            <p className="text-base md:text-lg text-default-600 leading-relaxed">
              Transform ideas into digital masterpieces. Through innovation and dedication, we set new standards in digital excellence, helping clients achieve remarkable success in their digital journey.
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
              class: "max-w-2xl text-center mt-4",
            })}
          >
            Expertise, passion, and commitment in every project
          </p>
        </motion.div>

        {/* Cards Container with relative positioning for overlay */}
        <div className="relative w-full max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10">
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
                  className={cn(isHiddenOnMobile && "hidden md:block")}
                >
                  <BorderedFeatureCard
                    description={value.description}
                    icon={value.icon}
                    index={index}
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
                  endContent={<IconCaretDownFilled size={18} />}
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
            At DROX, we&apos;ve built a culture where creativity meets craftsmanship. Every project is infused with collaboration, passion, and purpose—facing challenges head-on and celebrating victories together.
          </p>
          <p className="text-base md:text-lg text-default-600 leading-relaxed text-center">
            We&apos;re more than a workplace; we&apos;re a journey powered by ambition and dedication. Every client, project, and relationship is a testament to our commitment to excellence.
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
              Let&apos;s transform your vision into reality.
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
