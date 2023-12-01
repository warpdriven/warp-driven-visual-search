// Vite Imports
import "vite/modulepreload-polyfill";

// React Imports
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";

import posthog from "posthog-js";

renderReact();
void posthog;

// Render React App
function renderReact() {
  const root = document.createElement("div");
  root.id = "warpdriven-recs-app";
  root.style.display = "none";
  document.body.append(root);

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
