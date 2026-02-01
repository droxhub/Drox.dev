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
      className={`group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 bg-gradient-to-t from-[#1a0b2e] to-[#0a0525] border border-gray-800/80 rounded-full hover:border-purple-500/60 hover:shadow-2xl hover:shadow-purple-900/40 overflow-hidden ${className}`}
      href={href}
    >
      {/* Subtle purple glow on hover */}
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-600/20 via-violet-600/20 to-purple-600/20 transition-opacity duration-300" />
      
      {/* Text container with slide animation */}
      <span className="relative z-10 overflow-hidden inline-block">
        {/* Original text - slides up and fades out */}
        <span className="inline-block transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0">
          {text}
        </span>
        {/* Duplicate text - slides up from bottom */}
        <span className="absolute left-0 top-0 inline-block translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {text}
        </span>
      </span>
      
      <span className="relative z-10 ml-2 group-hover:translate-x-1 transition-transform duration-300">
        →
      </span>
    </Link>
  );
}
