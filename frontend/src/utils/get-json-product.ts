// Utils Imports
import { toJsonForEl } from "./to-json-for-el";

export function getJsonProduct<TData = Product>() {
  // Empty Element
  const el = document.getElementById("warpdriven-recs-json-product");
  if (!el) {
    console.error("No element warpdriven-recs-json-product");
    return null;
  }

  return toJsonForEl<TData>(el);
}

export interface Product {
  id: number;
  variations: number[];
}
