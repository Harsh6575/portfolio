"use client";

import { useState } from "react";
import Link from "next/link";
import type { Project } from "@/lib/projects";

const yearOf = (date: string) =>
  /present/i.test(date) ? "Now" : (date.match(/\d{4}/g)?.at(-1) ?? "");

export const ProjectLedger = ({ projects }: { projects: Project[] }) => {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div onMouseLeave={() => setHover(null)}>
      <ul className={hover ? "[&>li]:text-muted-foreground" : undefined}>
        {projects.map(project => {
          const isHovered = hover === project.slug;
          return (
            <li key={project.slug} className={`on-view ${isHovered ? "!text-foreground" : ""}`}>
              <Link
                href={`/projects/${project.slug}`}
                onMouseEnter={() => setHover(project.slug)}
                onFocus={() => setHover(project.slug)}
                onBlur={() => setHover(null)}
                className="group grid grid-cols-[1fr_auto] gap-x-4 py-3 transition-colors md:grid-cols-[55fr_35fr_10fr]"
              >
                <span className="font-semibold group-hover:underline underline-offset-4">
                  {project.title}
                </span>
                <span className="col-start-2 row-start-1 text-right text-small tabular-nums md:col-start-3">
                  {yearOf(project.date)}
                </span>
                <span className="text-small md:col-start-2 md:row-start-1">{project.category}</span>
                <span className="col-span-2 mt-1 max-w-[52ch] md:col-span-3">
                  {project.description}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
