// Axios Imports
import { axiosWpadmin } from "./axios-wpadmin";
import { AxiosRequestConfig } from "axios";

export function warpdriven_get_settings(req: Req) {
  const { params, ...restReq } = req;

  return axiosWpadmin<unknown, Res>({
    params: {
      action: "warpdriven_get_settings",
      ...params,
    },
    ...restReq,
  });
}

export type Req = AxiosRequestConfig;

export interface Res {
  wd_api_key: string;
  wd_data_server_key: string;
  wd_data_server: string;
  wd_custom_js: string;
  wd_is_test_mode: string;
}
