// API Imports
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { internal_search, Params } from "@/api/visual";

// Utils Imports
import { getJsonSettings } from "@/utils";

export function useVisual(params: Params) {
  const settings = getJsonSettings();

  // API Hooks
  return useQuery({
    queryKey: ["internal_search", params],
    async queryFn({ signal }) {
      return internal_search({
        signal,
        params,
        headers: {
          "X-API-Key": settings?.wd_api_key,
        },
      });
    },

    enabled: Boolean(params.shop_variant_id),
    placeholderData: keepPreviousData,
  });
}
