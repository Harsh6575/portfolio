import { ProjectFeature } from "./project-feature";
import { ProjectRow } from "./project-row";
import { tierProjects } from "@/lib/project-tiers";
import type { Project } from "@/lib/projects";

export const TieredProjectList = ({
  projects,
  className,
}: {
  projects: Project[];
  className?: string;
}) => {
  const { primary, secondary, compact } = tierProjects(projects);

  return (
    <div className={className}>
      {primary.map((project, i) => (
        <ProjectFeature key={project.slug} project={project} variant="primary" index={i} />
      ))}
      {secondary.map((project, i) => (
        <ProjectFeature
          key={project.slug}
          project={project}
          variant="secondary"
          index={primary.length + i}
        />
      ))}
      {compact.map((project, i) => (
        <ProjectRow
          key={project.slug}
          project={project}
          index={primary.length + secondary.length + i}
        />
      ))}
    </div>
  );
};
