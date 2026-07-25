import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { getAllProjects } from "@/lib/projects";

export default async function Home() {
  const projects = await getAllProjects();

  return (
    <>
      <Hero />
      <About projectsCount={projects.length} />
      <Skills />
      <Experience />
      <Projects projects={projects} />
      <Contact />
    </>
  );
}
