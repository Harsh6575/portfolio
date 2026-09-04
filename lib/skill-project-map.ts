import type { ProjectTechRef } from "@/lib/projects";
import { experiences } from "@/constants/experience";

export type SkillProjectRef = { slug: string; title: string };

const TECH_ALIASES: Record<string, string> = {
  "express.js": "express",
  "rest api": "rest apis",
  postgres: "postgresql",
  jwt: "jwt authentication",
  "jwt auth": "jwt authentication",
  n8n: "n8n automation",
  "react.js": "react",
  nextjs: "next.js",
  next: "next.js",
  javascript: "javascript (es6+)",
  js: "javascript (es6+)",
  ts: "typescript",
};

/**
 * Skill Inference Map:
 * Primary tools, authentication layers, and frameworks automatically infer their
 * underlying foundational skills, query concepts, and language competencies.
 */
const SKILL_IMPLICATIONS: Record<string, string[]> = {
  // Databases infer SQL, relational and indexing concepts
  postgresql: [
    "sql",
    "schema design",
    "query optimization",
    "indexing",
    "transactions",
    "normalization",
  ],
  mongodb: ["schema design", "query optimization", "indexing", "transactions"],
  prisma: ["schema design", "sql", "transactions", "indexing"],
  redis: ["caching strategies"],

  // Authentication & Security
  "nextauth.js": ["jwt authentication", "jwt"],

  // Languages & TypeScript
  typescript: ["javascript (es6+)", "javascript"],
  "javascript (es6+)": ["javascript"],

  // Backend frameworks infer runtime, API design, and protocols
  "node.js": ["api design", "rest apis", "git", "github"],
  express: [
    "node.js",
    "rest apis",
    "api design",
    "api integration",
    "jwt authentication",
    "git",
    "github",
  ],
  fastapi: ["python", "rest apis", "api design", "api integration", "git", "github"],
  django: [
    "python",
    "rest apis",
    "api design",
    "api integration",
    "schema design",
    "sql",
    "git",
    "github",
  ],
  graphql: ["api design", "api integration"],
  "rest apis": ["api design", "api integration", "postman"],
  "n8n automation": ["api integration"],

  // Frontend frameworks
  "next.js": ["react", "typescript", "javascript (es6+)", "api integration", "git", "github"],
  react: ["javascript (es6+)", "api integration", "git", "github"],

  // Containers & DevOps
  "docker compose": ["docker", "linux"],
  docker: ["linux"],

  // Python Data Analysis
  pandas: ["python", "data analysis", "numpy"],
  numpy: ["python", "data analysis"],
  matplotlib: ["python", "data analysis"],
  seaborn: ["python", "data analysis"],
  yfinance: ["python", "data analysis", "basic strategy backtesting"],
};

export function normalizeTech(name: string) {
  const lower = name.trim().toLowerCase();
  return TECH_ALIASES[lower] ?? lower;
}

export function buildSkillProjectIndex(
  projects: ProjectTechRef[],
  expList: typeof experiences = experiences,
): Map<string, SkillProjectRef[]> {
  const index = new Map<string, Map<string, SkillProjectRef>>();

  const addMapping = (skillKey: string, ref: SkillProjectRef) => {
    const key = normalizeTech(skillKey);
    if (!index.has(key)) {
      index.set(key, new Map());
    }
    index.get(key)!.set(ref.slug, ref);
  };

  // 1. Index All Projects
  for (const project of projects) {
    const projRef: SkillProjectRef = { slug: project.slug, title: project.title };

    // Every project utilizes Git / GitHub workflows
    addMapping("git", projRef);
    addMapping("github", projRef);

    for (const tech of project.technologies) {
      const normalized = normalizeTech(tech);
      addMapping(normalized, projRef);

      // Add implied skills automatically
      const implied = SKILL_IMPLICATIONS[normalized];
      if (implied) {
        for (const imp of implied) {
          addMapping(imp, projRef);
        }
      }
    }
  }

  // 2. Index Professional Company Experiences
  if (expList && expList.length > 0) {
    for (const exp of expList) {
      const expRef: SkillProjectRef = { slug: "#experience", title: exp.company };

      for (const tech of exp.technologies) {
        const normalized = normalizeTech(tech);
        addMapping(normalized, expRef);

        const implied = SKILL_IMPLICATIONS[normalized];
        if (implied) {
          for (const imp of implied) {
            addMapping(imp, expRef);
          }
        }
      }
    }
  }

  // Convert internal Map of Maps to Map of Arrays for consumption
  const result = new Map<string, SkillProjectRef[]>();
  for (const [key, projectMap] of index.entries()) {
    result.set(key, Array.from(projectMap.values()));
  }

  return result;
}
