// Utils Imports
import { toJsonForEl } from "./to-json-for-el";

export function getJsonCart<TData>() {
  // Empty Element
  const el = document.getElementById("warpdriven-recs-json-cart");
  if (!el) {
    console.error("No element warpdriven-recs-json-cart");
    return null;
  }

  return toJsonForEl<TData>(el);
}
