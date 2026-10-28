"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/utils";

export function useInView<T extends HTMLElement>(opts?: {
  threshold?: number;
  rootMargin?: string;
}) {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion()) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: opts?.threshold ?? 0.15, rootMargin: opts?.rootMargin ?? "0px 0px -80px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [opts?.threshold, opts?.rootMargin]);

  // Hidden only when the html has the js class, so the content still shows if scripts never run.
  const reveal = (step = 0, className = "") => ({
    className: `${className} ${isInView ? "animate-fade-up motion-reduce:animate-none" : "in-[.js]:opacity-0"}`,
    style: { animationDelay: `${step * 80}ms` },
  });

  return { ref, isInView, reveal };
}
