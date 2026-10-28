"use client";

import { useEffect, useId, useState } from "react";

export const MermaidDiagram = ({ chart }: { chart: string }) => {
  const id = useId().replace(/:/g, "");
  const [svg, setSvg] = useState("");

  useEffect(() => {
    let cancelled = false;

    // Loaded on demand so the library only ships to pages that contain a diagram.
    import("mermaid").then(async ({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
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
  }, [chart, id]);

  if (!svg) {
    return <pre className="bg-card p-5 overflow-x-auto text-small font-mono mb-6">{chart}</pre>;
  }

  return (
    <div
      role="img"
      aria-label="Architecture diagram"
      className="bg-card p-5 mb-6 overflow-x-auto flex justify-center [&_svg]:max-w-full [&_svg]:h-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};
