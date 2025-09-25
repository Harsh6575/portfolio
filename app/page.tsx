import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Skills } from "@/components/skills";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <>
    <Hero />
    <Skills />

    <Experience />

    <ThemeToggle />
    </>
  )
}
