import { getAllProjects } from "@/lib/projects";
import { ProjectsList } from "@/components/projects-list";
import { APP_URL } from "@/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "All projects I've built and want to share: backend systems, full-stack apps, and fintech platforms.",
  alternates: { canonical: `${APP_URL}/projects` },
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <section className="min-h-svh pt-40 pb-32">
      <div className="column">
        <h1 className="font-display text-display font-bold tracking-[-0.04em] lg:w-[60vw]">
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="block animate-rise motion-reduce:animate-none">Everything</span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="block animate-rise [animation-delay:110ms] motion-reduce:animate-none">
              I&apos;ve built
            </span>
          </span>
        </h1>
        <div className="animate-fade-up [animation-delay:400ms] motion-reduce:animate-none">
          <p className="mt-6 max-w-[44ch]">
            Backend systems, full-stack products and a trading platform. Filter by kind, or read the
            lot.
          </p>
          <Button asChild size="lg" className="mt-8 mb-16">
            <Link href="/#contact">Get in touch</Link>
          </Button>
        </div>
        <ProjectsList projects={projects} />
      </div>
    </section>
  );
}
