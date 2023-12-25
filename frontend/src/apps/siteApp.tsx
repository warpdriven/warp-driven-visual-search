// Provider Imports
import { QueryProvider } from "@/api/provider";
import { ThemeProvider } from "@/theme";

// Pages Imports
import { VisualSimilar } from "@/pages/VisualSimilar";

// Components Imports
import { Teleport } from "@/components/ui";

export function SiteApp() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <Teleport
          container={() => {
            return document.getElementById("warpdriven-recs-vsr");
          }}
        >
          <VisualSimilar></VisualSimilar>
        </Teleport>
      </ThemeProvider>
    </QueryProvider>
  );
}
