"use client";

import { Link } from "@heroui/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#030014] pt-16 md:pt-24 pb-8 md:pb-12 overflow-hidden border-t border-white/5">
      {/* Large Background Branding */}
      <div className="absolute bottom-[2%] md:bottom-[-5%] lg:bottom-[-10%] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-0">
        <h2 className="no-gradient text-[28vw] md:text-[18vw] lg:text-[20vw] font-bold text-white/3 leading-none tracking-tighter uppercase whitespace-nowrap">
          DROX
        </h2>
      </div>

      {/* Lighting/Beam Effects - Scaled proportionately */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] md:w-[500px] md:h-[500px] bg-violet-600/10 blur-[80px] md:blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute top-10 md:top-20 right-[-15%] md:right-[-10%] w-[150px] md:w-[300px] h-full bg-gradient-to-b from-violet-500/10 md:from-violet-500/20 via-transparent to-transparent rotate-12 blur-[40px] md:blur-[60px] pointer-events-none opacity-40" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        {/* Top Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 mb-16 md:mb-20">
          {/* Brand Section */}
          <div className="flex flex-col gap-5 md:gap-6">
            <Link className="flex items-center gap-2" href="/">
              <Image
                alt={siteConfig.name}
                height={32}
                src="/logo.png"
                width={110}
                className="brightness-200"
              />
            </Link>
            <p className="text-gray-400 text-[13px] md:text-sm leading-relaxed max-w-[280px]">
              Crafting digital experiences that inspire and innovate. Let&apos;s
              build something remarkable together.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="lg:pl-8">
            <h4 className="text-white text-sm md:text-base font-medium mb-5 md:mb-6">
              Navigation
            </h4>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-y-3.5 md:gap-y-4">
              <li>
                <Link
                  href="/"
                  className="text-gray-500 hover:text-white transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-500 hover:text-white transition-colors text-sm"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-500 hover:text-white transition-colors text-sm"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="text-gray-500 hover:text-white transition-colors text-sm"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-500 hover:text-white transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:pl-8">
            <h4 className="text-white text-sm md:text-base font-medium mb-5 md:mb-6">
              Services
            </h4>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-y-3.5 md:gap-y-4">
              <li>
                <Link
                  href="/services"
                  className="text-gray-500 hover:text-white transition-colors text-sm"
                >
                  Web Design
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-500 hover:text-white transition-colors text-sm"
                >
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-500 hover:text-white transition-colors text-sm"
                >
                  Branding
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-500 hover:text-white transition-colors text-sm"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-500 hover:text-white transition-colors text-sm"
                >
                  App Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div className="lg:pl-8">
            <h4 className="text-white text-sm md:text-base font-medium mb-5 md:mb-6">
              Follow us on
            </h4>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-y-3.5 md:gap-y-4">
              <li>
                <Link
                  isExternal
                  href="https://www.facebook.com/drox.dev"
                  className="text-gray-500 hover:text-white transition-colors text-sm"
                >
                  Facebook
                </Link>
              </li>
              <li>
                <Link
                  isExternal
                  href="https://wa.me/919946642643"
                  className="text-gray-500 hover:text-white transition-colors text-sm"
                >
                  WhatsApp
                </Link>
              </li>
              <li>
                <Link
                  isExternal
                  href="https://www.linkedin.com/company/drox-dev/?viewAsMember=true"
                  className="text-gray-500 hover:text-white transition-colors text-sm"
                >
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  isExternal
                  href="https://www.instagram.com/drox.dev"
                  className="text-gray-500 hover:text-white transition-colors text-sm"
                >
                  Instagram
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-[11px] md:text-xs text-gray-500 order-2 md:order-1">
            © {currentYear} {siteConfig.name}. All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 md:gap-x-8 text-[11px] md:text-xs text-gray-400 order-1 md:order-2">
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span className="opacity-20 hidden md:block">|</span>
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="opacity-20 hidden md:block">|</span>
            <Link
              href="/accessibility"
              className="hover:text-white transition-colors"
            >
              Accessibility Statement
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
