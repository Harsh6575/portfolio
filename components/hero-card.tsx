"use client";

import React from "react";
import { Server, Database, Layout, ShieldCheck, Sparkles, ArrowUpRight } from "lucide-react";
import { scrollToSection } from "@/lib/utils";

const STACK_PILLARS = [
  {
    layer: "Backend & Systems",
    icon: Server,
    items: ["Node.js", "Express", "FastAPI", "Django", "BullMQ", "Redis"],
    tag: "Primary",
  },
  {
    layer: "Frontend & UI",
    icon: Layout,
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zustand"],
    tag: "Specialization",
  },
  {
    layer: "Data & Storage",
    icon: Database,
    items: ["PostgreSQL", "MongoDB", "Prisma", "Schema Design"],
    tag: "Data Layer",
  },
];

export const HeroCard = () => {
  return (
    <div className="w-full max-w-[520px] rounded-2xl border border-border/70 bg-card/60 backdrop-blur-xl p-6 sm:p-7 shadow-xl shadow-primary/5 relative overflow-hidden">
      {/* Subtle top ambient glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header info */}
      <div className="flex items-center justify-between pb-5 border-b border-border/60">
        <span className="font-mono text-xs font-bold text-foreground">Full-Stack Developer</span>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border/60">
          India
        </span>
      </div>

      {/* Architecture Focus Stack */}
      <div className="py-5 space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
          <span className="uppercase tracking-wider font-bold text-foreground/80 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Core Architecture & Stack
          </span>
        </div>

        <div className="space-y-3">
          {STACK_PILLARS.map(({ layer, icon: Icon, items, tag }) => (
            <div
              key={layer}
              className="p-3 rounded-xl bg-muted/40 border border-border/50 hover:border-border transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-bold text-foreground">{layer}</span>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">{tag}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {items.map(item => (
                  <span
                    key={item}
                    className="text-[11px] font-medium font-mono px-2 py-0.5 rounded-md bg-background/80 border border-border/60 text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Highlights footer */}
      <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5 font-medium">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span>FinTech, Trading Terminals & Web Applications</span>
        </div>
        <button
          type="button"
          onClick={() => scrollToSection("projects", 80)}
          className="inline-flex items-center gap-1 font-semibold text-primary hover:underline group cursor-pointer"
        >
          <span>Explore Work</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </div>
  );
};
