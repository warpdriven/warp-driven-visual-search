// Provider Imports
import { QueryProvider } from "@/plugins";
import { ThemeProvider } from "@/theme";

// Toast Imports
import { Toaster } from "react-hot-toast";

// Page Imports
import { Admin } from "@/pages/admin";

// Store Imports
import { useSearchParams } from "@/hooks/store";
import { getJsonSettings } from "@/utils";

export function AdminApp() {
  const [searchParms] = useSearchParams();

  if (searchParms.get("page") !== "warpdriven-ai-settings") {
    return null;
  }

  const settings = getJsonSettings();

  if (settings?.page_type !== "admin") {
    return null;
  }

  return (
    <QueryProvider>
      <Toaster position="bottom-left"></Toaster>
      <ThemeProvider>
        <Admin></Admin>
      </ThemeProvider>
    </QueryProvider>
  );
}
