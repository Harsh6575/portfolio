"use client";

import Link from "next/link";
import { ProjectLedger } from "@/components/projects/project-ledger";
import type { Project } from "@/lib/projects";
import { useInView } from "@/hooks/use-in-view";

export const Projects = ({ projects }: { projects: Project[] }) => {
  const { ref, reveal } = useInView<HTMLDivElement>();

  return (
    <section id="projects" className="field-light pb-40">
      <div ref={ref} className="column">
        <h2 {...reveal(0, "text-lead font-semibold")}>Things I&apos;ve built</h2>
        <div className="mt-8">
          <ProjectLedger projects={projects} />
        </div>
        <Link
          href="/projects"
          {...reveal(
            2,
            "mt-10 inline-block font-semibold underline underline-offset-4 hover:no-underline",
          )}
        >
          All projects, with filters
        </Link>
      </div>
    </section>
  );
};
