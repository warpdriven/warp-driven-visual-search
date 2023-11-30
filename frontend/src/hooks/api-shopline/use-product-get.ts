// API Hooks
import { useQuery } from "@tanstack/react-query";
import { product_get } from "@/api/shopline";
import { Res } from "@/api/shopline/product_get";

export function useProductGet(handle: string) {
  return useQuery<Res, Error>({
    queryKey: ["product_get", handle],
    queryFn({ signal }) {
      return product_get({
        signal,
        params: { handle },
      });
    },
  });
}
