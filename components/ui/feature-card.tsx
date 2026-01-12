import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { IconProps } from "@phosphor-icons/react";

interface FeatureCardProps {
  icon?: React.ComponentType<IconProps>;
  iconText?: string;
  title: string;
  description: string;
  gradient?: string;
}

export default function FeatureCard({
  icon: IconComponent,
  iconText,
  title,
  description,
  gradient = "from-violet-400 to-purple-600",
}: FeatureCardProps) {
  return (
    <Card className="bg-gradient-to-t from-[#0E0C1E] to-[#08061D] backdrop-blur-sm border border-[#1C1A31]/80 rounded-2xl transition-all duration-300 h-full hover:scale-105 hover:border-[#2C2A51]/90 hover:shadow-xl hover:shadow-purple-900/30">
      <CardBody className="p-4 md:p-6">
        {(IconComponent || iconText) && (
          <div className="mb-3 md:mb-4">
            {IconComponent ? (
              <IconComponent
                className="text-purple-600 dark:text-purple-400"
                size={32}
                weight="regular"
              />
            ) : (
              <span
                className={`text-xl md:text-2xl font-bold bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}
              >
                {iconText}
              </span>
            )}
          </div>
        )}
        <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">
          {title}
        </h3>
        <p className="text-sm md:text-base text-default-600">{description}</p>
      </CardBody>
    </Card>
  );
}
