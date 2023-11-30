// Components Imoprts
import { VisualSearch } from "./visual-search";
// import { DetailCF } from "./detail-cf";
// import { YouMayLike } from "@/components/you-may-like";

// React Imports
import React from "react";
import ReactDOM from "react-dom";

export function Detail() {
  const vsNode = React.useMemo(() => {
    const vsEl = document.getElementById("warpdriven-recs-detail-vsr");
    if (!vsEl) return null;

    return ReactDOM.createPortal(<VisualSearch />, vsEl);
  }, []);

  // const cfNode = React.useMemo(() => {
  //   const cfEl = document.getElementById("warpdriven-recs-detail-cf");
  //   if (!cfEl) return null;

  //   return ReactDOM.createPortal(<DetailCF />, cfEl);
  // }, []);

  return <>{vsNode}</>;
}
