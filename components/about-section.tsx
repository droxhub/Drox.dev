"use client";

import React, { useState } from "react";
import { Chip, Button } from "@nextui-org/react";
import { motion } from "motion/react";
import {
  Globe,
  DeviceMobile,
  Lightning,
  ChartLineUp,
  Users,
  Headset,
  CaretDown,
} from "@phosphor-icons/react";

import { title, subtitle, sectionWrapper } from "@/components/primitives";
import FeatureCard from "@/components/ui/feature-card";
import CTAButton from "@/components/ui/cta-button";

const keyPoints = [
  {
    icon: Globe,
    title: "Innovative Web Solutions",
    description: "Custom websites that captivate and convert your audience",
  },
  {
    icon: DeviceMobile,
    title: "Mobile-First Development",
    description: "Seamless experiences across all devices and platforms",
  },
  {
    icon: Lightning,
    title: "Performance Optimization",
    description: "Lightning-fast sites that rank and perform exceptionally",
  },
  {
    icon: ChartLineUp,
    title: "Strategic Digital Growth",
    description: "Data-driven approaches to elevate your brand presence",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Experienced developers, designers, and strategists",
  },
  {
    icon: Headset,
    title: "End-to-End Support",
    description: "Comprehensive guidance from concept to launch and beyond",
  },
];

export default function AboutSection() {
  const [showAll, setShowAll] = useState(false);
  const MOBILE_VISIBLE_COUNT = 3;

  return (
    <section className={sectionWrapper({ class: "mt-20 lg:mt-32 mb-16" })}>
      <div className="flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <Chip
            className="mb-6"
            style={{ backgroundColor: "#1f0145ff" }}
            variant="flat"
          >
            About Us
          </Chip>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-8"
        >
          <div className="inline-block max-w-4xl">
            <h1 className={title({ size: "lg" })}>
              Crafting Digital Excellence
            </h1>
            <br />
            <h1 className={title({ color: "violet", size: "lg" })}>
              One Project at a Time
            </h1>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={subtitle({
            class: "max-w-3xl text-center mb-12 text-gray-400",
          })}
        >
          We build digital products that help brands grow. We focus on practical web solutions, user-friendly design, and strong execution from start to launch.
        </motion.p>

        {/* Cards Container with relative positioning for overlay */}
        <div className="relative w-full max-w-6xl mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {keyPoints.map((point, index) => {
              // On mobile, hide cards after MOBILE_VISIBLE_COUNT unless showAll is true
              const isHiddenOnMobile =
                !showAll && index >= MOBILE_VISIBLE_COUNT;

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
                    description={point.description}
                    icon={point.icon}
                    title={point.title}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Mobile-only: Blur overlay and Show All button */}
          {!showAll && (
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
                  onPress={() => setShowAll(true)}
                >
                  Show All Features
                </Button>
              </div>
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <CTAButton href="/about" text="Learn More About Us" />
        </motion.div>
      </div>
    </section>
  );
}
