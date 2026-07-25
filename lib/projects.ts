import matter from "gray-matter";

const OWNER = "Harsh6575";
const REPO = "portfolio-data";
const BRANCH = "main";
const PROJECTS_PATH = "projects";

const CONTENTS_API = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PROJECTS_PATH}?ref=${BRANCH}`;
const RAW_BASE = `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${PROJECTS_PATH}`;

const REVALIDATE_SECONDS = 3600;

export type ProjectLink = {
  type?: "github" | "live";
  label?: string;
  url: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  category: string;
  status: string;
  date: string;
  technologies: string[];
  features: string[];
  links: ProjectLink[];
  order: number;
  hidden: boolean;
  content: string;
};

type GithubContentEntry = {
  name: string;
  type: string;
};

async function listProjectFiles(): Promise<string[]> {
  const res = await fetch(CONTENTS_API, {
    headers: { Accept: "application/vnd.github+json" },
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    throw new Error(`Failed to list project files: ${res.status}`);
  }

  const entries: GithubContentEntry[] = await res.json();
  return entries
    .filter(entry => entry.type === "file" && entry.name.endsWith(".md"))
    .map(entry => entry.name);
}

async function fetchProjectFile(filename: string): Promise<Project> {
  const res = await fetch(`${RAW_BASE}/${filename}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch project file "${filename}": ${res.status}`);
  }

  const raw = await res.text();
  const { data, content } = matter(raw);
  const slug: string = data.slug ?? filename.replace(/\.md$/, "");

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    category: data.category ?? "",
    status: data.status ?? "",
    date: data.date ?? "",
    technologies: data.technologies ?? [],
    features: data.features ?? [],
    links: data.links ?? [],
    order: data.order ?? 0,
    hidden: data.hidden ?? false,
    content: content.trim(),
  };
}

export async function getAllProjects(): Promise<Project[]> {
  const filenames = await listProjectFiles();
  const projects = await Promise.all(filenames.map(fetchProjectFile));

  return projects.filter(project => !project.hidden).sort((a, b) => a.order - b.order);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getAllProjects();
  return projects.find(project => project.slug === slug) ?? null;
}
