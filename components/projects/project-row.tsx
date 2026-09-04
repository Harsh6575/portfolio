import Link from "next/link";
import { ExternalLink, Calendar, ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/projects";
import { groupByLayer } from "@/lib/tech-layers";

export const ProjectRow = ({ project, index }: { project: Project; index: number }) => {
  const layers = groupByLayer(project.technologies);
  const techSummary = layers.map(({ layer, items }) => `${layer}: ${items.join(", ")}`).join(" · ");
  const formattedIndex = String(index + 1).padStart(2, "0");

  return (
    <article className="py-6 md:py-8 md:grid md:grid-cols-[48px_1fr] lg:grid-cols-[56px_1fr] gap-x-6 gap-y-3">
      {/* Desktop Meta rail */}
      <span
        aria-hidden="true"
        className="hidden md:block font-sans text-3xl lg:text-4xl font-black text-accent/40 leading-none select-none tabular-nums tracking-tight"
      >
        {formattedIndex}
      </span>

      {/* Narrative content */}
      <div className="space-y-3 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {/* Mobile Index inline */}
            <span
              aria-hidden="true"
              className="md:hidden font-sans font-black text-xl text-accent/40 tabular-nums shrink-0"
            >
              {formattedIndex}
            </span>

            <Link
              href={`/projects/${project.slug}`}
              className="group inline-block rounded-xs focus-visible:outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]"
            >
              <h3 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                {project.title}
              </h3>
            </Link>
            <Badge
              variant={project.status === "In Progress" ? "secondary" : "default"}
              className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider w-fit"
            >
              {project.status}
            </Badge>
            {project.category && (
              <span className="text-[10px] font-mono text-muted-foreground px-2 py-0.5 rounded-md bg-muted border border-border/50">
                {project.category}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground shrink-0">
            <Calendar className="w-3.5 h-3.5 text-primary/70" />
            <span>{project.date}</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        {techSummary && (
          <p className="text-xs text-muted-foreground/80 font-mono leading-relaxed">
            {techSummary}
          </p>
        )}

        <div className="pt-1 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={
                  link.label ||
                  (link.type === "github"
                    ? `${project.title} source code`
                    : `${project.title} live link`)
                }
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] rounded-xs"
              >
                {link.type === "github" ? (
                  <FaGithub className="w-3.5 h-3.5" />
                ) : (
                  <ExternalLink className="w-3.5 h-3.5" />
                )}
                <span>{link.label || (link.type === "github" ? "Source Code" : "Live Demo")}</span>
              </a>
            ))}
          </div>

          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] rounded-xs group"
          >
            <span>Read case study</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
};
