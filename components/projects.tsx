import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import { AnimatedCard } from "@/components/animated-card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/lib/projects";

const HOMEPAGE_PROJECT_COUNT = 4;

export const Projects = ({ projects }: { projects: Project[] }) => {
  const featuredProjects = projects.slice(0, HOMEPAGE_PROJECT_COUNT);

  return (
    <section
      id="projects"
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <SectionHeading
          index="04 — Projects"
          title="Featured Projects"
          subtitle="A showcase of systems I have built, ranging from high-performance backend APIs and database designs to algorithmic stock market platforms."
          align="left"
        />

        {/* Projects Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {featuredProjects.map((project, index) => (
            <AnimatedCard key={project.slug} index={index}>
              <ProjectCard project={project} />
            </AnimatedCard>
          ))}
        </div>

        {/* View All Projects link */}
        <div className="flex justify-center mt-12">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-full text-sm font-semibold px-6 py-3 border border-border hover:border-foreground/30 hover:bg-muted transition-all"
          >
            View All Projects
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};
