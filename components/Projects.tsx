"use client";

import React from "react";

import { Chip } from "@nextui-org/react";
import { motion } from "motion/react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { title, subtitle } from "@/components/primitives";

const ProjectContent = ({
  description,
  technologies,
  features,
}: {
  description: string;
  technologies: string[];
  features: string[];
}) => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg font-sans max-w-3xl mx-auto mb-6">
        {description}
      </p>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200 mb-3">
          Technologies Used
        </h3>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200 mb-3">
          Key Features
        </h3>
        <ul className="space-y-2">
          {features.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-neutral-600 dark:text-neutral-400"
            >
              <span className="text-violet-500 mt-1">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const data = [
  {
    category: "E-Commerce",
    title: "Modern Online Store Platform",
    src: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=3432&auto=format&fit=crop",
    content: (
      <ProjectContent
        description="A fully-featured e-commerce platform built with Next.js and modern payment integrations. Features real-time inventory management and seamless checkout experience."
        features={[
          "Real-time inventory tracking",
          "Secure payment processing",
          "Admin dashboard with analytics",
          "Mobile-responsive design",
          "SEO optimized product pages",
        ]}
        technologies={[
          "Next.js",
          "TypeScript",
          "Stripe",
          "MongoDB",
          "Node.js",
          "Express.js",
          "Nest.js",
          "Tailwind CSS",
        ]}
      />
    ),
  },

  // {
  //   category: "Web Application",
  //   title: "Real Estate Platform",
  //   src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=3456&auto=format&fit=crop",
  //   content: (
  //     <ProjectContent
  //       description="A modern real estate platform with virtual tours, advanced search filters, and integrated booking system."
  //       features={[
  //         "Interactive property maps",
  //         "Virtual 3D tours",
  //         "Advanced filtering systems",
  //         "Appointment scheduling",
  //         "Mortgage calculator",
  //       ]}
  //       technologies={["Next.js", "Prisma", "Vercel", "Mapbox"]}
  //     />
  //   ),
  // },
  {
    category: "Enterprise Software",
    title: "Enterprise Resource Planning (ERP)",
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=3540&auto=format&fit=crop",
    content: (
      <ProjectContent
        description="A comprehensive ERP solution for managing business operations including inventory, HR, finance, and supply chain. Built for scalability and efficiency."
        features={[
          "Multi-module integration (Inventory, HR, Finance)",
          "Role-based access control",
          "Real-time reporting and analytics",
          "Automated workflow management",
          "Cloud-based infrastructure",
        ]}
        technologies={["Next.js", "Node.js", "PostgreSQL", "Redis", "Docker"]}
      />
    ),
  },
  {
    category: "Content Management",
    title: "Website with Headless CMS",
    src: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=3540&auto=format&fit=crop",
    content: (
      <ProjectContent
        description="A modern website powered by a headless CMS for easy content management. Perfect for marketing teams who need to update content without developer intervention."
        features={[
          "Drag-and-drop content editor",
          "Multi-language support",
          "Custom content blocks",
          "SEO optimization tools",
          "Media asset management",
        ]}
        technologies={[
          "Next.js",
          "Sanity CMS",
          "TypeScript",
          "Tailwind CSS",
          "Vercel",
        ]}
      />
    ),
  },
  // {
  //   category: "Interactive Web",
  //   title: "3D Interactive Website",
  //   src: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=3540&auto=format&fit=crop",
  //   content: (
  //     <ProjectContent
  //       description="An immersive 3D website with interactive elements and stunning visual effects. Features product showcases, virtual tours, and engaging user experiences."
  //       features={[
  //         "Interactive 3D product models",
  //         "Smooth scroll animations",
  //         "Virtual environment tours",
  //         "Physics-based interactions",
  //         "Optimized for performance",
  //       ]}
  //       technologies={["React", "Three.js", "GSAP", "WebGL", "Framer Motion"]}
  //     />
  //   ),
  // },
  {
    category: "Web Application",
    title: "Booking & Reservation System",
    src: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=3540&auto=format&fit=crop",
    content: (
      <ProjectContent
        description="A comprehensive booking platform for managing reservations, appointments, and schedules. Includes payment processing, calendar integration, and automated notifications."
        features={[
          "Real-time availability calendar",
          "Automated email and SMS notifications",
          "Payment processing integration",
          "Multi-timezone support",
          "Cancellation and refund management",
        ]}
        technologies={["Next.js", "Prisma", "Stripe", "Calendar API", "Twilio"]}
      />
    ),
  },
];

const Projects = () => {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <section className="w-full py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <Chip
          style={{ backgroundColor: "#1f0145ff" }}
          className="mb-6"
          variant="flat"
        >
          Projects
        </Chip>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col items-center mb-8"
      >
        <h2 className={title({ size: "lg" })}>Our Recent Projects</h2>
        <p
          className={subtitle({
            class: "max-w-3xl text-center mt-4",
          })}
        >
          Explore some of the amazing projects we&apos;ve built for our clients
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Carousel items={cards} />
      </motion.div>
    </section>
  );
};

export default Projects;
