export type ExperienceRef = { company: string; role: string; relatedProjects?: string[] };
export type ProjectExperienceRef = { company: string; role: string };

export function buildExperienceByProjectSlug(
  experiences: ExperienceRef[],
): Map<string, ProjectExperienceRef> {
  const index = new Map<string, ProjectExperienceRef>();

  for (const exp of experiences) {
    for (const slug of exp.relatedProjects ?? []) {
      index.set(slug, { company: exp.company, role: exp.role });
    }
  }

  return index;
}
