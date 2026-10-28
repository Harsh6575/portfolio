"use client";

import { useState } from "react";
import { ProjectLedger } from "@/components/projects/project-ledger";
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
      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-10">
        {filterTabs.map(tab => (
          <button
            key={tab.id}
            type="button"
            aria-pressed={selectedFilter === tab.id}
            onClick={() => setSelectedFilter(tab.id)}
            className={`min-h-11 cursor-pointer underline-offset-[6px] transition-colors ${
              selectedFilter === tab.id
                ? "font-semibold underline"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filteredProjects.length === 0 ? (
        <p className="py-12 text-muted-foreground">
          No projects in this category yet. Try All Projects.
        </p>
      ) : (
        <ProjectLedger projects={filteredProjects} />
      )}
    </div>
  );
};
