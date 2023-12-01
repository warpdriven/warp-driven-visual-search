// Provider Imports
import { QueryProvider } from "@/api/provider";
import { ThemeProvider } from "@/theme";
import { ReduxProvider } from "@/redux";

// Pages Imports
import { Detail } from "@/pages/detail";
import { List } from "@/pages/list";
import { Settings } from "@/pages/settings";

// Toast Imports
import { Toaster } from "react-hot-toast";

export function App() {
  return (
    <ReduxProvider>
      <QueryProvider>
        <ThemeProvider>
          <Toaster position="bottom-left" />
          <Detail />
          <Settings />
          {import.meta.env.DEV && <List />}
        </ThemeProvider>
      </QueryProvider>
    </ReduxProvider>
  );
}
