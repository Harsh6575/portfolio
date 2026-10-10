"use client";

import { useEffect, useId, useState } from "react";
import { useTheme } from "next-themes";

export const MermaidDiagram = ({ chart }: { chart: string }) => {
  const { resolvedTheme } = useTheme();
  const id = useId().replace(/:/g, "");
  const [svg, setSvg] = useState("");

  useEffect(() => {
    let cancelled = false;

    // Loaded on demand so the library only ships to pages that contain a diagram.
    import("mermaid").then(async ({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        theme: resolvedTheme === "dark" ? "dark" : "neutral",
        fontFamily: "inherit",
      });
      try {
        const { svg } = await mermaid.render(`mermaid-${id}`, chart);
        if (!cancelled) setSvg(svg);
      } catch {
        if (!cancelled) setSvg("");
      }
    });

    return () => {
      cancelled = true;
    };
  }, [chart, id, resolvedTheme]);

  if (!svg) {
    return (
      <pre className="bg-muted border border-border rounded-xl p-4 overflow-x-auto text-xs font-mono mb-4">
        {chart}
      </pre>
    );
  }

  return (
    <div
      className="bg-muted/40 border border-border rounded-xl p-4 mb-6 overflow-x-auto flex justify-center [&_svg]:max-w-full [&_svg]:h-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};
