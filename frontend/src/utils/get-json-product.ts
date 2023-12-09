// Utils Imports
import { toJsonForEl } from "./to-json-for-el";

// Types Imports
import { Product } from "@/api/woo/get_products";

export function getJsonProduct<TData = Product>() {
  // Empty Element
  const el = document.getElementById("warpdriven-recs-json-product");
  if (!el) {
    console.error("No element warpdriven-recs-json-product");
    return null;
  }

  return toJsonForEl<TData>(el);
}
