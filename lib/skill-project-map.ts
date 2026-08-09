import type { ProjectTechRef } from "@/lib/projects";

export type SkillProjectRef = { slug: string; title: string };

export function normalizeTech(name: string) {
  return name.trim().toLowerCase();
}

export function buildSkillProjectIndex(projects: ProjectTechRef[]): Map<string, SkillProjectRef[]> {
  const index = new Map<string, SkillProjectRef[]>();

  for (const project of projects) {
    for (const tech of project.technologies) {
      const key = normalizeTech(tech);
      const list = index.get(key) ?? [];
      list.push({ slug: project.slug, title: project.title });
      index.set(key, list);
    }
  }

  return index;
}
