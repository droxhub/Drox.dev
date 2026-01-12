"use client";

import React from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiPython,
  SiFigma,
} from "react-icons/si";

import { Chip } from "@nextui-org/react";
import { motion } from "motion/react";
import LogoLoop from "@/components/ui/LogoLoop";
import { title, subtitle } from "@/components/primitives";

// Define responsive icon sizes
const iconSize = { mobile: 32, desktop: 48 };

const TechLogo = ({
  Icon,
}: {
  Icon: React.ComponentType<{ size: number; className?: string }>;
}) => <Icon size={iconSize.desktop} className="w-8 h-8 md:w-12 md:h-12" />;

const techLogos = [
  {
    node: <TechLogo Icon={SiReact} />,
    title: "React",
    href: "https://react.dev",
  },
  {
    node: <TechLogo Icon={SiNextdotjs} />,
    title: "Next.js",
    href: "https://nextjs.org",
  },
  {
    node: <TechLogo Icon={SiTypescript} />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: <TechLogo Icon={SiTailwindcss} />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
  {
    node: <TechLogo Icon={SiNodedotjs} />,
    title: "Node.js",
    href: "https://nodejs.org",
  },
  {
    node: <TechLogo Icon={SiMongodb} />,
    title: "MongoDB",
    href: "https://www.mongodb.com",
  },
  {
    node: <TechLogo Icon={SiPython} />,
    title: "Python",
    href: "https://www.python.org",
  },
  {
    node: <TechLogo Icon={SiFigma} />,
    title: "Figma",
    href: "https://www.figma.com",
  },
];

const TechStack = () => {
  return (
    <section className="flex flex-col items-center w-full my-16 md:my-[100px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <Chip
          style={{ backgroundColor: "#1f0145ff" }}
          className="mb-6"
          variant="flat"
        >
          Arms
        </Chip>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col items-center mb-12"
      >
        <h2 className={title({ size: "lg" })}>Technologies We Use</h2>
        <p
          className={subtitle({
            class: "max-w-3xl text-center mt-4",
          })}
        >
          Building with cutting-edge tools and frameworks
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-7xl h-[80px] md:h-[120px]"
      >
        <LogoLoop
          fadeOut
          fadeOutColor="#030014"
          scaleOnHover
          ariaLabel="Technology stack"
          direction="left"
          gap={60}
          hoverSpeed={20}
          logoHeight={32}
          logos={techLogos}
          speed={60}
        />
      </motion.div>
    </section>
  );
};

export default TechStack;
