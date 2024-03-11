import { PosthogProvider, QueryProvider } from "@/plugins";
import { RootRoute } from "@/router";
import { ThemeProvider } from "@/theme";

export function SiteApp() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <PosthogProvider>
          <RootRoute />
        </PosthogProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
