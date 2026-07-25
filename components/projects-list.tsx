"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/lib/projects";

type ProjectCategory = "all" | "backend" | "fullstack" | "fintech";

const filterTabs: { id: ProjectCategory; label: string }[] = [
  { id: "all", label: "All Projects" },
  { id: "backend", label: "Backend Systems" },
  { id: "fullstack", label: "Full Stack" },
  { id: "fintech", label: "FinTech" },
];

export const ProjectsList = ({ projects }: { projects: Project[] }) => {
  const [selectedFilter, setSelectedFilter] = useState<ProjectCategory>("all");

  const filteredProjects =
    selectedFilter === "all"
      ? projects
      : projects.filter(project => {
          const cat = project.category.toLowerCase().replace("-", "").trim();
          if (selectedFilter === "fullstack") {
            return cat === "fullstack" || cat === "full stack";
          }
          return cat === selectedFilter;
        });

  return (
    <div>
      {/* Filter categories tabs controller */}
      <div className="flex flex-wrap gap-2 mb-12 border-b border-border">
        {filterTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelectedFilter(tab.id)}
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
          {filteredProjects.map(project => (
            <motion.div
              layout
              key={project.slug}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
