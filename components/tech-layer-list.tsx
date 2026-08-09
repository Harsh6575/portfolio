import { groupByLayer } from "@/lib/tech-layers";

export const TechLayerList = ({
  technologies,
  className = "",
}: {
  technologies: string[];
  className?: string;
}) => (
  <div className={`flex flex-wrap gap-x-4 gap-y-1 text-xs ${className}`}>
    {groupByLayer(technologies).map(({ layer, items }) => (
      <span key={layer} className="text-muted-foreground">
        <span className="font-mono text-primary/80">{layer}:</span> {items.join(", ")}
      </span>
    ))}
  </div>
);
