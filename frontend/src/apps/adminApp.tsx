// Provider Imports
import { QueryProvider } from "@/plugins";
import { ThemeProvider } from "@/theme";

// Toast Imports
import { Toaster } from "react-hot-toast";

// Router Imports
import { RootRoute } from "@/router";

// Store Imports
import { useSearchParams } from "@/hooks/store";
import { getJsonSettings } from "@/utils";

export function AdminApp() {
  const [searchParms] = useSearchParams();

  if (searchParms.get("page") !== "warpdriven-ai-settings") {
    return <></>;
  }

  const settings = getJsonSettings();
  if (settings?.page_type !== "admin") {
    return <></>;
  }

  return (
    <QueryProvider>
      <Toaster position="bottom-left" />
      <ThemeProvider>
        <RootRoute />
      </ThemeProvider>
    </QueryProvider>
  );
}
