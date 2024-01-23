// Provider Imports
import { ThemeProvider } from "@/theme";
import { PosthogProvider, QueryProvider } from "@/plugins";

// Router Imports
import { RootRoute } from "@/router";

export function SiteApp() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <PosthogProvider>
          <RootRoute></RootRoute>
        </PosthogProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
