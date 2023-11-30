// API Imports
import { useQueries } from "@tanstack/react-query";
import { product_get } from "@/api/shopline";

export function useProdcuts(handles: string[]) {
  return useQueries({
    queries: handles.map((handle) => {
      return {
        queryKey: ["product_get", handle],
        queryFn(ctx: unknown) {
          return product_get({
            params: { handle },
            signal: Reflect.get(Object(ctx), "signal"),
          });
        },

        enabled: Boolean(handle),

        retry: false,
      };
    }),
  });
}
