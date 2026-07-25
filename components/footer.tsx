"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUp, Heart, Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import {
  GITHUB_URL,
  LINKED_IN_URL,
  MAIL_URL,
  OPEN_TO_NEW_OP,
  X_URL,
  LEETCODE_URL,
  APP_NAME,
} from "@/constants";

export const Footer = () => {
  const bgRef = useRef<HTMLDivElement | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-background border-t border-border/40 overflow-hidden shrink-0 select-none">
      {/* Background Animated Outline Text Watermark */}
      <div ref={bgRef} className="absolute inset-0 flex items-center pointer-events-none -z-10">
        <h1
          className="text-[6rem] md:text-[11rem] font-black uppercase tracking-widest whitespace-nowrap select-none text-transparent [-webkit-text-stroke:1.5px_oklch(var(--foreground)/0.03)]"
          aria-hidden="true"
        >
          {APP_NAME}
        </h1>
      </div>

      {/* Grid Overlay Mask */}
      <div className="absolute inset-0 mesh-grid opacity-[0.02] dark:opacity-[0.01] pointer-events-none" />

      {/* Foreground Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center space-y-6">
          {/* Floating Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="p-3.5 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300 group cursor-pointer"
          >
            <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            <span className="sr-only">Back to top</span>
          </button>

          {/* Social Links Row */}
          <div className="flex space-x-5 text-lg font-medium">
            {[
              { url: GITHUB_URL, icon: FaGithub, label: "GitHub" },
              { url: LINKED_IN_URL, icon: FaLinkedin, label: "LinkedIn" },
              { url: LEETCODE_URL, icon: SiLeetcode, label: "LeetCode" },
              { url: MAIL_URL, icon: Mail, label: "Email" },
              { url: X_URL, icon: FaXTwitter, label: "Twitter" },
            ].map((social, idx) => (
              <Link
                key={idx}
                href={social.url}
                target={social.url.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border/60 hover:border-primary/40 text-muted-foreground hover:text-primary flex items-center justify-center bg-card/30 backdrop-blur-xs transition-all duration-300"
              >
                <social.icon size={16} />
                <span className="sr-only">{social.label}</span>
              </Link>
            ))}
          </div>

          {/* Built With Description Credits Ticker */}
          <div className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-xs text-muted-foreground font-semibold">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current animate-pulse shrink-0" />
            <span>using</span>
            <span className="text-foreground">Next.js</span>
            <span>•</span>
            <span className="text-foreground">TypeScript</span>
            <span>•</span>
            <span className="text-foreground">Tailwind v4</span>
          </div>

          {/* Copyright line */}
          <p className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest text-center">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>

          {/* Availability Status line */}
          {OPEN_TO_NEW_OP && (
            <div className="flex items-center gap-2 text-xs font-semibold text-green-500 bg-green-500/5 border border-green-500/10 px-3.5 py-1.5 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Available for full-stack opportunities</span>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};
