"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Mail } from "lucide-react";
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
  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <footer className="relative bg-background border-t border-border/40 overflow-hidden shrink-0 py-10">
      {/* Grid Overlay Mask */}
      <div className="absolute inset-0 mesh-grid opacity-[0.03] dark:opacity-[0.02] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-6">
          {/* Top Row: Stay connected (social links) & Back to Top */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-muted-foreground">Stay connected:</span>
              <div className="flex space-x-2">
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
                    className="w-9 h-9 rounded-full border border-border/60 hover:border-primary/40 text-muted-foreground hover:text-foreground flex items-center justify-center bg-card/40 backdrop-blur-xs transition-[color,border-color,box-shadow] duration-300 shadow-xs hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                  >
                    <social.icon aria-hidden="true" size={15} />
                    <span className="sr-only">{social.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/60 hover:bg-muted text-xs font-mono text-muted-foreground hover:text-foreground border border-border/60 transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bottom Row: Copyright & Status */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full pt-6 border-t border-border/40 text-xs text-muted-foreground">
            <p className="font-mono text-[11px]">
              © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {APP_NAME} · India
            </p>

            {OPEN_TO_NEW_OP ? (
              <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-500 bg-emerald-500/5 border border-emerald-500/15 px-3 py-1 rounded-full">
                <span
                  aria-hidden="true"
                  className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse motion-reduce:animate-none"
                />
                <span>Available for new roles</span>
              </div>
            ) : (
              <p className="font-mono text-[11px] text-muted-foreground/60">
                Crafted with Next.js, React & TypeScript
              </p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
