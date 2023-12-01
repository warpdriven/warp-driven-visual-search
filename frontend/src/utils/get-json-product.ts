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

interface Product {
  id: string;
  handle: string;
  variants: Variant[];
}

interface Variant {
  id: string;
}
