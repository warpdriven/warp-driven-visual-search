import { Toaster } from "react-hot-toast";
import { useSearchParams } from "@/hooks/store";
import { Admin } from "@/pages/admin";
import { QueryProvider } from "@/plugins";
import { ThemeProvider } from "@/theme";
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
      <Toaster position="bottom-left" />
      <ThemeProvider>
        <Admin />
      </ThemeProvider>
    </QueryProvider>
  );
}
