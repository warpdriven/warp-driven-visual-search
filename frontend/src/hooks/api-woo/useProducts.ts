// Query Imports
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { get_products } from "@/api/woo";
import { get_warp_driven_settings } from "@/api/wpadmin";

export function useProducts(ids: string[]) {
  const queryClient = useQueryClient();

  return useQueries({
    queries: ids.map((id) => {
      return {
        queryKey: ["get_products", id],
        async queryFn(ctx: unknown) {
          const data = await queryClient.fetchQuery({
            queryKey: ["get_warp_driven_settings"],
            queryFn({ signal }) {
              return get_warp_driven_settings({ signal });
            },

            retry: false,
          });

          return await get_products({
            signal: Reflect.get(Object(ctx), "signal"),
            url: `/products/${id}`,
            auth: {
              username: data.consumer_key,
              password: data.consumer_secret,
            },
          });
        },
      };
    }),
  });
}
