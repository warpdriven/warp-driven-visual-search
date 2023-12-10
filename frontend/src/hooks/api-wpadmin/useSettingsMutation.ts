// Query Imports
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { warpdriven_recs_settings } from "@/api/wpadmin";
import { Req, Res } from "@/api/wpadmin/warpdriven_recs_settings";

export function useSettingsMutation() {
  const queryClient = useQueryClient();
  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return warpdriven_recs_settings(req);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["warpdriven_recs_settings"],
      });
    },
    onError(error) {
      console.error(error);
    },
  });
}
