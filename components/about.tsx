"use client";

import React, { useState } from "react";
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
import { Expertise } from "./about/expertise";
import { QuickStats } from "./about/quick-stats";

type TabOption = "story" | "expertise" | "stats";

export const About = ({ projectsCount }: { projectsCount: number }) => {
  const [activeTab, setActiveTab] = useState<TabOption>("story");

  return (
    <section
      id="about"
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <SectionHeading
          index="01 — About"
          title="About Me"
          subtitle="Background, how I work, and the numbers behind it"
          align="left"
        />

        <div className="grid lg:grid-cols-12 gap-12 items-start mt-4">
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-5 w-full max-w-full overflow-hidden flex flex-col items-center justify-center space-y-6">
            {/* Avatar */}
            <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-2xl bg-muted/40 flex items-center justify-center border border-border overflow-hidden">
              <Image
                src="/400X400.svg"
                alt={APP_NAME}
                className="w-20 h-20 sm:w-24 sm:h-24 opacity-90 dark:invert"
                height={96}
                width={96}
                unoptimized
              />
            </div>

            {/* Quick Summary Info Panel under Avatar */}
            <div className="text-center w-full max-w-xs bg-card border border-border rounded-2xl p-4">
              <h4 className="font-bold text-sm text-foreground">{APP_NAME}</h4>
              <p className="text-xs text-muted-foreground mt-1">Based in Gujarat, India</p>
              <div className="flex justify-center gap-1.5 mt-3">
                <span className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-primary/10 text-primary border border-primary/20">
                  Full Stack
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-muted text-muted-foreground border border-border">
                  FinTech
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-muted text-muted-foreground border border-border">
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
          </div>

          {/* Right Column: Dynamic Interactive Tabbed Layout */}
          <div className="lg:col-span-7 w-full max-w-full overflow-hidden space-y-6">
            {/* Tabs Controller Menu */}
            <div className="inline-flex max-w-full bg-muted/40 p-1.5 rounded-full border border-border/30 gap-1 overflow-x-auto no-scrollbar">
              {[
                { id: "story", label: "My Story", icon: BookOpen },
                { id: "expertise", label: "My Expertise", icon: Sparkles },
                { id: "stats", label: "Stats & Education", icon: BarChart },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabOption)}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold shrink-0 cursor-pointer ${
                    activeTab === tab.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {activeTab === tab.id && (
                    <span className="absolute inset-0 bg-card rounded-full shadow-sm" />
                  )}
                  <tab.icon
                    className={`relative z-10 w-3.5 h-3.5 ${activeTab === tab.id ? "text-primary" : "text-muted-foreground"}`}
                  />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Content Switcher Box */}
            <div className="min-h-[380px]">
              <>
                {/* STORY TAB VIEW */}
                {activeTab === "story" && (
                  <div className="space-y-6">
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
                            <div key={index} className="flex items-start gap-2 min-w-0 flex-1">
                              <span className="text-primary shrink-0">•</span>
                              <span className="flex-1 min-w-0 break-words">{point}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* EXPERTISE TAB VIEW */}
                {activeTab === "expertise" && (
                  <div>
                    <Expertise />
                  </div>
                )}

                {/* STATS & EDUCATION TAB VIEW */}
                {activeTab === "stats" && (
                  <div className="space-y-6">
                    {/* Render Quick Stats Grid */}
                    <QuickStats projectsCount={projectsCount} />

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
                  </div>
                )}
              </>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
