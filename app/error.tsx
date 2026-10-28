"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-svh items-end pb-[20svh]">
      <div className="column">
        <h1 className="font-display text-head font-bold tracking-[-0.03em]">
          Something went wrong
        </h1>
        <p className="mt-4 max-w-[44ch]">
          The page hit an unexpected error, possibly while fetching project data. Try again in a
          moment.
        </p>
        <div className="mt-8 flex items-center gap-6">
          <Button onClick={() => reset()} size="lg" className="cursor-pointer">
            Try again
          </Button>
          <Link href="/" className="font-semibold underline underline-offset-4 hover:no-underline">
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
