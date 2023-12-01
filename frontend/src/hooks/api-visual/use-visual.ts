// API Imports
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { internal_search, Params } from "@/api/visual";

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
    placeholderData: keepPreviousData,
  });
}
