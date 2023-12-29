// Provider Imports
import { ThemeProvider } from "@/theme";
import { PosthogProvider, QueryProvider } from "@/plugins";

// Pages Imports
import { VisualSimilar } from "@/pages/VisualSimilar";

// Components Imports
import { Teleport } from "@/components/ui";

export function SiteApp() {
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
        </PosthogProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
