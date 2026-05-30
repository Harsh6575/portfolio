"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Check, Copy } from "lucide-react";
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
  TOTAL_EXPERIENCE,
} from "@/constants";
import Image from "next/image";
import { TerminalWindow } from "@/components/terminal-window";

type TabName = "profile.json" | "experience.ts" | "interests.py";

export const Hero = () => {
  const [activeTab, setActiveTab] = useState<TabName>("profile.json");
  const [copied, setCopied] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const codeSnippets: Record<
    TabName,
    { language: string; content: string; lines: React.ReactNode[] }
  > = {
    "profile.json": {
      language: "json",
      content: `{
  "name": "${APP_NAME}",
  "role": "${APP_TITLE}",
  "experience": "${TOTAL_EXPERIENCE}+ Years",
  "status": "${OPEN_TO_NEW_OP ? "Open to Opportunities" : "Employed"}",
  "specialties": [
    "Scalable API Architectures",
    "High-Performance Frontends",
    "Database Optimization"
  ]
}`,
      lines: [
        <span key="1">{"{"}</span>,
        <span key="2">
          {" "}
          <span className="text-violet-400">{'"name"'}</span>:{" "}
          <span className="text-cyan-400">
            {'"'}
            {APP_NAME}
            {'"'}
          </span>
          ,
        </span>,
        <span key="3">
          {" "}
          <span className="text-violet-400">{'"role"'}</span>:{" "}
          <span className="text-cyan-400">
            {'"'}
            {APP_TITLE}
            {'"'}
          </span>
          ,
        </span>,
        <span key="4">
          {" "}
          <span className="text-violet-400">{'"experience"'}</span>:{" "}
          <span className="text-cyan-400">
            {'"'}
            {TOTAL_EXPERIENCE}
            {'+ Years"'}
          </span>
          ,
        </span>,
        <span key="5">
          {" "}
          <span className="text-violet-400">{'"status"'}</span>:{" "}
          <span className="text-cyan-400">
            {'"'}
            {OPEN_TO_NEW_OP ? "Available" : "Active"}
            {'"'}
          </span>
          ,
        </span>,
        <span key="6">
          {" "}
          <span className="text-violet-400">{'"specialties"'}</span>: [
        </span>,
        <span key="7">
          {" "}
          <span className="text-emerald-400">{'"Scalable API Architectures"'}</span>,
        </span>,
        <span key="8">
          {" "}
          <span className="text-emerald-400">{'"High-Performance Frontends"'}</span>,
        </span>,
        <span key="9">
          {" "}
          <span className="text-emerald-400">{'"Database Optimization"'}</span>
        </span>,
        <span key="10"> ]</span>,
        <span key="11">{"}"}</span>,
      ],
    },
    "experience.ts": {
      language: "typescript",
      content: `import { Developer } from './harsh';

export class Portfolio extends Developer {
  readonly current = {
    company: "Alite Projects",
    role: "Software Developer",
    stack: ["Node.js", "Redis", "Next.js", "PostgreSQL"]
  };

  async init() {
    await this.buildRobustScalableAPIs();
    await this.craftPremiumUserInterfaces();
  }
}`,
      lines: [
        <span key="1">
          <span className="text-pink-400">import</span> {"{"} Developer {"}"}{" "}
          <span className="text-pink-400">from</span>{" "}
          <span className="text-emerald-400">{"'./harsh'"}</span>;
        </span>,
        <span key="2" />,
        <span key="3">
          <span className="text-pink-400">export class</span>{" "}
          <span className="text-violet-400">Portfolio</span>{" "}
          <span className="text-pink-400">extends</span>{" "}
          <span className="text-amber-400">Developer</span> {"{"}
        </span>,
        <span key="4">
          {" "}
          <span className="text-pink-400">readonly</span>{" "}
          <span className="text-cyan-400">current</span> = {"{"}
        </span>,
        <span key="5">
          {" "}
          company: <span className="text-emerald-400">{'"Alite Projects"'}</span>,
        </span>,
        <span key="6">
          {" "}
          role: <span className="text-emerald-400">{'"Software Developer"'}</span>,
        </span>,
        <span key="7">
          {" "}
          stack: [<span className="text-emerald-400">{'"Node.js"'}</span>,{" "}
          <span className="text-emerald-400">{'"Redis"'}</span>,{" "}
          <span className="text-emerald-400">{'"Next.js"'}</span>,{" "}
          <span className="text-emerald-400">{'"PostgreSQL"'}</span>]
        </span>,
        <span key="8"> {"};"}</span>,
        <span key="9" />,
        <span key="10">
          {" "}
          <span className="text-pink-400">async</span> <span className="text-amber-400">init</span>
          () {"{"}
        </span>,
        <span key="11">
          {" "}
          <span className="text-pink-400">await</span> <span className="text-cyan-400">this</span>.
          <span className="text-violet-400">buildRobustScalableAPIs</span>();
        </span>,
        <span key="12">
          {" "}
          <span className="text-pink-400">await</span> <span className="text-cyan-400">this</span>.
          <span className="text-violet-400">craftPremiumUserInterfaces</span>();
        </span>,
        <span key="13"> {"}"}</span>,
        <span key="14">{"}"}</span>,
      ],
    },
    "interests.py": {
      language: "python",
      content: `class DevInterests:
    def __init__(self):
        self.focus = "High Performance & Clean Code"
        self.databases = ["PostgreSQL", "MongoDB", "Redis"]
        self.fintech = "Algorithmic Trading & Stock Analytics"
        self.philosophy = "Mastering system design & shipping value"

    def is_learning_always(self) -> bool:
        return True`,
      lines: [
        <span key="1">
          <span className="text-pink-400">class</span>{" "}
          <span className="text-violet-400">DevInterests</span>:
        </span>,
        <span key="2">
          {" "}
          <span className="text-pink-400">def</span>{" "}
          <span className="text-amber-400">__init__</span>(
          <span className="text-cyan-400">self</span>):
        </span>,
        <span key="3">
          {" "}
          <span className="text-cyan-400">self</span>.focus ={" "}
          <span className="text-emerald-400">{'"High Performance & Clean Code"'}</span>
        </span>,
        <span key="4">
          {" "}
          <span className="text-cyan-400">self</span>.databases = [
          <span className="text-emerald-400">{'"PostgreSQL"'}</span>,{" "}
          <span className="text-emerald-400">{'"MongoDB"'}</span>,{" "}
          <span className="text-emerald-400">{'"Redis"'}</span>]
        </span>,
        <span key="5">
          {" "}
          <span className="text-cyan-400">self</span>.fintech ={" "}
          <span className="text-emerald-400">{'"Algorithmic Trading & Stock Analytics"'}</span>
        </span>,
        <span key="6">
          {" "}
          <span className="text-cyan-400">self</span>.philosophy ={" "}
          <span className="text-emerald-400">{'"Mastering system design & shipping value"'}</span>
        </span>,
        <span key="7" />,
        <span key="8">
          {" "}
          <span className="text-pink-400">def</span>{" "}
          <span className="text-amber-400">is_learning_always</span>(
          <span className="text-cyan-400">self</span>) -&gt;{" "}
          <span className="text-violet-400">bool</span>:
        </span>,
        <span key="9">
          {" "}
          <span className="text-pink-400">return</span> <span className="text-amber-400">True</span>
        </span>,
      ],
    },
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab].content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col lg:flex-row lg:items-center justify-start lg:justify-center pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-background"
    >
      {/* Grid Mesh & Ambient Glows */}
      <div className="absolute inset-0 mesh-grid opacity-[0.06] dark:opacity-[0.03] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-violet-600/10 blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-cyan-500/10 blur-3xl animate-pulse-slow pointer-events-none" />

      {/* Background Initials Watermark */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03] dark:opacity-[0.02]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.04, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image
          src="/400X400.svg"
          alt="HV Watermark"
          width={600}
          height={600}
          className="w-120 h-120 sm:w-150 sm:h-150 object-contain dark:invert"
          unoptimized
        />
      </motion.div>

      {/* Main Responsive Grid Layout */}
      <div className="max-w-6xl w-full mx-auto relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Hero Text */}
        <div className="lg:col-span-7 w-full max-w-full overflow-hidden flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Status Badge */}
          {OPEN_TO_NEW_OP && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6"
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 shadow-xs shadow-primary/5">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2.5 animate-pulse"></span>
                Open to New Opportunities
              </span>
            </motion.div>
          )}

          {/* Headline Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 select-none leading-[1.1] py-1"
          >
            Hi, {"I'm"}{" "}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 bg-clip-text text-transparent dark:from-violet-400 dark:via-fuchsia-400 dark:to-cyan-400">
              {APP_NAME}
            </span>
          </motion.h1>

          {/* Professional Titles */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-5"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-foreground/90 tracking-wide mb-1">
              {APP_TITLE}
            </h2>
            <h3 className="text-base sm:text-lg text-muted-foreground font-medium">
              {APP_SUBTITLE}
            </h3>
          </motion.div>

          {/* Core Tagline Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-8 max-w-xl"
          >
            {APP_TAGLINE}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start items-center sm:items-stretch mb-10"
          >
            <Button
              onClick={() => scrollToSection("projects")}
              size="lg"
              className="group text-sm font-semibold px-8 py-3.5 h-auto rounded-full cursor-pointer hover:neon-glow-primary transition-all duration-300"
            >
              View Projects
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              onClick={() => scrollToSection("contact")}
              variant="outline"
              size="lg"
              className="text-sm font-semibold px-8 py-3.5 h-auto rounded-full cursor-pointer backdrop-blur-xs border-border/60 hover:bg-muted transition-all"
            >
              Get in Touch
            </Button>
          </motion.div>

          {/* Social Icons Links */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center lg:justify-start gap-4"
          >
            {[
              { url: GITHUB_URL, icon: FaGithub, label: "GitHub" },
              { url: LINKED_IN_URL, icon: FaLinkedin, label: "LinkedIn" },
              { url: LEETCODE_URL, icon: SiLeetcode, label: "LeetCode" },
              { url: MAIL_URL, icon: Mail, label: "Email" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target={social.url.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border/60 hover:border-primary/40 text-muted-foreground hover:text-foreground flex items-center justify-center bg-card/40 backdrop-blur-xs transition-all duration-300 shadow-xs hover:shadow-primary/5"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="w-4.5 h-4.5" />
                <span className="sr-only">{social.label}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Simulated Developer Console Mock */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-5 w-full max-w-full overflow-hidden flex justify-center px-2 sm:px-0"
        >
          <TerminalWindow
            tabs={["profile.json", "experience.ts", "interests.py"]}
            activeTab={activeTab}
            onTabChange={tab => setActiveTab(tab as TabName)}
            rightAction={
              <button
                onClick={copyToClipboard}
                className="text-slate-400 hover:text-slate-100 p-1.5 rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
                title="Copy Active Code"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-green-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            }
            className="w-full max-w-[460px] md:max-w-[500px] min-h-[300px] sm:min-h-0 aspect-[4/3] sm:aspect-[4/3.2]"
          >
            {/* Code Content Editor Area */}
            <div className="p-5 flex-1 overflow-y-auto text-[11px] sm:text-xs text-slate-300 leading-relaxed custom-scrollbar bg-slate-950">
              <pre className="flex w-full max-w-full overflow-hidden">
                {/* Line Numbers Column */}
                <div className="text-slate-600 text-right pr-4 select-none shrink-0 font-medium border-r border-white/5">
                  {codeSnippets[activeTab].lines.map((_, i) => (
                    <div key={i} className="h-5">
                      {i + 1}
                    </div>
                  ))}
                </div>

                {/* Line Content Highlights Column */}
                <div className="pl-4 flex-1 select-text overflow-x-auto min-w-0 no-scrollbar">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                    >
                      {codeSnippets[activeTab].lines.map((line, idx) => (
                        <div key={idx} className="h-5 whitespace-pre">
                          {line}
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </pre>
            </div>
          </TerminalWindow>
        </motion.div>
      </div>
    </section>
  );
};
