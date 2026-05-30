"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Calendar, BookOpen } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { skillsData } from "@/constants/skills";

export const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Skills", icon: Sparkles },
    ...skillsData.map(group => ({
      id: group.category.toLowerCase(),
      label: group.category,
      icon: group.icon,
    })),
  ];

  const filteredGroups =
    selectedCategory === "all"
      ? skillsData
      : skillsData.filter(group => group.category.toLowerCase() === selectedCategory);

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

        {/* Categories Pills Row */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 bg-muted/20 p-2 rounded-3xl border border-border/20 w-fit mx-auto max-w-full overflow-x-auto no-scrollbar">
          {categories.map(cat => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4.5 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-card/40"
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${isSelected ? "text-primary-foreground" : "text-muted-foreground"}`}
                />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Skill Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredGroups.map((group, groupIdx) => {
              const Icon = group.icon;
              const isSingleCategory = selectedCategory !== "all";

              return (
                <motion.div
                  layout
                  key={group.category}
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -15 }}
                  transition={{ duration: 0.3, delay: groupIdx * 0.05 }}
                  className={isSingleCategory ? "col-span-full max-w-3xl mx-auto w-full" : "h-full"}
                >
                  <Card className="h-full border-border/30 bg-card/30 rounded-2xl glass-card hover:border-primary/25 hover:shadow-xl transition-all duration-300">
                    <div
                      className={
                        isSingleCategory ? "grid md:grid-cols-12 gap-6 p-6" : "flex flex-col h-full"
                      }
                    >
                      {/* Left Pane (Details/Header) */}
                      <div
                        className={
                          isSingleCategory
                            ? "md:col-span-5 flex flex-col justify-between border-b md:border-b-0 md:border-r border-border/10 pb-6 md:pb-0 md:pr-6"
                            : "flex-1 flex flex-col justify-between"
                        }
                      >
                        <div>
                          <CardHeader className={isSingleCategory ? "p-0 pb-4" : "pb-4 shrink-0"}>
                            <div className="flex items-start gap-4">
                              <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20">
                                <Icon className="w-5.5 h-5.5" />
                              </div>
                              <div className="flex-1 space-y-1">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                                  <CardTitle className="text-base font-bold text-foreground">
                                    {group.category}
                                  </CardTitle>

                                  <Badge
                                    variant={group.priority ? "default" : "secondary"}
                                    className="text-[10px] font-bold px-2 py-0.5 rounded-full w-fit tracking-wide uppercase"
                                  >
                                    {group.priority ? (
                                      <span className="flex items-center gap-1">
                                        <Sparkles className="w-2.5 h-2.5 animate-pulse" />
                                        Core Focus
                                      </span>
                                    ) : (
                                      "Secondary"
                                    )}
                                  </Badge>
                                </div>

                                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-primary/80">
                                  <Calendar className="w-3 h-3" />
                                  <span>{group.period}</span>
                                </div>
                              </div>
                            </div>
                          </CardHeader>

                          <div className={isSingleCategory ? "px-0 pb-2" : "px-6 pb-4"}>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {group.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Right Pane (Skills Matrix) */}
                      <div
                        className={
                          isSingleCategory
                            ? "md:col-span-7 flex flex-col justify-center space-y-4 pt-4 md:pt-0"
                            : "px-6 pb-6 pt-0"
                        }
                      >
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-foreground/80 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-primary/70" />
                          <span>Technologies & Concepts</span>
                        </h4>

                        <div className="flex flex-wrap gap-1.5">
                          {group.items.map((item, itemIdx) => (
                            <motion.div
                              key={item}
                              initial={{ opacity: 0, scale: 0.85 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.2, delay: itemIdx * 0.02 }}
                              viewport={{ once: true }}
                              whileHover={{ scale: 1.05 }}
                              className="cursor-default"
                            >
                              <Badge
                                variant="my_primary"
                                className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/5 hover:bg-primary hover:text-primary-foreground border border-primary/20 dark:border-primary/10 transition-colors"
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
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
