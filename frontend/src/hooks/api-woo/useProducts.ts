// Query Imports
import { useQueries } from "@tanstack/react-query";
import { get_products } from "@/api/woo";

export function useProducts(ids: number[]) {
  return useQueries({
    queries: ids.map((id) => {
      return {
        queryKey: ["get_products", id],
        queryFn(ctx: unknown) {
          const signal = Reflect.get(Object(ctx), "signal");
          return get_products({
            url: `/products/id`,
            signal,
          });
        },
      };
    }),
  });
}
