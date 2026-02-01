"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

import { title, subtitle } from "@/components/primitives";

// Counter animation component
const AnimatedCounter = ({
  target,
  suffix = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);

        // Easing function (easeOutQuart)
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(eased * target);

        setCount(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(target);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, target, duration]);

  return (
    <div ref={ref} className="text-4xl font-bold text-violet-500 mb-2">
      {count}
      {suffix}
    </div>
  );
};

const WhyChooseUs = () => {
  return (
    <section className="flex flex-col items-center w-full my-16 md:my-24 px-4 md:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center mb-12 md:mb-16 overflow-visible"
      >
        <h2 className={title({ size: "lg" })}>Why Choose DROX?</h2>
        <p
          className={subtitle({
            class: "max-w-3xl text-center mt-4",
          })}
        >
          What sets us apart in delivering exceptional digital solutions
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center"
        >
          <AnimatedCounter target={15} suffix="+" duration={2} />
          <h3 className="text-lg font-semibold mb-2">Projects Delivered</h3>
          <p className="text-sm text-default-600">
            Successfully completed projects across various industries
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <AnimatedCounter target={100} suffix="%" duration={2} />
          <h3 className="text-lg font-semibold mb-2">Client Satisfaction</h3>
          <p className="text-sm text-default-600">
            Our clients love working with us and keep coming back
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <div className="text-4xl font-bold text-violet-500 mb-2">24/7</div>
          <h3 className="text-lg font-semibold mb-2">Support Available</h3>
          <p className="text-sm text-default-600">
            Round-the-clock support to keep your business running smoothly
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
