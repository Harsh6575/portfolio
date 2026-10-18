"use client";

import { BounceLoader } from "react-spinners";

export const Loader = () => {
  return (
    <div role="status" className="h-full flex items-center justify-center">
      <BounceLoader color="var(--primary)" size={40} />
      <span className="sr-only">Loading…</span>
    </div>
  );
};
