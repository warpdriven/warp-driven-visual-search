// API Imports
import { useQuery } from "@tanstack/react-query";
import { internal_search } from "@/api/visual";
import { Params } from "@/api/visual/internal_search";

export function useVisual(params: Params) {
  // API Hooks
  return useQuery({
    queryKey: ["internal_search", params],
    queryFn({ signal }) {
      return internal_search({
        signal,
        params,
      });
    },

    enabled: Boolean(params.shop_variant_id),
  });
}
