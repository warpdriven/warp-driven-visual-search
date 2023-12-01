// Query Imports
import { useMutation } from "@tanstack/react-query";
import { warpdriven_recs_settings } from "@/api/wpadmin";
import { Req, Res } from "@/api/wpadmin/warpdriven_recs_settings";

export function useSettingsMutation() {
  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return warpdriven_recs_settings(req);
    },
  });
}
