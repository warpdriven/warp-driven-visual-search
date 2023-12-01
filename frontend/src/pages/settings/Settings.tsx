// React Imports
import React from "react";
import ReactDOM from "react-dom";

// Components Imports
import { SettingsForm } from "./SettingsForm";

export function Settings() {
  const mainNode = React.useMemo(() => {
    const adminEl = document.getElementById("warpdriven-recs-admin");
    if (!adminEl) return null;

    return ReactDOM.createPortal(<SettingsForm />, adminEl);
  }, []);

  return <>{mainNode}</>;
}
