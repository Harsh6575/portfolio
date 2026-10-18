"use client";

import { useState } from "react";
import { TieredProjectList } from "@/components/projects/tiered-project-list";
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
            type="button"
            aria-pressed={selectedFilter === tab.id}
            onClick={() => setSelectedFilter(tab.id)}
            className={`px-1 pb-3 -mb-px text-xs font-bold transition-colors shrink-0 cursor-pointer border-b-2 mr-6 focus-visible:outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] rounded-xs ${
              selectedFilter === tab.id
                ? "text-foreground border-primary"
                : "text-muted-foreground border-transparent hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filteredProjects.length === 0 ? (
        <p className="py-12 text-sm text-muted-foreground">
          No projects in this category yet. Try All Projects.
        </p>
      ) : (
        <TieredProjectList projects={filteredProjects} className="divide-y divide-border" />
      )}
    </div>
  );
};
