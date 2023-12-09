// Query Imports
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { get_products } from "@/api/woo";

export function useProducts(ids: string[]) {
  const queryClient = useQueryClient();

  return useQueries({
    queries: ids.map((id) => {
      return {
        queryKey: ["get_products", id],
        async queryFn(ctx: unknown) {
          const signal = Reflect.get(Object(ctx), "signal");

          const data = await queryClient.fetchQuery({
            queryKey: ["settings"],
            queryFn() {
              return {
                api_key: "",
                data_server_key: "",
                data_server: "",
                custom_js: "",
                is_test_mode: true,
                consumer_key: "",
                consumer_secret: "",
              };
            },
          });

          return get_products({
            signal,
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
