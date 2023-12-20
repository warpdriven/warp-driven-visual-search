// Vite Imports
import "vite/modulepreload-polyfill";

// React Imports
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";

renderReact();

// Render React App
function renderReact() {
  const container = (() => {
    // Get existed container
    const existedEl = document.getElementById("warpdriven-recs-app");
    if (existedEl) {
      return existedEl;
    }

    // Create a new container
    const newEl = document.createElement("div");
    newEl.id = "warpdriven-recs-app";
    document.body.append(newEl);
    return newEl;
  })();

  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
