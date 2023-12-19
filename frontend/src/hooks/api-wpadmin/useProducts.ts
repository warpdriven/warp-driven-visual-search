// Query Imports
import { useQueries } from "@tanstack/react-query";
import { warpdriven_get_products } from "@/api/wpadmin";

export function useProducts(ids: string[]) {
  return useQueries({
    queries: ids.map((id) => {
      return {
        queryKey: ["get_products", id],
        async queryFn(ctx: unknown) {
          return await warpdriven_get_products({
            signal: Reflect.get(Object(ctx), "signal"),
            params: { id },
          });
        },
      };
    }),
  });
}
