"use client";

import React from "react";
import { Chip } from "@nextui-org/react";
import { motion } from "motion/react";
import {
  IconWorld,
  IconDeviceMobile,
  IconBolt,
  IconChartLine,
  IconUsers,
  IconHeadset,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

import { title, subtitle, sectionWrapper } from "@/components/primitives";
import CTAButton from "@/components/ui/cta-button";

const keyPoints = [
  {
    icon: <IconWorld />,
    title: "Innovative Web Solutions",
    description: "Custom websites that captivate and convert your audience",
  },
  {
    icon: <IconDeviceMobile />,
    title: "Mobile-First Development",
    description: "Seamless experiences across all devices and platforms",
  },
  {
    icon: <IconBolt />,
    title: "Performance Optimization",
    description: "Lightning-fast sites that rank and perform exceptionally",
  },
  {
    icon: <IconChartLine />,
    title: "Strategic Digital Growth",
    description: "Data-driven approaches to elevate your brand presence",
  },
  {
    icon: <IconUsers />,
    title: "Expert Team",
    description: "Experienced developers, designers, and strategists",
  },
  {
    icon: <IconHeadset />,
    title: "End-to-End Support",
    description: "Comprehensive guidance from concept to launch and beyond",
  },
];

export default function AboutSection() {
  return (
    <section className={sectionWrapper({ class: "mt-20 lg:mt-32 mb-16 px-4 md:px-6 lg:px-8" })}>
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

        {/* Cards Container */}
        <div className="w-full max-w-6xl mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {keyPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "flex flex-col border-r py-10 relative group/feature border-[#1C1A31]",
                  (index === 0 || index === 3) && "border-l border-[#1C1A31]",
                  index < 3 && "border-b border-[#1C1A31]"
                )}
              >
                {index < 3 && (
                  <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-purple-900/10 to-transparent pointer-events-none" />
                )}
                {index >= 3 && (
                  <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none" />
                )}
                <div className="mb-4 relative z-10 px-10 text-purple-400">
                  {point.icon}
                </div>
                <div className="text-lg font-bold mb-2 relative z-10 px-10">
                  <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-[#2C2A51] group-hover/feature:bg-purple-500 transition-all duration-200 origin-center" />
                  <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-white">
                    {point.title}
                  </span>
                </div>
                <p className="text-sm text-gray-400 max-w-xs relative z-10 px-10">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </div>
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
