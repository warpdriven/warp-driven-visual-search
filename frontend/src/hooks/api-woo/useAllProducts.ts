// Query Imports
import { useQuery } from "@tanstack/react-query";
import { get_products } from "@/api/woo";

export function useAllProducts() {
  return useQuery({
    queryKey: ["get_products"],
    queryFn({ signal }) {
      return get_products({
        url: "/products",
        signal,
      });
    },
  });
}
