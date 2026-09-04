import Link from "next/link";
import { ExternalLink, Calendar, ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/projects";
import { TechLayerList } from "@/components/tech-layer-list";
import { buildExperienceByProjectSlug } from "@/lib/experience-project-map";
import { experiences } from "@/constants/experience";

const experienceBySlug = buildExperienceByProjectSlug(experiences);

function statusCaption(status: string) {
  if (status === "Professional Project") return "Closed-source · professional project";
  if (status === "In Progress") return "In development · not yet public";
  return "No public link available";
}

export const ProjectFeature = ({
  project,
  variant = "primary",
  index,
}: {
  project: Project;
  variant?: "primary" | "secondary";
  index: number;
}) => {
  const isPrimary = variant === "primary";
  const curatedFeatures = project.features.slice(0, isPrimary ? 3 : 2);
  const relatedExperience = experienceBySlug.get(project.slug);
  const formattedIndex = String(index + 1).padStart(2, "0");

  return (
    <article className="py-8 md:py-10 md:grid md:grid-cols-[48px_1fr] lg:grid-cols-[56px_1fr] gap-x-6 gap-y-4">
      {/* Desktop Meta rail */}
      <span
        aria-hidden="true"
        className="hidden md:block font-sans text-3xl lg:text-4xl font-black text-accent/40 leading-none select-none tabular-nums tracking-tight"
      >
        {formattedIndex}
      </span>

      {/* Narrative content (takes full width on mobile/tablet) */}
      <div className="space-y-4 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
          <div className="space-y-1">
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
                <h3 className="text-base sm:text-lg lg:text-xl font-extrabold text-foreground group-hover:text-primary transition-colors leading-snug">
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

            {relatedExperience && (
              <p className="text-xs text-muted-foreground font-semibold">
                {relatedExperience.company === "Self Employed"
                  ? "Self-employed project"
                  : `Engineered while at ${relatedExperience.company}`}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground shrink-0">
            <Calendar className="w-3.5 h-3.5 text-primary/70" />
            <span>{project.date}</span>
          </div>
        </div>

        {/* Pull-quote */}
        <p className="border-l-2 border-accent pl-4 text-xs sm:text-sm text-foreground font-medium leading-relaxed">
          {project.description}
        </p>

        {curatedFeatures.length > 0 && (
          <ul className="space-y-1.5 pl-1">
            {curatedFeatures.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="w-1 h-1 rounded-full bg-muted-foreground/50 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <TechLayerList technologies={project.technologies} className="pt-1" />

        {/* Action Links row */}
        <div className="pt-1 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {project.links.length === 0 ? (
              <span className="text-xs text-muted-foreground/70 italic">
                {statusCaption(project.status)}
              </span>
            ) : (
              project.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] rounded-xs"
                >
                  {link.type === "github" ? (
                    <FaGithub className="w-3.5 h-3.5" />
                  ) : (
                    <ExternalLink className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {link.label || (link.type === "github" ? "Source Code" : "Live Demo")}
                  </span>
                </a>
              ))
            )}
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
