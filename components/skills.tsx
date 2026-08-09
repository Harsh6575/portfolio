import React from "react";
import { SectionHeading } from "./section-heading";
import { SkillsList } from "./skills/skills-list";
import type { Project } from "@/lib/projects";

export const Skills = ({ projects }: { projects: Project[] }) => {
  const projectRefs = projects.map(({ slug, title, technologies }) => ({
    slug,
    title,
    technologies,
  }));

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
          subtitle="My technical capabilities organized by category - from core backend specialization to cloud architectures and frontend integrations. Tap a technology to see it in action."
          align="left"
        />

        <SkillsList projectRefs={projectRefs} />
      </div>
    </section>
  );
};
