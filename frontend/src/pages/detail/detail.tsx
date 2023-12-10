// React Imports
import React from "react";

// Components Imports
import { MutationSuspense } from "@/components";

export function Detail() {
  return (
    <>
      <MutationSuspense containerId="warpdriven-recs-vsr">
        <VisualSimilar />
      </MutationSuspense>
    </>
  );
}

const VisualSimilar = React.lazy(() => import("./VisualSimilar"));
