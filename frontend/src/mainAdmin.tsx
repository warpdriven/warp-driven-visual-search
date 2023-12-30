// Vite Imports
import "vite/modulepreload-polyfill";

// React Imports
import React from "react";
import ReactDOM from "react-dom/client";
import { AdminApp } from "@/apps/adminApp";

const container = (() => {
  const containerId = "warpdriven-recs-admin";

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
    <AdminApp />
  </React.StrictMode>
);
