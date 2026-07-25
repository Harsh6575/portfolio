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
    <section
      id="skills"
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <SectionHeading
          index="02 — Skills"
          title="Skills & Expertise"
          subtitle="My technical capabilities organized by category - from core backend specialization to cloud architectures and frontend integrations."
          align="left"
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
                  className={`w-full rounded-2xl transition-all duration-300 relative overflow-hidden flex flex-col p-0 ${
                    group.priority
                      ? "border-primary/40 hover:border-primary/70"
                      : "border-border hover:border-primary/25"
                  }`}
                >
                  <div className="p-6 flex flex-col flex-1 justify-start gap-6">
                    <div className="space-y-4">
                      {/* Card Header */}
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-3 rounded-xl border shrink-0 flex items-center justify-center ${
                            group.priority
                              ? "bg-muted text-foreground border-border"
                              : "bg-muted/40 text-muted-foreground border-border/10"
                          }`}
                        >
                          <Icon
                            className={`w-5.5 h-5.5 ${group.priority ? "text-foreground" : "text-muted-foreground/80"}`}
                          />
                        </div>

                        <div className="space-y-0.5 min-w-0 flex-1">
                          <CardTitle className="text-base font-extrabold text-foreground tracking-wide truncate">
                            {group.category}
                          </CardTitle>

                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground font-mono">
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
                    <div className="space-y-3 pt-4 border-t border-border">
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
