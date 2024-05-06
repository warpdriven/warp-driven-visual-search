import { Teleport } from "@/components/ui";
import { CollaborationFilter } from "@/pages/CollaborationFilter";
import { VisualSimilar } from "@/pages/VisualSimilar";
import { getJsonSettings } from "@/utils";

export function RootRoute() {
  const settings = getJsonSettings();

  if (!settings) {
    return null;
  }

  if (settings.wd_is_test_mode === "on") {
    switch (new URLSearchParams(window.location.search).get("wd_demo")) {
      case "true":
        break;
      default:
        return null;
    }
  }

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
          return document.getElementById("warpdriven-recs-cf");
        }}
      >
        <CollaborationFilter></CollaborationFilter>
      </Teleport>
    </>
  );
}
