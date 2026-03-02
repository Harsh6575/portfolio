import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { APP_DESCRIPTION, APP_NAME, APP_URL, GITHUB_URL, LINKED_IN_URL } from "@/constants";
import Head from "next/head";

const ldJson = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": APP_URL,
  name: APP_NAME,
  url: APP_URL,
  image: `${APP_URL}/400X400.svg`,
  jobTitle: "Backend Engineer",
  description: APP_DESCRIPTION,
  sameAs: [LINKED_IN_URL, GITHUB_URL],
  worksFor: {
    "@type": "Organization",
    name: "Alite Projects",
  },
  knowsAbout: [
    "Backend Development",
    "TypeScript",
    "Node.js",
    "Python",
    "Docker",
    "PostgreSQL",
    "System Design",
    "API Architecture",
    "Fintech Systems",
  ],
};

export default function Home() {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
          key="person-jsonld"
        />
      </Head>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </>
  );
}
