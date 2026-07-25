import { getAllProjects } from "@/lib/projects";
import { ProjectsList } from "@/components/projects-list";
import { SectionHeading } from "@/components/section-heading";
import { APP_URL } from "@/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "All projects I've built and want to share: backend systems, full-stack apps, and fintech platforms.",
  alternates: { canonical: `${APP_URL}/projects` },
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-screen">
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading
          title="All Projects"
          subtitle="Every project I've built and want to share, filter by category or browse everything."
          align="left"
        />

        <ProjectsList projects={projects} />
      </div>
    </section>
  );
}
