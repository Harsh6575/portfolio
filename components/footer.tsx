"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
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
        <motion.h1
          animate={{
            x: ["10%", "-50%"],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          className="text-[6rem] md:text-[11rem] font-black uppercase tracking-widest whitespace-nowrap select-none text-transparent [-webkit-text-stroke:1.5px_oklch(var(--foreground)/0.03)]"
          aria-hidden="true"
        >
          {APP_NAME}
        </motion.h1>
      </div>

      {/* Grid Overlay Mask */}
      <div className="absolute inset-0 mesh-grid opacity-[0.02] dark:opacity-[0.01] pointer-events-none" />

      {/* Foreground Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center space-y-6">
          {/* Floating Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3.5 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground hover:neon-glow-primary transition-all duration-300 group cursor-pointer"
          >
            <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            <span className="sr-only">Back to top</span>
          </motion.button>

          {/* Social Links Row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex space-x-5 text-lg font-medium"
          >
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
          </motion.div>

          {/* Built With Description Credits Ticker */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-xs text-muted-foreground font-semibold"
          >
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current animate-pulse shrink-0" />
            <span>using</span>
            <span className="text-foreground">Next.js</span>
            <span>•</span>
            <span className="text-foreground">TypeScript</span>
            <span>•</span>
            <span className="text-foreground">Tailwind v4</span>
          </motion.div>

          {/* Copyright line */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest text-center"
          >
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </motion.p>

          {/* Availability Status line */}
          {OPEN_TO_NEW_OP && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-xs font-semibold text-green-500 bg-green-500/5 border border-green-500/10 px-3.5 py-1.5 rounded-full"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Available for backend opportunities</span>
            </motion.div>
          )}
        </div>
      </div>
    </footer>
  );
};
