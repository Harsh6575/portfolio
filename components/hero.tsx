"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import {
  GITHUB_URL,
  LINKED_IN_URL,
  MAIL_URL,
  LEETCODE_URL,
  OPEN_TO_NEW_OP,
  APP_NAME,
  APP_TITLE,
  APP_SUBTITLE,
  APP_TAGLINE,
} from "@/constants";
import { DevConsole } from "@/components/console/dev-console";
import { scrollToSection } from "@/lib/utils";
import type { ProjectSummary } from "@/lib/projects";

export const Hero = ({ projectSummaries }: { projectSummaries: ProjectSummary[] }) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col lg:flex-row lg:items-center justify-start lg:justify-center pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-background scroll-mt-24"
    >
      {/* Grid Mesh */}
      <div className="absolute inset-0 mesh-grid opacity-[0.05] dark:opacity-[0.03] pointer-events-none" />

      {/* Main Responsive Grid Layout */}
      <div className="max-w-6xl w-full mx-auto relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Hero Text */}
        <div className="lg:col-span-7 w-full max-w-full overflow-hidden flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Status Badge */}
          {OPEN_TO_NEW_OP && (
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 shadow-xs shadow-primary/5">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2.5 animate-pulse"></span>
                Open to New Opportunities
              </span>
            </div>
          )}

          {/* Headline Name */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 select-none leading-[1.1] py-1">
            Hi, {"I'm"} <span className="text-primary">{APP_NAME}</span>
          </h1>

          {/* Professional Titles */}
          <div className="mb-5">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground/90 tracking-wide mb-1">
              {APP_TITLE}
            </h2>
            <h3 className="text-base sm:text-lg text-muted-foreground font-medium">
              {APP_SUBTITLE}
            </h3>
          </div>

          {/* Core Tagline Description */}
          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-8 max-w-xl">
            {APP_TAGLINE}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start items-center sm:items-stretch mb-10">
            <Button
              onClick={() => scrollToSection("projects", 80)}
              size="lg"
              className="group text-sm font-semibold px-8 py-3.5 h-auto rounded-full cursor-pointer transition-all duration-300"
            >
              View Projects
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              onClick={() => scrollToSection("contact", 80)}
              variant="outline"
              size="lg"
              className="text-sm font-semibold px-8 py-3.5 h-auto rounded-full cursor-pointer backdrop-blur-xs border-border/60 hover:bg-muted transition-all"
            >
              Get in Touch
            </Button>
          </div>

          {/* Social Icons Links */}
          <div className="flex justify-center lg:justify-start gap-4">
            {[
              { url: GITHUB_URL, icon: FaGithub, label: "GitHub" },
              { url: LINKED_IN_URL, icon: FaLinkedin, label: "LinkedIn" },
              { url: LEETCODE_URL, icon: SiLeetcode, label: "LeetCode" },
              { url: MAIL_URL, icon: Mail, label: "Email" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.url}
                target={social.url.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border/60 hover:border-primary/40 text-muted-foreground hover:text-foreground flex items-center justify-center bg-card/40 backdrop-blur-xs transition-all duration-300 shadow-xs hover:shadow-primary/5"
              >
                <social.icon className="w-4.5 h-4.5" />
                <span className="sr-only">{social.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Developer Console */}
        <div className="lg:col-span-5 w-full max-w-full overflow-hidden flex justify-center px-2 sm:px-0">
          <DevConsole projectSummaries={projectSummaries} />
        </div>
      </div>
    </section>
  );
};
