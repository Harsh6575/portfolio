"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { Download, Target, GraduationCap, Sparkles, BookOpen, BarChart } from "lucide-react";
import Image from "next/image";
import {
  TOTAL_EXPERIENCE,
  ABOUT_BIO,
  FOCAL_POINTS,
  RESUME_URL,
  APP_NAME,
  EDUCATION,
} from "@/constants";
import { Values } from "./about/values";
import { Expertise } from "./about/expertise";
import { QuickStats } from "./about/quick-stats";

type TabOption = "story" | "expertise" | "stats";

export const About = () => {
  const [activeTab, setActiveTab] = useState<TabOption>("story");

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/10 relative overflow-hidden">
      {/* Background glowing spheres */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <SectionHeading
          title="About Me"
          subtitle="A snapshot of my software engineering philosophy, background, and core metrics"
        />

        <div className="grid lg:grid-cols-12 gap-12 items-start mt-4">
          {/* Left Column: Interactive Gyroscope Initials Visualizer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col items-center justify-center space-y-6"
          >
            {/* Holographic Gyroscope Orbit Container */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
              {/* Outer Orbit Circle */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-primary/20"
              />

              {/* Mid Orbit Circle */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-full border border-primary/10"
              />

              {/* Inner Glowing Orbit Circle */}
              <motion.div
                animate={{ rotate: 180 }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-8 rounded-full border-2 border-dashed border-fuchsia-500/20 shadow-inner"
              />

              {/* Central Glowing Capsule */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 1, -1, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-linear-to-br from-primary/15 to-fuchsia-500/5 backdrop-blur-md flex items-center justify-center border border-primary/30 relative group shadow-[0_0_50px_-12px_oklch(var(--primary)/0.3)] hover:shadow-[0_0_60px_-10px_oklch(var(--primary)/0.5)] transition-all duration-500"
              >
                <div className="absolute inset-2 rounded-full border border-white/5 bg-slate-900/40 dark:bg-black/20" />
                <Image
                  src="/400X400.svg"
                  alt={APP_NAME}
                  className="w-24 h-24 sm:w-28 sm:h-28 opacity-90 dark:invert transition-transform duration-500 group-hover:scale-105"
                  height={112}
                  width={112}
                  unoptimized
                />
              </motion.div>
            </div>

            {/* Quick Summary Info Panel under Central Avatar */}
            <div className="text-center w-full max-w-xs bg-card/40 border border-border/30 rounded-2xl p-4 backdrop-blur-xs">
              <h4 className="font-bold text-sm text-foreground">{APP_NAME}</h4>
              <p className="text-xs text-muted-foreground mt-1">Based in Gujarat, India</p>
              <div className="flex justify-center gap-1.5 mt-3">
                <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
                  Full Stack
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20">
                  FinTech
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  APIs
                </span>
              </div>
            </div>

            {/* CTA Resume Download Button */}
            <div className="pt-2">
              <Button
                className="group rounded-full text-xs font-semibold px-6 py-4 h-auto cursor-pointer"
                size="lg"
                asChild
              >
                <a
                  href={RESUME_URL}
                  download="Harsh_Vansjaliya_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-4 h-4 mr-2.5 transition-transform group-hover:translate-y-0.5" />
                  Download Resume
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Dynamic Interactive Tabbed Layout */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tabs Controller Menu */}
            <div className="flex bg-muted/40 p-1.5 rounded-full border border-border/30 gap-1 overflow-x-auto no-scrollbar">
              {[
                { id: "story", label: "My Story", icon: BookOpen },
                { id: "expertise", label: "My Expertise", icon: Sparkles },
                { id: "stats", label: "Stats & Education", icon: BarChart },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabOption)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/35"
                  }`}
                >
                  <tab.icon
                    className={`w-3.5 h-3.5 ${activeTab === tab.id ? "text-primary" : "text-muted-foreground"}`}
                  />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Content Switcher Box */}
            <div className="min-h-[380px]">
              <AnimatePresence mode="wait">
                {/* STORY TAB VIEW */}
                {activeTab === "story" && (
                  <motion.div
                    key="story"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <p className="text-sm sm:text-base text-foreground/90 leading-relaxed font-medium">
                        {ABOUT_BIO.intro.replace("{TOTAL_EXPERIENCE}", TOTAL_EXPERIENCE.toString())}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {ABOUT_BIO.experience}
                      </p>
                    </div>

                    {/* Target Focus Glass Card */}
                    <Card className="border-primary/20 bg-primary/5 rounded-2xl">
                      <CardContent className="p-5">
                        <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                          <Target className="w-4 h-4 text-primary" />
                          Primary Engineering Focus
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
                          {FOCAL_POINTS.map((point: string, index: number) => (
                            <div key={index} className="flex items-start gap-2">
                              <span className="text-primary">•</span>
                              <span>{point}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Values Component */}
                    <Values />
                  </motion.div>
                )}

                {/* EXPERTISE TAB VIEW */}
                {activeTab === "expertise" && (
                  <motion.div
                    key="expertise"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Expertise />
                  </motion.div>
                )}

                {/* STATS & EDUCATION TAB VIEW */}
                {activeTab === "stats" && (
                  <motion.div
                    key="stats"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {/* Render Quick Stats Grid */}
                    <QuickStats />

                    {/* Render Education Timeline Node */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-primary" />
                        Academic Background
                      </h3>
                      {EDUCATION.map((edu, idx) => (
                        <Card key={idx} className="border-border/40 bg-card/30 rounded-2xl">
                          <CardContent className="p-5 flex gap-4 items-start">
                            <div className="p-3 bg-muted/60 rounded-xl border border-border/20 text-muted-foreground mt-0.5">
                              <GraduationCap className="w-5 h-5 text-primary" />
                            </div>
                            <div className="space-y-1 flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
                                <h4 className="font-bold text-sm text-foreground">{edu.degree}</h4>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted font-bold text-muted-foreground w-fit">
                                  {edu.duration}
                                </span>
                              </div>
                              <p className="text-xs text-primary/95 font-semibold">
                                {edu.institution}
                              </p>
                              <p className="text-xs text-muted-foreground pt-1">
                                {edu.description}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
