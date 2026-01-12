"use client";
import React from "react";
import { Sparkles } from "lucide-react";

import { siteMetadata } from "@/config/content";

export default function App() {
  return (
    <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-gray-950/40 via-blue-950/30 to-gray-950/40 border border-blue-500/20 shadow-sm shadow-blue-500/10 hover:border-blue-400/40 hover:shadow-blue-500/20 transition-all duration-300 backdrop-blur-md">
      <Sparkles className="w-4 h-4 text-blue-400" />
      <span className="text-gray-200 font-medium text-sm tracking-wide">
        {siteMetadata.badge.text}
      </span>
    </div>
  );
}
