"use client";

import React from "react";
import { Link } from "@nextui-org/link";
import { Input, Button } from "@nextui-org/react";

import { siteConfig } from "@/config/site";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-t from-[#0E0C1E] to-[#08061D] border-t border-[#1C1A31]/80">
      <div className="container mx-auto max-w-7xl px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-8">
          {/* Logo and Social Section */}
          <div className="lg:col-span-3">
            <Link className="flex items-center gap-2 mb-4" href="/">
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-purple-600 bg-clip-text text-transparent">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-default-500 text-sm mb-6">
              Crafting digital excellence, one project at a time.
            </p>
            {/* Social Links */}
            {/* <div className="flex gap-4">
              <Link
                isExternal
                className="text-default-500 hover:text-primary transition-colors"
                href={siteConfig.links.discord}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </Link>
              <Link
                isExternal
                className="text-default-500 hover:text-primary transition-colors"
                href={siteConfig.links.twitter}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
            </div> */}
          </div>

          {/* Product Links */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-default-900 dark:text-white mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  className="text-default-500 hover:text-primary transition-colors text-sm"
                  href="/services"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  className="text-default-500 hover:text-primary transition-colors text-sm"
                  href="/services"
                >
                  Integrations
                </Link>
              </li>
              <li>
                <Link
                  className="text-default-500 hover:text-primary transition-colors text-sm"
                  href="/contact"
                >
                  Pricing
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/blog"
                  className="text-default-500 hover:text-primary transition-colors text-sm"
                >
                  Changelog
                </Link>
              </li> */}
              {/* <li>
                <Link
                  href="/docs"
                  className="text-default-500 hover:text-primary transition-colors text-sm"
                >
                  Roadmap
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-default-900 dark:text-white mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  className="text-default-500 hover:text-primary transition-colors text-sm"
                  href="/about"
                >
                  Our team
                </Link>
              </li>
              <li>
                <Link
                  className="text-default-500 hover:text-primary transition-colors text-sm"
                  href="/about"
                >
                  Our values
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/blog"
                  className="text-default-500 hover:text-primary transition-colors text-sm"
                >
                  Blog
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-default-900 dark:text-white mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {/* <li>
                <Link
                  href="/docs"
                  className="text-default-500 hover:text-primary transition-colors text-sm"
                >
                  Downloads
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-default-500 hover:text-primary transition-colors text-sm"
                >
                  Documentation
                </Link>
              </li> */}
              <li>
                <Link
                  className="text-default-500 hover:text-primary transition-colors text-sm"
                  href="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-3">
            <h3 className="font-semibold text-default-900 dark:text-white mb-4">
              Get free note-taking workflows
            </h3>
            <p className="text-default-500 text-sm mb-4">
              In our weekly newsletter.
            </p>
            <div className="flex gap-2">
              <Input
                classNames={{
                  input: "bg-transparent",
                  inputWrapper:
                    "bg-default-100/50 border border-default-200/50 hover:border-primary/50",
                }}
                placeholder="Send a message"
                size="sm"
                type="email"
              />
              <Button
                isExternal
                as={Link}
                color="primary"
                href="https://wa.me/918111807089"
                size="sm"
              >
                Send
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-default-200/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-6 text-sm text-default-500">
              {/* <Link
                href="/privacy"
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="text-default-300">•</span>
              <Link
                href="/terms"
                className="hover:text-primary transition-colors"
              >
                Terms of Conditions
              </Link> */}
            </div>
            <p className="text-sm text-default-500">{siteConfig.name}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
