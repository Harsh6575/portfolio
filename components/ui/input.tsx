import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 border border-input bg-transparent px-4 text-body text-foreground placeholder:text-muted-foreground outline-none transition-colors focus-visible:border-foreground aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
