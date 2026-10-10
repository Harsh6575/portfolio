import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { notFound } from "next/navigation";
import { APP_URL, APP_NAME } from "@/constants";
import Link from "next/link";
import { ArrowLeft, Calendar, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";
import { MermaidDiagram } from "@/components/projects/mermaid-diagram";

const markdownComponents: Components = {
  h2: props => <h2 className="text-xl font-bold text-foreground mt-10 mb-4" {...props} />,
  h3: props => <h3 className="text-lg font-bold text-foreground mt-8 mb-3" {...props} />,
  p: props => (
    <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-4" {...props} />
  ),
  ul: props => (
    <ul className="space-y-2 mb-4 list-disc list-inside text-sm text-muted-foreground" {...props} />
  ),
  ol: props => (
    <ol
      className="space-y-2 mb-4 list-decimal list-inside text-sm text-muted-foreground"
      {...props}
    />
  ),
  li: props => <li className="leading-relaxed" {...props} />,
  a: props => (
    <a
      className="text-primary underline underline-offset-4 hover:text-primary/80"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  code: props => (
    <code className="bg-muted text-foreground px-1.5 py-0.5 rounded text-xs font-mono" {...props} />
  ),
  pre: ({ node, ...props }) => {
    const code = node?.children[0];
    if (
      code?.type === "element" &&
      code.tagName === "code" &&
      (code.properties.className as string[] | undefined)?.includes("language-mermaid")
    ) {
      const chart = code.children.map(child => (child.type === "text" ? child.value : "")).join("");
      return <MermaidDiagram chart={chart} />;
    }
    return (
      <pre
        className="bg-muted border border-border rounded-xl p-4 overflow-x-auto text-xs font-mono mb-4"
        {...props}
      />
    );
  },
  strong: props => <strong className="text-foreground font-bold" {...props} />,
};

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map(project => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `${APP_URL}/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.description,
      url: `${APP_URL}/projects/${project.slug}`,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: project.title,
            description: project.description,
            url: `${APP_URL}/projects/${project.slug}`,
            keywords: project.technologies.join(", "),
            author: {
              "@type": "Person",
              name: APP_NAME,
              url: APP_URL,
            },
          }),
        }}
      />
      <div className="max-w-3xl mx-auto">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Projects
        </Link>

        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border border-border text-muted-foreground bg-muted/60">
            {project.category}
          </span>
          <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border bg-primary/10 text-primary border-primary/20">
            {project.status}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-3">
          {project.title}
        </h1>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-8">
          <Calendar className="w-3.5 h-3.5" />
          <span>{project.date}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-10">
          {project.technologies.map(tech => (
            <span
              key={tech}
              className="text-[10px] font-bold rounded-md bg-muted border border-border text-muted-foreground select-none px-2.5 py-1"
            >
              {tech}
            </span>
          ))}
        </div>

        {project.links.length > 0 && (
          <div className="flex flex-wrap gap-2.5 mb-12">
            {project.links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full text-xs font-semibold px-4.5 py-2.5 border transition-all duration-200 bg-foreground border-foreground text-background hover:bg-foreground/90"
              >
                {link.type === "github" ? (
                  <FaGithub className="w-4 h-4" />
                ) : (
                  <ExternalLink className="w-3.5 h-3.5" />
                )}
                <span>{link.label || (link.type === "github" ? "Source Code" : "Live")}</span>
              </a>
            ))}
          </div>
        )}

        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {project.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
