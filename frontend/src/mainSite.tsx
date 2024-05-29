import React from "react";
import ReactDOM from "react-dom/client";
import { SiteApp } from "@/apps/siteApp";

ReactDOM.createRoot(
  (() => {
    const containerId = "warpdriven-recs-site";
    const existedEl = document.getElementById(containerId);

    if (existedEl) {
      return existedEl;
    }

    const newEl = document.createElement("div");
    newEl.id = containerId;
    document.body.append(newEl);

    return newEl;
  })()
).render(
  <React.StrictMode>
    <SiteApp />
  </React.StrictMode>
);
