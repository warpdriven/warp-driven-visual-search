// Query Imports
import { useMutation } from "@tanstack/react-query";
import { warpdriven_set_settings } from "@/api/wpadmin";
import type { Req, Res } from "@/api/wpadmin/warpdriven_set_settings";

export function useSettingsMutation() {
  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return warpdriven_set_settings(req);
    },
    onError(error) {
      console.error(error);
    },
    onSuccess() {},
  });
}
