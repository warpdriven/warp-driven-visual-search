// Query Imports
import { useQuery } from "@tanstack/react-query";
import { recommendations } from "@/api/recommender";
import { Params, Res } from "@/api/recommender/recommendations";

export function useRecommendations(params: Params) {
  return useQuery<Res>({
    queryKey: ["recommendations", params],
    queryFn({ signal }) {
      return recommendations({
        signal,
        params,
      });
    },

    enabled: Boolean(params.shop_product_id),
  });
}
