"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import {
  Download,
  GraduationCap,
  Server,
  Layout,
  Database,
  CheckCircle2,
  Layers,
} from "lucide-react";
import Image from "next/image";
import {
  TOTAL_EXPERIENCE,
  ABOUT_BIO,
  RESUME_URL,
  APP_NAME,
  APP_TITLE,
  EDUCATION,
} from "@/constants";
import { useInView } from "@/hooks/use-in-view";

const CORE_STACK_TAGS = [
  "Node.js",
  "PostgreSQL",
  "Next.js",
  "TypeScript",
  "Python",
  "Redis",
  "FastAPI",
  "Docker",
];

const DOMAINS = [
  {
    icon: Server,
    title: "Backend Architecture & APIs",
    description:
      "Engineering resilient, high-throughput backend services in Node.js, Express, FastAPI, and Django. Implementing BullMQ task queues, Redis caching, and robust REST & GraphQL endpoints.",
    tags: ["Node.js", "FastAPI", "Redis", "BullMQ", "REST/GraphQL"],
  },
  {
    icon: Layout,
    title: "Frontend Engineering",
    description:
      "Building responsive, type-safe web applications using Next.js (App Router), React, TypeScript, and Tailwind CSS with custom state management and accessible design systems.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zustand"],
  },
  {
    icon: Database,
    title: "Data Systems & Infrastructure",
    description:
      "Designing clean relational and document schemas in PostgreSQL and MongoDB, optimizing queries and indexes, and deploying containerized microservices with Docker.",
    tags: ["PostgreSQL", "MongoDB", "Prisma", "Docker", "Turborepo"],
  },
];

const PRINCIPLES = [
  "End-to-End Type Safety",
  "Schema-First Design",
  "Sub-millisecond Caching",
  "Resilient Async Workflows",
  "Clean Domain Boundaries",
];

export const About = () => {
  const { ref, isInView } = useInView<HTMLDivElement>();

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
          subtitle="Engineering background, architectural principles, and what I build"
          align="left"
        />

        <div
          ref={ref}
          className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-8 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Left Column: Identity, Capabilities & Background Card */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="border-border/70 bg-card/60 rounded-3xl p-6 shadow-sm overflow-hidden relative">
              <div className="flex flex-col items-center text-center space-y-5">
                {/* Avatar (Clean - without dot) */}
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-muted/60 flex items-center justify-center border border-border/80 overflow-hidden shadow-inner">
                  <Image
                    src="/hv-logo.svg"
                    alt={APP_NAME}
                    className="w-16 h-16 sm:w-18 sm:h-18 opacity-95 dark:invert"
                    height={72}
                    width={72}
                    unoptimized
                  />
                </div>

                {/* Name & Title */}
                <div>
                  <h3 className="text-lg font-bold text-foreground">{APP_NAME}</h3>
                  <p className="text-xs font-mono text-muted-foreground mt-0.5">{APP_TITLE}</p>
                  <p className="text-[11px] font-mono text-primary/80 mt-1">
                    India · Remote & Hybrid
                  </p>
                </div>

                {/* Scope of Ownership & Core Stack (Option B + C) */}
                <div className="w-full text-left p-3.5 rounded-2xl bg-muted/30 border border-border/50 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                    <Layers className="w-3.5 h-3.5 text-primary" />
                    <span>Full Lifecycle Ownership</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Database Schemas · Resilient APIs · Responsive UI
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {CORE_STACK_TAGS.map(tag => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-background/80 border border-border/60 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Education Box */}
                {EDUCATION.map((edu, idx) => (
                  <div
                    key={idx}
                    className="w-full text-left p-3.5 rounded-xl bg-muted/30 border border-border/50 space-y-1"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                      <GraduationCap className="w-3.5 h-3.5 text-primary" />
                      <span>{edu.degree}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      {edu.institution} · <span className="font-mono">{edu.duration}</span>
                    </p>
                  </div>
                ))}

                {/* Resume Download CTA */}
                <div className="w-full pt-1">
                  <Button
                    className="w-full rounded-full text-xs font-semibold py-3.5 h-auto cursor-pointer group"
                    asChild
                  >
                    <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                      <Download className="w-4 h-4 mr-2 transition-transform group-hover:translate-y-0.5" />
                      Download Resume
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Narrative & Engineering Focus */}
          <div className="lg:col-span-8 space-y-8">
            {/* Narrative Story */}
            <div className="space-y-4">
              <p className="text-base sm:text-lg text-foreground/95 leading-relaxed font-medium">
                {ABOUT_BIO.intro.replace("{TOTAL_EXPERIENCE}", TOTAL_EXPERIENCE.toString())}
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {ABOUT_BIO.experience}
              </p>
            </div>

            {/* Core Engineering Domains */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                Core Engineering Domains
              </h4>

              <div className="grid gap-3.5">
                {DOMAINS.map((domain, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-border/60 bg-card/40 hover:border-border transition-colors duration-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-xl bg-muted text-primary border border-border/60 shrink-0 mt-0.5">
                        <domain.icon className="w-4 h-4" />
                      </div>
                      <div className="space-y-2 flex-1 min-w-0">
                        <h5 className="text-sm font-bold text-foreground">{domain.title}</h5>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {domain.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {domain.tags.map(tag => (
                            <span
                              key={tag}
                              className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-muted/60 border border-border/50 text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Principles Badges */}
            <div className="pt-2">
              <div className="flex flex-wrap items-center gap-2">
                {PRINCIPLES.map((principle, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold bg-muted/50 border border-border/60 text-foreground/80"
                  >
                    <CheckCircle2 className="w-3 h-3 text-primary" />
                    {principle}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
