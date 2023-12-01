import { toJsonForEl } from "./to-json-for-el";

export function getJsonCustomer<TData>() {
  // Empty Element
  const el = document.getElementById("warpdriven-recs-json-customer");
  if (!el) {
    console.error("No element warpdriven-recs-json-customer");
    return null;
  }

  return toJsonForEl<TData>(el);
}
