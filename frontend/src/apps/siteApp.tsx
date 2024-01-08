// Provider Imports
import { ThemeProvider } from "@/theme";
import { PosthogProvider, QueryProvider } from "@/plugins";

// Pages Imports
import { VisualSimilar } from "@/pages/VisualSimilar";
import { CollaborationFilter } from "@/pages/CollaborationFilter";

// Components Imports
import { Teleport } from "@/components/ui";

// Utils Imports
import { getJsonSettings } from "@/utils";

export function SiteApp() {
  const settings = getJsonSettings();

  // Checking settings
  if (!settings) {
    return null;
  }

  // Tese mode enable
  if (settings.wd_is_test_mode === "on") {
    switch (new URLSearchParams(window.location.search).get("wd_demo")) {
      case "true":
        break;
      default:
        return null;
    }
  }

  return (
    <QueryProvider>
      <ThemeProvider>
        <PosthogProvider>
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
        </PosthogProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
