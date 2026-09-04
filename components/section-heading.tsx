import React from "react";

interface SectionHeadingProps {
  index?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  index,
  title,
  subtitle,
  align = "center",
  className = "",
}) => {
  const isCenter = align === "center";

  return (
    <div className={`mb-14 ${isCenter ? "text-center" : "text-left"} ${className}`}>
      {index && (
        <div
          className={`flex items-center gap-3 mb-3 ${isCenter ? "justify-center" : "justify-start"}`}
        >
          <span className="font-sans text-xs font-bold text-accent tracking-widest uppercase tabular-nums">
            {index}
          </span>
          <span className="h-px w-8 bg-border" />
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed ${isCenter ? "mx-auto" : ""}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
