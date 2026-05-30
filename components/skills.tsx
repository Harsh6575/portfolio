"use client";

import React from "react";
import { motion } from "motion/react";
import { Calendar, BookOpen } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Card, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { skillsData } from "@/constants/skills";

export const Skills = () => {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-12 right-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <SectionHeading
          title="Skills & Expertise"
          subtitle="My technical capabilities organized by category - from core backend specialization to cloud architectures and frontend integrations."
        />

        {/* 3x2 / 2x3 Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {skillsData.map((group, groupIdx) => {
            const Icon = group.icon;

            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, delay: groupIdx * 0.08 }}
                viewport={{ once: true }}
                className="h-full flex"
              >
                <Card
                  className={`w-full rounded-2xl glass-card transition-all duration-300 relative overflow-hidden flex flex-col p-0 ${
                    group.priority
                      ? "border-primary/50 dark:border-primary/40 bg-gradient-to-b from-primary/[0.06] to-slate-950/20 dark:from-primary/[0.04] dark:to-card/25 shadow-[0_0_25px_-5px_oklch(var(--primary)/0.18)] hover:border-primary hover:shadow-[0_0_30px_-3px_oklch(var(--primary)/0.28)]"
                      : "border-slate-800/80 dark:border-white/5 bg-slate-950/20 dark:bg-card/25 hover:border-primary/20 hover:shadow-xl"
                  }`}
                >
                  {/* Glowing Top Accent Pill for Core Focus/Primary Skills */}
                  {group.priority && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[3px] bg-gradient-to-r from-primary to-fuchsia-500 rounded-b-full shadow-[0_1px_10px_oklch(var(--primary)/0.4)]" />
                  )}

                  <div className="p-6 flex flex-col flex-1 justify-start gap-6">
                    <div className="space-y-4">
                      {/* Card Header */}
                      <div className="flex items-start gap-4">
                        {/* Glowing Icon Frame */}
                        <div
                          className={`p-3 rounded-xl border shrink-0 relative overflow-hidden flex items-center justify-center ${
                            group.priority
                              ? "bg-primary/10 text-primary border-primary/30 shadow-[0_0_15px_-3px_oklch(var(--primary)/0.3)]"
                              : "bg-muted/40 text-muted-foreground border-border/10"
                          }`}
                        >
                          {group.priority && (
                            <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                          )}
                          <Icon
                            className={`w-5.5 h-5.5 relative z-10 ${group.priority ? "text-primary" : "text-muted-foreground/80"}`}
                          />
                        </div>

                        <div className="space-y-0.5 min-w-0 flex-1">
                          <CardTitle className="text-base font-extrabold text-foreground tracking-wide truncate">
                            {group.category}
                          </CardTitle>

                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-primary/80">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{group.period}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Description */}
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {group.description}
                      </p>
                    </div>

                    {/* Bottom Technologies Badge Grid */}
                    <div className="space-y-3 pt-4 border-t border-slate-800/60 dark:border-white/5">
                      <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-foreground/80 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-primary/70" />
                        <span>Technologies & Concepts</span>
                      </h4>

                      <div className="flex flex-wrap gap-1.5">
                        {group.items.map(item => (
                          <motion.div
                            key={item}
                            whileHover={{ scale: 1.05, y: -1 }}
                            className="cursor-default select-none"
                          >
                            <Badge
                              variant="my_primary"
                              className="text-xs font-bold px-2.5 py-1 rounded-md bg-muted/65 hover:bg-primary hover:text-primary-foreground border border-border/40 hover:border-primary/30 transition-all text-muted-foreground"
                            >
                              {item}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
