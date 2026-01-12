"use client";

import React, { useState } from "react";
import { Card, CardBody, Button } from "@nextui-org/react";
import {
  ChartLineUp,
  DeviceMobile,
  Gear,
  Globe,
  Palette,
  ShoppingCart,
  CaretDown,
} from "@phosphor-icons/react";
import { Chip } from "@nextui-org/react";
import { motion } from "motion/react";

import { title, subtitle } from "@/components/primitives";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Custom web applications built with modern technologies. From responsive websites to complex web platforms, we deliver scalable solutions that perform.",
    gradient: "from-violet-400 to-purple-600",
    features: [
      "React & Next.js Development",
      "Full-Stack Solutions",
      "API Integration",
      "Performance Optimization",
    ],
  },
  {
    icon: DeviceMobile,
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile applications for iOS and Android. We create intuitive, high-performance apps that users love.",
    gradient: "from-blue-400 to-cyan-600",
    features: [
      "iOS & Android Apps",
      "React Native Development",
      "UI/UX Design",
      "App Store Optimization",
    ],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Beautiful, user-centered designs that combine aesthetics with functionality. We create interfaces that engage users and drive conversions.",
    gradient: "from-pink-400 to-rose-600",
    features: [
      "User Research",
      "Wireframing & Prototyping",
      "Visual Design",
      "Design Systems",
    ],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    description:
      "Complete e-commerce platforms that drive sales. From product catalogs to payment integration, we build online stores that convert.",
    gradient: "from-yellow-400 to-orange-600",
    features: [
      "Online Store Development",
      "Payment Gateway Integration",
      "Inventory Management",
      "Analytics & Reporting",
    ],
  },
  {
    icon: ChartLineUp,
    title: "Digital Marketing",
    description:
      "Data-driven marketing strategies that grow your business. We help you reach the right audience and maximize your ROI.",
    gradient: "from-green-400 to-emerald-600",
    features: [
      "SEO & SEM",
      "Social Media Marketing",
      "Content Strategy",
      "Analytics & Insights",
    ],
  },
  {
    icon: Gear,
    title: "Maintenance & Support",
    description:
      "Ongoing support and maintenance to keep your digital assets running smoothly. We ensure your systems stay updated and secure.",
    gradient: "from-cyan-400 to-blue-600",
    features: [
      "24/7 Monitoring",
      "Security Updates",
      "Performance Tuning",
      "Technical Support",
    ],
  },
];

interface ServiceCardsProps {
  showChip?: boolean;
}

const ServiceCards = ({ showChip = false }: ServiceCardsProps) => {
  const [showAll, setShowAll] = useState(false);
  const MOBILE_VISIBLE_COUNT = 3;

  return (
    <section className="flex flex-col items-center w-full my-16 md:my-24">
      {showChip && (
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
            Services
          </Chip>
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: showChip ? 0.1 : 0 }}
        className="flex flex-col items-center mb-12 md:mb-16"
      >
        <h2 className={title({ size: "lg" })}>What We Offer</h2>
        <p
          className={subtitle({
            class: "max-w-3xl text-center mt-4",
          })}
        >
          A full spectrum of digital services to help your business thrive in
          the digital age
        </p>
      </motion.div>

      {/* Cards Container with relative positioning for overlay */}
      <div className="relative w-full max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {services.map((service, index) => {
            // On mobile, hide cards after MOBILE_VISIBLE_COUNT unless showAll is true
            const isHiddenOnMobile = !showAll && index >= MOBILE_VISIBLE_COUNT;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={isHiddenOnMobile ? "hidden md:block" : ""}
              >
                <Card className="bg-gradient-to-t from-[#0E0C1E] to-[#08061D] backdrop-blur-sm border border-[#1C1A31]/80 rounded-2xl transition-all duration-300 h-full group hover:scale-105 hover:border-[#2C2A51]/90 hover:shadow-xl hover:shadow-purple-900/30">
                  <CardBody className="p-8 flex flex-col items-start">
                    <div className="mb-6">
                      <service.icon
                        className="text-purple-600 dark:text-purple-400"
                        size={32}
                        weight="regular"
                      />
                    </div>
                    <h3 className="text-lg font-semibold mb-3 text-default-900 dark:text-default-700">
                      {service.title}
                    </h3>
                    <p className="text-sm text-default-600 dark:text-default-500 leading-relaxed">
                      {service.description}
                    </p>
                  </CardBody>
                </Card>
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
                Show All Services
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceCards;
