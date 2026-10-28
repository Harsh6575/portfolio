"use client";

import Image from "next/image";
import {
  TOTAL_EXPERIENCE,
  ABOUT_BIO,
  RESUME_URL,
  APP_NAME,
  APP_TITLE,
  EDUCATION,
  FOCAL_POINTS,
} from "@/constants";
import { useInView } from "@/hooks/use-in-view";

const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
const focus = FOCAL_POINTS.map(lowerFirst);
const [edu] = EDUCATION;

export const About = () => {
  const { ref, reveal } = useInView<HTMLDivElement>();

  return (
    <section id="about" className="field-light py-40">
      <h2 className="sr-only">About</h2>
      <div ref={ref} className="column">
        <Image
          src="/hv-logo.svg"
          alt={APP_NAME}
          width={44}
          height={44}
          {...reveal(0, "size-11 rounded-full bg-card p-1.5")}
        />

        <div className="mt-7 space-y-[1.55em]">
          <p {...reveal(1)}>
            {ABOUT_BIO.intro.replace("{TOTAL_EXPERIENCE}", TOTAL_EXPERIENCE.toString())}
          </p>
          <p {...reveal(2)}>{ABOUT_BIO.experience}</p>
          <p {...reveal(3)}>
            These days that means {focus.slice(0, -1).join(", ")}, and {focus.at(-1)}.
          </p>
          <p {...reveal(4)}>
            Before all of that, I studied for a {edu.degree} at {edu.institution}, {edu.duration}.{" "}
            {edu.description} If you prefer it on one page,{" "}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary px-1 underline underline-offset-4 hover:no-underline"
            >
              here is my résumé
            </a>
            .
          </p>
        </div>

        <div {...reveal(5, "mt-10")}>
          <p className="text-[22px] italic">{APP_NAME}</p>
          <p className="text-small text-muted-foreground">{APP_TITLE}, Vadodara</p>
        </div>
      </div>
    </section>
  );
};
