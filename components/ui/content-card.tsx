import React from "react";
import { Card, CardBody } from "@nextui-org/react";

interface ContentCardProps {
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function ContentCard({
  icon,
  title,
  children,
  className = "",
}: ContentCardProps) {
  return (
    <Card
      className={`bg-gradient-to-br from-violet-500/10 to-purple-600/10 border border-violet-500/20 ${className}`}
    >
      <CardBody className="p-6 md:p-8">
        {icon && <div className="mb-4 md:mb-6">{icon}</div>}
        <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{title}</h3>
        <div className="text-base md:text-lg text-default-600 leading-relaxed">
          {children}
        </div>
      </CardBody>
    </Card>
  );
}
