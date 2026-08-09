import Link from "next/link";
import { ChevronRight, ExternalLink, Calendar } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import type { Project } from "@/lib/projects";
import { groupByLayer } from "@/lib/tech-layers";

export const ProjectRow = ({ project, index }: { project: Project; index: number }) => {
  const layers = groupByLayer(project.technologies);
  const techSummary = layers.map(({ layer, items }) => `${layer}: ${items.join(", ")}`).join(" · ");

  return (
    <article className="py-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 flex-wrap">
          <span
            aria-hidden="true"
            className="font-mono text-base font-bold text-foreground/20 leading-none select-none"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <Link
            href={`/projects/${project.slug}`}
            className="group inline-flex items-center gap-1 rounded-xs focus-visible:outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          >
            <span className="font-bold text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-focus-within:opacity-100 group-focus-within:translate-x-0 transition-all duration-200 motion-reduce:transition-none" />
          </Link>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
            {project.status}
          </span>
          <span className="text-[10px] font-mono text-muted-foreground/70 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {project.date}
          </span>
        </div>

        <p className="mt-1 text-sm text-muted-foreground leading-relaxed line-clamp-1">
          {project.description}
        </p>

        {techSummary && (
          <p className="mt-1 text-xs text-muted-foreground/80 leading-relaxed">{techSummary}</p>
        )}
      </div>

      {project.links.length > 0 && (
        <div className="flex items-center gap-1 shrink-0">
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
              className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] rounded-xs p-1.5"
            >
              {link.type === "github" ? (
                <FaGithub className="w-4 h-4" />
              ) : (
                <ExternalLink className="w-4 h-4" />
              )}
            </a>
          ))}
        </div>
      )}
    </article>
  );
};
