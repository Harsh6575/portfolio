"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/section-heading";
import { MapPin, Calendar, Building } from "lucide-react";
import { CompanyLogo } from "./company-logo";
import { TechLayerList } from "./tech-layer-list";
import { experiences } from "@/constants/experience";
import { EXPERIENCE_SUBTITLE } from "@/constants";
import { useInView } from "@/hooks/use-in-view";
import type { ProjectSummary } from "@/lib/projects";

type ExperienceEntry = (typeof experiences)[number];

const ExperienceRow = ({
  exp,
  index,
  projectTitles,
}: {
  exp: ExperienceEntry;
  index: number;
  projectTitles: Map<string, string>;
}) => {
  const { ref, isInView } = useInView<HTMLDivElement>();
  const highlightIndex = exp.highlight ?? 0;
  const highlight = exp.description[highlightIndex];
  const supporting = exp.description.filter((_, i) => i !== highlightIndex);
  const relatedProjects = (exp.relatedProjects ?? [])
    .map(slug => ({ slug, title: projectTitles.get(slug) }))
    .filter((p): p is { slug: string; title: string } => Boolean(p.title));

  const formattedIndex = String(index + 1).padStart(2, "0");

  return (
    <article
      ref={ref}
      className={`py-8 md:py-10 md:grid md:grid-cols-[48px_1fr] lg:grid-cols-[56px_1fr] gap-x-6 gap-y-4 transition-all duration-700 ease-out motion-reduce:transition-none ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Desktop Meta rail */}
      <span
        aria-hidden="true"
        className="hidden md:block font-sans text-3xl lg:text-4xl font-black text-accent/40 leading-none select-none tabular-nums tracking-tight"
      >
        {formattedIndex}
      </span>

      {/* Narrative content (takes full width on mobile/tablet) */}
      <div className="space-y-4 min-w-0">
        <div className="flex flex-col gap-2.5">
          {/* Row 1: Index + Logo + Role */}
          <div className="flex items-start gap-3">
            {/* Mobile Index inline */}
            <span
              aria-hidden="true"
              className="md:hidden font-sans font-black text-xl text-accent/40 tabular-nums shrink-0 mt-0.5"
            >
              {formattedIndex}
            </span>

            <div className="w-10 h-10 rounded-xl bg-white border border-border/40 flex items-center justify-center shrink-0 shadow-xs overflow-hidden p-1.5">
              <CompanyLogo src={exp.logo} alt={`${exp.company} logo`} fallback="/hv-logo.svg" />
            </div>

            <div className="space-y-1 min-w-0 flex-1">
              <h3 className="text-base sm:text-lg font-extrabold text-foreground leading-snug">
                {exp.role}
              </h3>

              {/* Row 2: Company · Location */}
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-muted-foreground text-xs font-semibold">
                <div className="flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-primary/80" />
                  <span className="text-foreground/95 font-bold">{exp.company}</span>
                </div>
                <span className="text-muted-foreground/40">•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{exp.location}</span>
                </div>
              </div>

              {/* Row 3: Badge + Date — always inline, no offset hack */}
              <div className="flex flex-wrap items-center gap-3">
                <Badge
                  variant={exp.type === "Full-time" ? "default" : "secondary"}
                  className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider w-fit"
                >
                  {exp.type}
                </Badge>
                <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5 text-primary/70" />
                  <span>{exp.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pull-quote */}
        <p className="border-l-2 border-accent pl-4 text-xs sm:text-sm text-foreground font-medium leading-relaxed">
          {highlight}
        </p>

        {supporting.length > 0 && (
          <ul className="space-y-1.5 pl-1">
            {supporting.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="w-1 h-1 rounded-full bg-muted-foreground/50 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        )}

        <TechLayerList technologies={exp.technologies} className="pt-1" />

        {relatedProjects.length > 0 && (
          <p className="text-xs text-muted-foreground">
            Related work:{" "}
            {relatedProjects.map((p, idx) => (
              <span key={p.slug}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] rounded-xs"
                >
                  {p.title}
                </Link>
                {idx < relatedProjects.length - 1 ? ", " : ""}
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
    <section
      id="experience"
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading
          index="03 — Experience"
          title="Professional Experience"
          subtitle={EXPERIENCE_SUBTITLE}
          align="left"
        />

        <div className="border-t border-border divide-y divide-border">
          {experiences.map((exp, index) => (
            <ExperienceRow key={index} exp={exp} index={index} projectTitles={projectTitles} />
          ))}
        </div>
      </div>
    </section>
  );
};
