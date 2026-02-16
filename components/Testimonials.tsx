"use client";

import { Heart } from "lucide-react";
import { motion } from "motion/react";
import LogoLoop from "@/components/ui/LogoLoop";
import SectionHeader from "@/components/ui/section-header";

interface Testimonial {
  name: string;
  handle: string;
  avatar: string;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Imthiyas Ahmed",
    handle: "Manager Of Alafa Events",
    avatar: "testimonials/imthiyas.png",
    content:
      "We had difficulty managing catering staff for multiple events. The team built a web app that streamlined scheduling and made our operations organized and efficient.",
  },
  {
    name: "Sainul Abid",
    handle: "Founder and MD of Alafa Events",
    avatar: "testimonials/alfa.png",
    content:
      "As founders, we wanted faster and more scalable operations. The team delivered a system that streamlined our workflow, improved coordination, and accelerated our growth significantly.",
  },
//   {
//     name: "Demetria Giles",
//     handle: "@drosewillings",
//     avatar: "https://i.pravatar.cc/150?img=5",
//     content:
//       "Playing around with @reflectnotes, I'm back logging key thoughts, details and soundbites from episodes, books, meetings, articles, etc from the past week. So far, it's a knowledge worker's dream come true.",
//   },
//   {
//     name: "Marcus Chen",
//     handle: "@mchen_dev",
//     avatar: "https://i.pravatar.cc/150?img=15",
//     content:
//       "Finally, a platform that understands modern development needs. The API integration was seamless and the documentation is top-notch.",
//   },
//   {
//     name: "Jeremy McPeak",
//     handle: "@jrmcpeak",
//     avatar: "https://i.pravatar.cc/150?img=13",
//     content:
//       "I just received an invite to @reflectnotes, and holy crap! It is well thought out, and I can see this being my note-taking platform going forward. Well done! I'm looking forward to seeing how the app progresses.",
//   },
//   {
//     name: "Elena Vasquez",
//     handle: "@elenadesigns",
//     avatar: "https://i.pravatar.cc/150?img=9",
//     content:
//       "As a designer, I appreciate the attention to detail in every pixel. The UI is not just functional, it's beautiful.",
//   },
//   {
//     name: "Fabrizio Rinaldi",
//     handle: "@linuz90",
//     avatar: "https://i.pravatar.cc/150?img=8",
//     content:
//       "I'm keeping @reflectnotes open *all* the time, and I'm using both for simple journaling, and long form writing. It's rare to see a single app work so well for both.",
//   },
//   {
//     name: "David Park",
//     handle: "@dpark_tech",
//     avatar: "https://i.pravatar.cc/150?img=11",
//     content:
//       "Migrated our entire infrastructure and couldn't be happier. Performance improvements are beyond our expectations.",
//   },
//   {
//     name: "Jonathan Barronville",
//     handle: "@jonbarronville",
//     avatar: "https://i.pravatar.cc/150?img=14",
//     content:
//       "All righty, I had to jot down a few thoughts on @reflectnotes' natural writing speed, focus mode, and the overall flow. It really does deliver on all the bits of other note apps I wish were faster.",
//   },
//   {
//     name: "Olivia Thompson",
//     handle: "@oliviat",
//     avatar: "https://i.pravatar.cc/150?img=20",
//     content:
//       "Customer support is exceptional. They went above and beyond to ensure our team was set up for success.",
//   },
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="flex-none w-[280px] h-[160px] md:w-[450px] md:h-[210px]">
      <div className="bg-gradient-to-t from-[#0E0C1E] to-[#08061D] backdrop-blur-sm border border-[#1C1A31]/80 rounded-2xl p-3 md:p-5 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <img
            alt={testimonial.name}
            className="w-8 h-8 md:w-11 md:h-11 rounded-full object-cover ring-2 ring-purple-500/20 flex-shrink-0"
            src={testimonial.avatar}
          />
          <div className="min-w-0 flex-1">
            <h4 className="font-semibold text-sm md:text-base text-default-900 dark:text-white truncate">
              {testimonial.name}
            </h4>
            <p className="text-sm text-default-500 dark:text-default-400 truncate">
              {testimonial.handle}
            </p>
          </div>
        </div>
        <p className="text-sm md:text-base text-default-700 dark:text-default-300 leading-relaxed line-clamp-3 flex-1">
          {testimonial.content}
        </p>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const row1Items = testimonials
    .filter((_, index) => index % 2 === 0)
    .map((testimonial, index) => ({
      node: <TestimonialCard key={`row1-${index}`} testimonial={testimonial} />,
      title: testimonial.name,
    }));

  const row2Items = testimonials
    .filter((_, index) => index % 2 !== 0)
    .map((testimonial, index) => ({
      node: <TestimonialCard key={`row2-${index}`} testimonial={testimonial} />,
      title: testimonial.name,
    }));

  return (
    <section className="flex flex-col items-center w-full py-16 md:py-26 overflow-hidden">
      <SectionHeader
        badge="Wall of Love"
        icon={Heart}
        title="Loved by Thinkers"
        subtitle="Here's what people are saying about us"
        size="lg"
      />

      <div className="w-full space-y-10">
        {/* First Row - Left to Right */}
        <motion.div
          className="h-[160px] md:h-[200px] flex items-center py-4 md:py-6"
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <LogoLoop
            fadeOut
            ariaLabel="Customer testimonials row 1"
            direction="right"
            fadeOutColor="#030014"
            gap={20}
            logoHeight={160}
            logos={row1Items}
            pauseOnHover={true}
            speed={12}
          />
        </motion.div>

        {/* Second Row - Right to Left */}
        <motion.div
          className="h-[160px] md:h-[200px] flex items-center pb-4 md:pb-6"
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <LogoLoop
            fadeOut
            ariaLabel="Customer testimonials row 2"
            direction="left"
            fadeOutColor="#030014"
            gap={20}
            logoHeight={160}
            logos={row2Items}
            pauseOnHover={true}
            speed={12}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
