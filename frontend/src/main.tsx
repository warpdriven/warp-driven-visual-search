// Vite Imports
import "vite/modulepreload-polyfill";

// React Imports
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";

const container = (() => {
  const containerId = "warpdriven-recs-app";

  // Get existed container
  const existedEl = document.getElementById(containerId);
  if (existedEl) {
    return existedEl;
  }

  // Create a new container
  const newEl = document.createElement("div");
  newEl.id = containerId;
  document.body.append(newEl);
  return newEl;
})();

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
