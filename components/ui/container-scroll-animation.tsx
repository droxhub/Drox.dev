"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "motion/react";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);
  const [isSmall, setIsSmall] = React.useState(false);

  React.useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsSmall(width >= 640 && width < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // Use different scroll offsets for mobile vs desktop
  // Mobile: start animation earlier and end later for slower feel
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: isMobile
      ? ["start 0.5", "end 0.3"] // Mobile: starts when top hits 90% of viewport, ends at 30%
      : ["start end", "end start"], // Desktop: default behavior
  });

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  // Extend progress range for smoother animation
  const progressRange = isMobile ? [0, 0.6] : isSmall ? [0, 0.4] : [0, 0.5];

  const rotate = useTransform(scrollYProgress, progressRange, [27, 0]); // Rotate from 27° to flat
  const scale = useTransform(scrollYProgress, progressRange, scaleDimensions());
  const translate = useTransform(scrollYProgress, progressRange, [0, -100]); // Header moves up
  const cardTranslate = useTransform(
    scrollYProgress,
    progressRange,
    isMobile ? [0, 82] : [0, 70]
  ); // Card moves down - responsive

  return (
    <div
      ref={containerRef}
      className="h-[80rem] md:h-[80rem] flex items-center justify-center relative"
    >
      <div
        className="w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header titleComponent={titleComponent} translate={translate} />
        <Card rotate={rotate} scale={scale} translate={cardTranslate}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      className="div max-w-5xl bg-transparent mx-auto text-center"
      style={{
        translateY: translate,
      }}
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  translate,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      className="bg-transparent"
      style={{
        rotateX: rotate, // Rotates from 27° to 0° while scrolling
        scale,
        translateY: translate, // Moves card down as you scroll
      }}
    >
      <div className="bg-transparent">{children}</div>
    </motion.div>
  );
};
