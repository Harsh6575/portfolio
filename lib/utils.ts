import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const scrollToSection = (id: string, offsetPx = 0) => {
  const element = document.getElementById(id);
  if (!element) return;

  const behavior = prefersReducedMotion() ? "auto" : "smooth";

  if (offsetPx === 0) {
    element.scrollIntoView({ behavior });
    return;
  }

  const bodyRect = document.body.getBoundingClientRect().top;
  const elementRect = element.getBoundingClientRect().top;
  const elementPosition = elementRect - bodyRect;
  window.scrollTo({ top: elementPosition - offsetPx, behavior });
};
