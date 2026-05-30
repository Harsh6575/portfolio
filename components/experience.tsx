"use client";

import React from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/section-heading";
import { MapPin, Calendar, Building } from "lucide-react";
import { CompanyLogo } from "./company-logo";
import { experiences } from "@/constants/experience";
import { EXPERIENCE_SUBTITLE } from "@/constants";

export const Experience = () => {
  return (
    <section
      id="experience"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/10 relative overflow-hidden"
    >
      {/* Background visual detail */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-3xl rounded-full -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <SectionHeading title="Professional Experience" subtitle={EXPERIENCE_SUBTITLE} />

        {/* Experience Timeline Container */}
        <div className="relative mt-8">
          {/* Vertical Timeline Glow Line */}
          <div className="absolute left-6 top-2 bottom-2 w-[2px] bg-linear-to-b from-primary via-fuchsia-500 to-border/30 hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative"
              >
                {/* Desktop Circle Node centered on line */}
                <div className="absolute left-[10px] top-6 w-7 h-7 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-lg hidden md:flex z-10 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                </div>

                {/* Experience Card Wrapper */}
                <div className="md:ml-14">
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <Card className="border-border/40 bg-card/45 rounded-2xl glass-card hover:border-primary/25 hover:shadow-[0_12px_40px_-15px_oklch(var(--primary)/0.12)] transition-all duration-300 overflow-hidden">
                      {/* Top Accent Gradient Border */}
                      <div className="h-1 w-full bg-gradient-to-r from-primary/80 to-fuchsia-500/80" />

                      <CardHeader className="pb-4">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          {/* Company Logo and Role Title Info */}
                          <div className="flex items-start gap-4">
                            {/* Glowing Company Logo Box */}
                            <div className="w-12 h-12 rounded-xl bg-card border border-border/40 flex items-center justify-center shrink-0 shadow-xs relative overflow-hidden group">
                              <CompanyLogo
                                src={exp.logo}
                                alt={`${exp.company} logo`}
                                fallback="/400X400.svg"
                              />
                            </div>

                            <div className="space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <CardTitle className="text-lg font-extrabold text-foreground flex items-center gap-1.5 leading-snug">
                                  {exp.role}
                                </CardTitle>

                                <Badge
                                  variant={exp.type === "Full-time" ? "default" : "secondary"}
                                  className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider w-fit"
                                >
                                  {exp.type}
                                </Badge>
                              </div>

                              {/* Company details list metadata */}
                              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-muted-foreground text-xs font-semibold">
                                <div className="flex items-center gap-1">
                                  <Building className="w-3.5 h-3.5 text-primary/80" />
                                  <span className="text-foreground/95 font-bold">
                                    {exp.company}
                                  </span>
                                </div>
                                <span className="hidden sm:inline text-muted-foreground/40">•</span>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3.5 h-3.5" />
                                  <span>{exp.location}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Duration Stamp Label Badge */}
                          <div className="flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full w-fit shrink-0 select-none shadow-inner">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{exp.duration}</span>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="pt-0 space-y-5">
                        {/* Description Bullet Items */}
                        <div className="space-y-2.5">
                          <h4 className="text-[10px] font-bold uppercase tracking-wider text-foreground/80">
                            Key Accomplishments & Responsibilities
                          </h4>
                          <ul className="space-y-2">
                            {exp.description.map((item, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                                viewport={{ once: true }}
                                className="flex items-start gap-2.5 text-muted-foreground"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/80 mt-1.5 shrink-0" />
                                <span className="text-xs sm:text-sm leading-relaxed">{item}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        {/* Reworked Technologies Pill Badges */}
                        <div className="space-y-2 pt-2 border-t border-border/10">
                          <h4 className="text-[10px] font-bold uppercase tracking-wider text-foreground/80">
                            Technologies Deployed
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {exp.technologies.map((tech, idx) => (
                              <motion.span
                                key={idx}
                                whileHover={{ scale: 1.05, y: -1 }}
                                className="px-2.5 py-1 text-[11px] font-bold rounded-md bg-muted/65 hover:bg-primary/10 hover:text-primary border border-border/40 hover:border-primary/30 transition-all text-muted-foreground cursor-default select-none"
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
