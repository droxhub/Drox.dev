"use client";

import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { motion } from "motion/react";

import { siteConfig } from "@/config/site";
import { title } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import Badge from "@/components/chip";
import TrustedBy from "@/components/trusted";
import PrototypeImg from "@/components/prototype-img";
import { contactPage } from "@/config/content";
import ColourfulText from "@/components/ui/colourful-text";
import BlurText from "@/components/text-animations/BlurText";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      {" "}
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
          }}>Make </span>
          <span style={{ all: 'unset', display: 'inline' }}>
            <ColourfulText text="Beautiful" />
          </span>
        </h1>
        <br />
        <h1 className={title({ size: "lg" })} style={{
          background: 'linear-gradient(to bottom, #FFFFFF 0%, #9B9B9E 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>Digital Experiences</h1>
        <BlurText
          text="Beautiful, fast and modern web solutions."
          delay={150}
          animateBy="words"
          direction="top"
          className="font-normal text-gray-500 py-2 justify-center text-center"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto px-4 sm:px-0 relative z-10"
      >
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={`https://wa.me/${contactPage.contactInfo.phone.whatsapp}`}
        >
          Start a Free Consultation
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative z-10"
      >
        <TrustedBy />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-0 sm:mt-[-20px] md:mt-[-30px] lg:mt-[-50px] w-full"
      >
        <div className="mt-[-80px]">
        <PrototypeImg />
        </div>
      </motion.div>
    </section>
  );
}
