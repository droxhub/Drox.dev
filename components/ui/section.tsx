import React from "react";
import { Chip } from "@nextui-org/react";

import { title, subtitle, sectionWrapper } from "@/components/primitives";

interface SectionProps {
  badge?: string;
  title?: string;
  titleGradient?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Section({
  badge,
  title: titleText,
  titleGradient,
  description,
  children,
  className = "",
}: SectionProps) {
  return (
    <section className={sectionWrapper({ class: className })}>
      <div className="flex flex-col items-center text-center">
        {badge && (
          <Chip className="mb-6" color="secondary" variant="flat">
            {badge}
          </Chip>
        )}

        {titleText && (
          <div className="mb-4 md:mb-6">
            {titleGradient ? (
              <>
                <h2 className={title({ size: "lg" })}>{titleText} </h2>
                <h2 className={title({ color: "violet", size: "lg" })}>
                  {titleGradient}
                </h2>
              </>
            ) : (
              <h2 className={title({ size: "lg" })}>{titleText}</h2>
            )}
          </div>
        )}

        {description && (
          <p className={subtitle({ class: "max-w-3xl mb-8 md:mb-12" })}>
            {description}
          </p>
        )}

        {children}
      </div>
    </section>
  );
}
