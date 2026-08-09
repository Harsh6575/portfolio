import type { Project } from "@/lib/projects";

// Hand-picked by engineering depth, complexity, and how much real storytelling
// content each project has — not derived mechanically from `status`.
export const PRIMARY_SLUGS = ["tailor-track", "algorithmic-trading-platform", "shortify"];
export const SECONDARY_SLUGS = ["hotel-reservation-platform"];

export function tierProjects(projects: Project[]) {
  const bySlug = new Map(projects.map(p => [p.slug, p]));
  const pickBySlug = (slugs: string[]) =>
    slugs.map(slug => bySlug.get(slug)).filter((p): p is Project => Boolean(p));

  const primary = pickBySlug(PRIMARY_SLUGS);
  const secondary = pickBySlug(SECONDARY_SLUGS);
  const featured = new Set<string>([...PRIMARY_SLUGS, ...SECONDARY_SLUGS]);
  const compact = projects.filter(p => !featured.has(p.slug));

  return { primary, secondary, compact };
}
