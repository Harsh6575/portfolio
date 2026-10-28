"use client";

import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/utils";

const HEADLINE = ["I build the parts", "nobody sees."];

export const Hero = () => {
  return (
    <section
      id="hero"
      className="flex min-h-svh flex-col justify-end px-5 pt-32 pb-12 lg:px-10 lg:pb-16"
    >
      <h1 className="font-display text-[clamp(3.25rem,9.5vw,11rem)] leading-[0.88] font-bold tracking-[-0.04em]">
        {HEADLINE.map((line, i) => (
          <span key={line} className="block overflow-hidden pb-[0.08em]">
            <span
              className="block animate-rise motion-reduce:animate-none"
              style={{ animationDelay: `${i * 110}ms` }}
            >
              {line}
            </span>
          </span>
        ))}
      </h1>
      <div className="animate-fade-up [animation-delay:500ms] motion-reduce:animate-none">
        <p className="mt-6 max-w-[44ch] text-body">
          Harsh Vansjaliya, full-stack developer in Vadodara. Next.js on top, Node.js and PostgreSQL
          underneath, and the caches and queues in between.
        </p>
        <Button
          size="lg"
          onClick={() => scrollToSection("projects")}
          className="mt-8 cursor-pointer"
        >
          See the work
        </Button>
      </div>
    </section>
  );
};
