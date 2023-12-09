// Vite Imports
import "vite/modulepreload-polyfill";

// React Imports
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";

renderReact();

// Render React App
function renderReact() {
  const root = document.createElement("div");
  root.id = "warpdriven-recs-app";
  document.body.append(root);

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
