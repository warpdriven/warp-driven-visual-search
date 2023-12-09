// Provider Imports
import { QueryProvider } from "@/api/provider";
import { ThemeProvider } from "@/theme";

// Toast Imports
import { Toaster } from "react-hot-toast";

// Router Imports
import { RootRoute } from "@/router";

export function App() {
  return (
    <QueryProvider>
      <Toaster position="bottom-left" />
      <ThemeProvider>
        <RootRoute />
      </ThemeProvider>
    </QueryProvider>
  );
}
