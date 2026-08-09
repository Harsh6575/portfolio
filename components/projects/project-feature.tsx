import Link from "next/link";
import { ExternalLink, Calendar } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
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

  return (
    <article className="py-8">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10px] font-bold uppercase tracking-wider font-mono">
        <span className="text-muted-foreground">{project.category}</span>
        <span className="text-muted-foreground/40">·</span>
        <span
          className={
            project.status === "In Progress" ? "text-blue-600 dark:text-blue-400" : "text-primary"
          }
        >
          {project.status}
        </span>
        <span className="text-muted-foreground/70 ml-auto normal-case font-sans font-semibold flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {project.date}
        </span>
      </div>

      <div className="flex items-baseline gap-3 mt-3">
        <span
          aria-hidden="true"
          className={`font-mono font-bold text-foreground/20 leading-none select-none ${
            isPrimary ? "text-2xl sm:text-3xl" : "text-xl"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <Link
          href={`/projects/${project.slug}`}
          className="group inline-block rounded-xs focus-visible:outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]"
        >
          <h3
            className={`font-extrabold text-foreground group-hover:text-primary transition-colors ${
              isPrimary ? "text-2xl sm:text-3xl" : "text-xl"
            }`}
          >
            {project.title}
          </h3>
        </Link>
      </div>

      <p
        className={`mt-2 text-muted-foreground leading-relaxed ${
          isPrimary ? "text-sm sm:text-base max-w-2xl" : "text-sm max-w-xl"
        }`}
      >
        {project.description}
      </p>

      {curatedFeatures.length > 0 && (
        <ul className="mt-4 space-y-1.5">
          {curatedFeatures.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground"
            >
              <span className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
              <span className="leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      )}

      <TechLayerList technologies={project.technologies} className="mt-4" />

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        {relatedExperience && (
          <span className="text-xs text-muted-foreground">
            {relatedExperience.company === "Self Employed"
              ? "Self-employed project"
              : `Built while at ${relatedExperience.company}`}
          </span>
        )}

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
              <span>{link.label || (link.type === "github" ? "Source Code" : "Live")}</span>
            </a>
          ))
        )}

        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] rounded-xs ml-auto"
        >
          Read the case study →
        </Link>
      </div>
    </article>
  );
};
