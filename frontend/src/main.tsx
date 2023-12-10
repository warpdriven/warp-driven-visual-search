// Vite Imports
import "vite/modulepreload-polyfill";

// React Imports
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";

// Provider Imports
import { QueryProvider } from "@/api/provider";
import { ThemeProvider } from "@/theme";
import { ReduxProvider } from "@/redux";

// Toast Imports
import { Toaster } from "react-hot-toast";

renderReact();

// Render React App
function renderReact() {
  const root = document.createElement("div");
  root.id = "warpdriven-recs-app";
  document.body.append(root);

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ReduxProvider>
        <QueryProvider>
          <Toaster position="bottom-left" />
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </QueryProvider>
      </ReduxProvider>
    </React.StrictMode>
  );
}
