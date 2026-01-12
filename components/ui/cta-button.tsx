import React from "react";
import Link from "next/link";

interface CTAButtonProps {
  href: string;
  text: string;
  className?: string;
}

export default function CTAButton({
  href,
  text,
  className = "",
}: CTAButtonProps) {
  return (
    <Link
      className={`group inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white transition-all duration-300 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full hover:from-violet-600 hover:to-purple-700 hover:shadow-lg hover:shadow-violet-500/50 ${className}`}
      href={href}
    >
      <span>{text}</span>
      <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
        →
      </span>
    </Link>
  );
}
