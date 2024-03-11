import React from "react";
import ReactDOM from "react-dom/client";
import { AdminApp } from "@/apps/adminApp";

ReactDOM.createRoot(
  (() => {
    const containerId = "warpdriven-recs-admin";
    const existedEl = document.getElementById(containerId);

    if (existedEl) {
      return existedEl;
    }

    const newEl = document.createElement("div");
    newEl.id = containerId;
    document.body.append(newEl);

    return newEl;
  })(),
).render(
  <React.StrictMode>
    <AdminApp />
  </React.StrictMode>,
);
