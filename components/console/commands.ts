import type { ProjectSummary } from "@/lib/projects";
import { APP_NAME, APP_TITLE, TOTAL_EXPERIENCE, CURRENT_COMPANY, MAIL_URL } from "@/constants";
import { skillsData } from "@/constants/skills";
import { experiences } from "@/constants/experience";

export type CommandSideEffect = { type: "scroll"; target: string };

export type CommandOutput = {
  lines: string[];
  sideEffect?: CommandSideEffect;
};

export type CommandContext = {
  projectSummaries: ProjectSummary[];
};

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const commandRegistry: Record<string, (ctx: CommandContext) => CommandOutput> = {
  help: () => ({
    lines: [
      "Available commands:",
      "  whoami       show who I am",
      "  skills       list skill categories",
      "  experience   list work history",
      "  projects     list projects",
      "  contact      show contact info",
      "  cat <file>   view a file (profile.json, experience.ts, interests.py)",
      "  clear        clear this session",
    ],
  }),
  whoami: () => ({
    lines: [
      `${APP_NAME} — ${APP_TITLE}`,
      `${TOTAL_EXPERIENCE}+ years, currently at ${CURRENT_COMPANY}.`,
    ],
    sideEffect: { type: "scroll", target: "about" },
  }),
  skills: () => ({
    lines: skillsData.map(group => `${slugify(group.category)}/`),
    sideEffect: { type: "scroll", target: "skills" },
  }),
  experience: () => ({
    lines: experiences.map(exp => `${exp.company} — ${exp.duration}`),
    sideEffect: { type: "scroll", target: "experience" },
  }),
  projects: ctx => ({
    lines: ctx.projectSummaries.length
      ? ctx.projectSummaries.map(p => `${p.slug}/`)
      : ["No projects loaded."],
    sideEffect: { type: "scroll", target: "projects" },
  }),
  contact: () => ({
    lines: [MAIL_URL.replace("mailto:", ""), "Gujarat, India (remote-friendly)"],
    sideEffect: { type: "scroll", target: "contact" },
  }),
  "sudo hire-me": () => ({
    lines: ["[sudo] permission check for harsh... ✓ access granted", "redirecting to contact..."],
    sideEffect: { type: "scroll", target: "contact" },
  }),
};
