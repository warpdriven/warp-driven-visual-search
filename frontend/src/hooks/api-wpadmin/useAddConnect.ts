// Query Imports
import { useMutation } from "@tanstack/react-query";
import { warpdriven_add_connect } from "@/api/wpadmin";
import { Req, Res } from "@/api/wpadmin/warpdriven_add_connect";

// Toast Imports
import toast from "react-hot-toast";

export function useAddConnect() {
  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return warpdriven_add_connect(req);
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      console.log(data);
    },
  });
}
