import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { notFound } from "next/navigation";
import { APP_URL, APP_NAME } from "@/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";
import { MermaidDiagram } from "@/components/projects/mermaid-diagram";
import { TechLayerList } from "@/components/tech-layer-list";

const markdownComponents: Components = {
  h2: props => <h2 className="on-view text-lead font-semibold mt-16 mb-4" {...props} />,
  h3: props => <h3 className="on-view font-semibold mt-10 mb-3" {...props} />,
  p: props => <p className="on-view mb-5" {...props} />,
  ul: props => <ul className="on-view space-y-2 mb-5 list-disc pl-5" {...props} />,
  ol: props => <ol className="on-view space-y-2 mb-5 list-decimal pl-5" {...props} />,
  li: props => <li {...props} />,
  a: ({ href, ...props }) => {
    const isExternal = href?.startsWith("http");
    return (
      <a
        href={href}
        className="underline underline-offset-4 hover:no-underline"
        {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
        {...props}
      />
    );
  },
  code: props => <code className="bg-card px-1.5 py-0.5 text-[0.9em] font-mono" {...props} />,
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
    return <pre className="bg-card p-5 overflow-x-auto text-small font-mono mb-6" {...props} />;
  },
  strong: props => <strong className="font-semibold" {...props} />,
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

  const [name, subtitle] = project.title.split(" - ");
  const [primaryLink, ...otherLinks] = project.links;
  const linkLabel = (link: (typeof project.links)[number]) =>
    link.label || (link.type === "github" ? "Source code" : "Live site");

  return (
    <article className="min-h-svh pt-40 pb-32">
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
      <div className="column">
        <h1 className="font-display text-display font-bold tracking-[-0.04em] lg:w-[60vw]">
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="block animate-rise motion-reduce:animate-none">{name}</span>
          </span>
        </h1>
        <div className="animate-fade-up [animation-delay:300ms] motion-reduce:animate-none">
          {subtitle && <p className="mt-4 text-lead font-semibold">{subtitle}</p>}
          <p className="mt-4 text-lead">{project.description}</p>
          <p className="mt-6 text-small text-muted-foreground tabular-nums">
            {project.category} · {project.status} · {project.date}
          </p>
          <TechLayerList technologies={project.technologies} className="mt-2" />

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            {primaryLink ? (
              <Button asChild size="lg">
                <a href={primaryLink.url} target="_blank" rel="noopener noreferrer">
                  {linkLabel(primaryLink)}
                </a>
              </Button>
            ) : (
              <Button asChild size="lg">
                <Link href="/#contact">Ask me about it</Link>
              </Button>
            )}
            {otherLinks.map(link => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline underline-offset-4 hover:no-underline"
              >
                {linkLabel(link)}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {project.content}
          </ReactMarkdown>
        </div>

        <Link
          href="/projects"
          className="mt-16 inline-block font-semibold underline underline-offset-4 hover:no-underline"
        >
          All projects
        </Link>
      </div>
    </article>
  );
}
