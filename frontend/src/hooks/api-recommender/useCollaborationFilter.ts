// Query Imports
import { useQuery } from "@tanstack/react-query";
import { get_cf_recommendations } from "@/api/recommender";
import { Params, Res } from "@/api/recommender/get_cf_recommendations";

export function useCollaborationFilter(params: Params) {
  return useQuery<Res>({
    queryKey: ["get_cf_recommendations", params],
    queryFn({ signal }) {
      return get_cf_recommendations({
        signal,
        params,
      });
    },

    enabled: Boolean(params.shop_product_id),
  });
}
