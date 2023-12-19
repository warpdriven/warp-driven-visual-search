// API Imports
import {
  useQuery,
  keepPreviousData,
  useQueryClient,
} from "@tanstack/react-query";
import { internal_search, Params } from "@/api/visual";
import { get_warp_driven_settings } from "@/api/wpadmin";
import { Res } from "@/api/wpadmin/get_warp_driven_settings";

export function useVisual(params: Params) {
  const queryClient = useQueryClient();

  // API Hooks
  return useQuery({
    queryKey: ["internal_search", params],
    async queryFn({ signal }) {
      const settings = await queryClient.fetchQuery<Res>({
        queryKey: ["get_warp_driven_settings"],
        queryFn({ signal }) {
          return get_warp_driven_settings({ signal });
        },

        retry: false,
      });

      return internal_search({
        signal,
        params,
        headers: {
          "X-API-Key": settings.api_key,
        },
      });
    },

    enabled: Boolean(params.shop_variant_id),
    placeholderData: keepPreviousData,
  });
}
