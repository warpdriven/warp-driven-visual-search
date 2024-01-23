// Query Imports
import { useQuery } from "@tanstack/react-query";
import { warpdriven_get_products } from "@/api/wpadmin";

export function useProductsQuery(ids: number[]) {
  return useQuery({
    queryKey: ["warpdriven_get_products", ids],
    queryFn({ signal }) {
      return warpdriven_get_products({ signal, data: { ids } });
    },

    enabled: Boolean(ids.length),
  });
}
