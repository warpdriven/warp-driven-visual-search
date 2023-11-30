// Components Imoprts
import { VisualSearch } from "./visual-search";

// React Imports
import React from "react";
import ReactDOM from "react-dom";

// API Imports
import { useAllProducts } from "@/hooks/api-woo";

export function Detail() {
  const allProductsQuery = useAllProducts();
  console.log(allProductsQuery.data);

  const vsNode = React.useMemo(() => {
    return ReactDOM.createPortal(<VisualSearch />, document.body);
  }, []);

  return <>{vsNode}</>;
}
