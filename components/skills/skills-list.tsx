"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Folder } from "lucide-react";
import { skillsData } from "@/constants/skills";
import { buildSkillProjectIndex, normalizeTech } from "@/lib/skill-project-map";
import type { ProjectTechRef } from "@/lib/projects";
import { useInView } from "@/hooks/use-in-view";

function panelId(category: string, item: string) {
  return `skill-panel-${category}-${item}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export const SkillsList = ({ projectRefs }: { projectRefs: ProjectTechRef[] }) => {
  const skillProjectIndex = useMemo(() => buildSkillProjectIndex(projectRefs), [projectRefs]);
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`border-t border-b border-border divide-y divide-border transition-all duration-700 ease-out motion-reduce:transition-none ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {skillsData.map(group => (
        <SkillDomainRow
          key={group.category}
          group={group}
          skillProjectIndex={skillProjectIndex}
          variant={group.priority ? "primary" : "supporting"}
        />
      ))}
    </div>
  );
};

type SkillGroup = (typeof skillsData)[number];

function SkillDomainRow({
  group,
  skillProjectIndex,
  variant,
}: {
  group: SkillGroup;
  skillProjectIndex: Map<string, { slug: string; title: string }[]>;
  variant: "primary" | "supporting";
}) {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const Icon = group.icon;
  const isPrimary = variant === "primary";

  // Evidenced items (real project matches) surface first — that's the real
  // signal doing the hierarchy work, not an arbitrary curation choice.
  const items = useMemo(() => {
    const evidenced: string[] = [];
    const plain: string[] = [];
    for (const item of group.items) {
      if (skillProjectIndex.get(normalizeTech(item))?.length) evidenced.push(item);
      else plain.push(item);
    }
    return [...evidenced, ...plain];
  }, [group.items, skillProjectIndex]);

  const activeMatches = activeItem ? skillProjectIndex.get(normalizeTech(activeItem)) : undefined;

  return (
    <article className={isPrimary ? "py-8" : "py-5"}>
      <div className="flex items-start gap-3.5">
        <div
          className={`shrink-0 flex items-center justify-center rounded-lg border border-border ${
            isPrimary ? "p-2.5 bg-muted text-foreground" : "p-2 bg-muted/40 text-muted-foreground"
          }`}
        >
          <Icon className={isPrimary ? "w-5 h-5" : "w-4 h-4"} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
            <h3
              className={`font-extrabold text-foreground ${isPrimary ? "text-lg sm:text-xl" : "text-sm"}`}
            >
              {group.category}
            </h3>
            <span className="font-mono text-[10px] text-muted-foreground">{group.period}</span>
          </div>

          <p
            className={`mt-1 text-muted-foreground leading-relaxed ${
              isPrimary ? "text-sm" : "text-xs line-clamp-1"
            }`}
          >
            {group.description}
          </p>

          <p
            className={`leading-relaxed ${isPrimary ? "mt-3 text-sm sm:text-[15px]" : "mt-1.5 text-xs sm:text-sm"}`}
          >
            {items.map((item, idx) => {
              const matches = skillProjectIndex.get(normalizeTech(item));
              const isActive = activeItem === item;
              const separator = idx < items.length - 1 ? " · " : "";

              if (!matches?.length) {
                return (
                  <span key={item} className="text-muted-foreground/70">
                    {item}
                    {separator}
                  </span>
                );
              }

              const id = panelId(group.category, item);

              return (
                <span key={item}>
                  <button
                    type="button"
                    aria-expanded={isActive}
                    aria-controls={id}
                    onClick={() => setActiveItem(isActive ? null : item)}
                    onKeyDown={e => {
                      if (e.key === "Escape" && isActive) setActiveItem(null);
                    }}
                    className="font-semibold text-foreground underline decoration-dotted decoration-muted-foreground/50 underline-offset-4 hover:text-primary hover:decoration-primary transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] rounded-xs"
                  >
                    {item}
                  </button>
                  {separator}
                </span>
              );
            })}
          </p>

          {activeItem && activeMatches?.length ? (
            <div
              id={panelId(group.category, activeItem)}
              className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground"
            >
              <Folder className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
              <p>
                Used in:{" "}
                {activeMatches.map((project, idx) => (
                  <span key={project.slug}>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] rounded-xs"
                    >
                      {project.title}
                    </Link>
                    {idx < activeMatches.length - 1 ? " · " : ""}
                  </span>
                ))}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
