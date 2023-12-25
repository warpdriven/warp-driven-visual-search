// Components Imports
import { VisualSimilar } from "@/pages/VisualSimilar";
import { Admin } from "@/pages/admin";
import { Teleport } from "@/components/ui";

export function RootRoute() {
  // Normal content
  return (
    <>
      <Teleport
        container={() => {
          return document.getElementById("warpdriven-recs-vsr");
        }}
      >
        <VisualSimilar></VisualSimilar>
      </Teleport>
      <Teleport
        container={() => {
          return document.getElementById("warpdriven-recs-admin");
        }}
      >
        <Admin></Admin>
      </Teleport>
    </>
  );
}
