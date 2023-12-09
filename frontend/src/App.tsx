// Provider Imports
import { QueryProvider } from "@/api/provider";
import { ThemeProvider } from "@/theme";
import { ReduxProvider } from "@/redux";

// Toast Imports
import { Toaster } from "react-hot-toast";

// Router Imports
import { RootRoute } from "@/router";

export function App() {
  return (
    <ReduxProvider>
      <QueryProvider>
        <Toaster position="bottom-left" />
        <ThemeProvider>
          <RootRoute />
        </ThemeProvider>
      </QueryProvider>
    </ReduxProvider>
  );
}
