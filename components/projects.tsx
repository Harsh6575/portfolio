"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { ExternalLink, Calendar, Star, ChevronDown, ChevronUp } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { projectsData } from "@/constants/projects";

type ProjectCategory = "all" | "backend" | "fullstack" | "fintech";

export const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState<ProjectCategory>("all");
  const [expandedProjects, setExpandedProjects] = useState<Record<number, boolean>>({});

  const filterTabs = [
    { id: "all", label: "All Projects" },
    { id: "backend", label: "Backend Systems" },
    { id: "fullstack", label: "Full Stack" },
    { id: "fintech", label: "FinTech" },
  ];

  const toggleExpand = (index: number) => {
    setExpandedProjects(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getFilteredProjects = () => {
    if (selectedFilter === "all") return projectsData;

    return projectsData.filter(project => {
      const cat = project.category.toLowerCase().replace("-", "").trim();
      if (selectedFilter === "fullstack") {
        return cat === "fullstack" || cat === "full stack";
      }
      return cat === selectedFilter;
    });
  };

  const filteredProjects = getFilteredProjects();

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <SectionHeading
          index="04 — Projects"
          title="Featured Projects"
          subtitle="A showcase of systems I have built, ranging from high-performance backend APIs and database designs to algorithmic stock market platforms."
          align="left"
        />

        {/* Filter categories tabs controller */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-border">
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id as ProjectCategory)}
              className={`px-1 pb-3 -mb-px text-xs font-bold transition-colors shrink-0 cursor-pointer border-b-2 mr-6 ${
                selectedFilter === tab.id
                  ? "text-foreground border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <motion.div layout className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const isExpanded = !!expandedProjects[index];
              const displayFeatures = isExpanded ? project.features : project.features.slice(0, 3);
              const hasMoreFeatures = project.features.length > 3;

              return (
                <motion.div
                  layout
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="h-full"
                >
                  <Card className="h-full flex flex-col border-border bg-card rounded-2xl hover:border-primary/30 transition-all duration-300 group p-0 overflow-hidden">
                    <CardHeader className="pt-6 pb-4">
                      <div className="flex items-start justify-between gap-4">
                        <CardTitle className="text-lg font-extrabold text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </CardTitle>

                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground bg-muted px-2.5 py-1 rounded-md shrink-0 font-mono">
                          <Calendar className="w-3 h-3 text-primary" />
                          <span>{project.date}</span>
                        </div>
                      </div>

                      {/* Project status metadata tags row */}
                      <div className="flex flex-wrap gap-1.5 mt-2.5 select-none">
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border border-border text-muted-foreground bg-muted/60">
                          {project.category}
                        </span>
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${
                            project.status === "In Progress"
                              ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                              : "bg-primary/10 text-primary border-primary/20"
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>

                      {/* Brief tagline description */}
                      <CardDescription className="mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                        {project.description}
                      </CardDescription>
                    </CardHeader>

                    {/* Features, technologies & CTA links */}
                    <CardContent className="px-6 pb-6 space-y-6 flex-1 flex flex-col justify-between">
                      {/* Interactive expandable Key accomplishments list */}
                      <div className="space-y-2.5">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-foreground/80">
                          Key Accomplishments
                        </h4>

                        <motion.ul layout className="space-y-2">
                          <AnimatePresence initial={false}>
                            {displayFeatures.map((feature: string, idx: number) => (
                              <motion.li
                                layout
                                key={idx}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -8 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-start gap-2.5 text-xs text-muted-foreground"
                              >
                                <Star className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                                <span className="leading-normal">{feature}</span>
                              </motion.li>
                            ))}
                          </AnimatePresence>
                        </motion.ul>

                        {/* Read more accomplishments expander button */}
                        {hasMoreFeatures && (
                          <button
                            onClick={() => toggleExpand(index)}
                            className="flex items-center gap-1 text-[10px] font-extrabold text-primary hover:text-primary-foreground hover:bg-primary px-2.5 py-1 rounded-full border border-primary/20 bg-primary/5 transition-all mt-1 cursor-pointer select-none"
                          >
                            {isExpanded ? (
                              <>
                                <span>Collapse Details</span>
                                <ChevronUp className="w-3 h-3" />
                              </>
                            ) : (
                              <>
                                <span>Show All Features ({project.features.length})</span>
                                <ChevronDown className="w-3 h-3" />
                              </>
                            )}
                          </button>
                        )}
                      </div>

                      {/* Bottom row tech stack and redirect links */}
                      <div className="space-y-4 pt-4 border-t border-border">
                        {/* Technologies Tags */}
                        <div>
                          <h4 className="text-[10px] font-bold uppercase tracking-wider text-foreground/80 mb-2">
                            Technologies Used
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {project.technologies.map((tech: string, idx: number) => (
                              <span
                                key={idx}
                                className="text-[10px] font-bold rounded-md bg-muted hover:bg-primary/10 hover:text-primary border border-border hover:border-primary/20 transition-all text-muted-foreground select-none px-2.5 py-1"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Actions External Buttons Links */}
                        {project.links && project.links.length > 0 && (
                          <div className="flex flex-wrap gap-2.5 pt-1.5">
                            {project.links.map((link, idx) => (
                              <a
                                key={idx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-1.5 rounded-full text-xs font-semibold px-4.5 py-2.5 cursor-pointer shadow-xs border transition-all duration-200 select-none ${
                                  link.type === "github"
                                    ? "bg-muted border-border text-foreground hover:bg-accent"
                                    : "bg-primary border-primary text-primary-foreground hover:bg-primary/90"
                                }`}
                              >
                                {link.type === "github" ? (
                                  <>
                                    <FaGithub className="w-4 h-4" />
                                    <span>{link.label || "Source Code"}</span>
                                  </>
                                ) : (
                                  <>
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    <span>{link.label || "Live"}</span>
                                  </>
                                )}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
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
