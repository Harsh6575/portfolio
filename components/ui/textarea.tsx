import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full border border-input bg-transparent px-4 py-3 text-body text-foreground placeholder:text-muted-foreground outline-none transition-colors focus-visible:border-foreground aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
