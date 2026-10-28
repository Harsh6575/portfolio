import { groupByLayer } from "@/lib/tech-layers";

export const TechLayerList = ({
  technologies,
  className = "",
}: {
  technologies: string[];
  className?: string;
}) => (
  <p className={`text-small text-muted-foreground ${className}`}>
    {groupByLayer(technologies).map(({ layer, items }) => (
      <span key={layer} className="mr-2">
        <span className="font-semibold text-foreground">{layer}</span> {items.join(", ")}.
      </span>
    ))}
  </p>
);
