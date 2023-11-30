// React Imports
import React from "react";
import ReactDOM from "react-dom";

export function Settings() {
  const mainNode = React.useMemo(() => {
    const adminEl = document.getElementById("warpdriven-recs-admin");
    if (!adminEl) return null;

    return ReactDOM.createPortal(<>Admin Settings</>, adminEl);
  }, []);

  return <>{mainNode}</>;
}
