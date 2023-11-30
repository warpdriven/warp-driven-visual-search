// React Imports
import React from "react";
import ReactDOM from "react-dom";

// Utils Imports
import { getJsonCart } from "@/utils";

export function Cart() {
  const mainNode = React.useMemo(() => {
    const el = document.getElementById("warpdriven-recs-cart");
    if (!el) return null;
    return ReactDOM.createPortal(<Recs />, el);
  }, []);

  return <>{mainNode}</>;
}

function Recs() {
  const cart = getJsonCart();
  console.log(cart);
  return <>7788</>;
}
