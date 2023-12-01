// Components Imoprts
import { VisualSearch } from "./visual-search";

// React Imports
import React from "react";
import ReactDOM from "react-dom";

export function Detail() {
  const vsNode = React.useMemo(() => {
    const vsrEl = document.getElementById("warpdriven-recs-vsr");
    if (!vsrEl) return null;

    return ReactDOM.createPortal(<VisualSearch />, vsrEl);
  }, []);

  return <>{vsNode}</>;
}
