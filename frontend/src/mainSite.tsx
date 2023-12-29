// Vite Imports
import "vite/modulepreload-polyfill";

// React Imports
import React from "react";
import ReactDOM from "react-dom/client";
import { SiteApp } from "@/apps/siteApp";

const container = (() => {
  const containerId = "warpdriven-recs-site";

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
    <SiteApp />
  </React.StrictMode>
);
