// Provider Imports
import { QueryProvider } from "@/api/provider";
import { ThemeProvider } from "@/theme";
import { ReduxProvider } from "@/redux";

// Pages Imports
import { Detail } from "@/pages/detail";
import { List } from "@/pages/list";

export function App() {
  return (
    <ReduxProvider>
      <QueryProvider>
        <ThemeProvider>
          <Detail />
          {import.meta.env.DEV && <List />}
        </ThemeProvider>
      </QueryProvider>
    </ReduxProvider>
  );
}
