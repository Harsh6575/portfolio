"use client";

import Link from "next/link";
import { TechLayerList } from "./tech-layer-list";
import { experiences } from "@/constants/experience";
import { useInView } from "@/hooks/use-in-view";
import type { ProjectSummary } from "@/lib/projects";

type ExperienceEntry = (typeof experiences)[number];

const ExperienceRole = ({
  exp,
  projectTitles,
}: {
  exp: ExperienceEntry;
  projectTitles: Map<string, string>;
}) => {
  const { ref, reveal } = useInView<HTMLElement>();
  const relatedProjects = (exp.relatedProjects ?? [])
    .map(slug => ({ slug, title: projectTitles.get(slug) }))
    .filter((p): p is { slug: string; title: string } => Boolean(p.title));

  return (
    <article ref={ref} className="space-y-4">
      <div {...reveal(0)}>
        <h3 className="text-lead font-semibold">{exp.company}</h3>
        <p className="mt-1 text-small text-muted-foreground tabular-nums">
          {exp.role} · {exp.duration} · {exp.location}
        </p>
      </div>
      <ul {...reveal(1, "space-y-3")}>
        {exp.description.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div {...reveal(2)}>
        <TechLayerList technologies={exp.technologies} />
        {relatedProjects.length > 0 && (
          <p className="mt-2 text-small text-muted-foreground">
            Built here:{" "}
            {relatedProjects.map((p, i) => (
              <span key={p.slug}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="text-foreground underline underline-offset-4 hover:no-underline"
                >
                  {p.title}
                </Link>
                {i < relatedProjects.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        )}
      </div>
    </article>
  );
};

export const Experience = ({ projectSummaries }: { projectSummaries: ProjectSummary[] }) => {
  const projectTitles = new Map(projectSummaries.map(p => [p.slug, p.title]));

  return (
    <section id="experience" className="field-light pb-40">
      <div className="column">
        <h2 className="text-lead font-semibold">Where I&apos;ve worked</h2>
        <div className="mt-8 space-y-24">
          {experiences.map(exp => (
            <ExperienceRole key={exp.company} exp={exp} projectTitles={projectTitles} />
          ))}
        </div>
      </div>
    </section>
  );
};
