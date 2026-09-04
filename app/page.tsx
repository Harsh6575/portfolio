import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { getAllProjects } from "@/lib/projects";

export default async function Home() {
  const projects = await getAllProjects();
  const projectSummaries = projects.map(({ slug, title }) => ({ slug, title }));

  return (
    <>
      <Hero />
      <About />
      <Skills projects={projects} />
      <Experience projectSummaries={projectSummaries} />
      <Projects projects={projects} />
      <Contact />
    </>
  );
}
