// Vite Imports
import "vite/modulepreload-polyfill";

// React Imports
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

// Posthog Imports
import posthog from "posthog-js";

// Utils Imports
import { toURL, getJsonSettings } from "@/utils";

init();

function init() {
  const settings = getJsonSettings();
  if (!settings) {
    console.error("Can not get settings!");
    return;
  }

  const posthog_key = String(settings.data_server_key).trim();
  if (!posthog_key) {
    console.error("Can not get apikey!");
    return;
  }

  const posthog_host = String(settings.data_server).trim();
  if (!posthog_host) {
    console.error("Can not get posthog_host!");
    return;
  }

  initPosthog({ api_key: posthog_key, api_host: posthog_host });
  render();
}

// Init Posthog
function initPosthog(params: InitPostHostParams) {
  // ** Params
  const { api_key, api_host } = params;

  const apiHost = toURL(api_host);

  posthog.init(api_key, { api_host: apiHost });
}

interface InitPostHostParams {
  api_key: string;
  api_host: string;
}

// Render with check test mode
function render() {
  const settings = getJsonSettings();
  if (!settings) return;

  if (!settings.is_test_mode) {
    renderReact();
    return;
  }

  const searchParams = new URLSearchParams(window.location.search);
  const isDemoMode = searchParams.get("wd_demo") === "true";
  if (isDemoMode) {
    renderReact();
    return;
  }

  const isDev = import.meta.env.DEV;
  if (isDev) {
    renderReact();
  }
}

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
