import { axiosWpadmin } from "./axios-wpadmin";
import type { AxiosRequestConfig } from "axios";

export function warpdriven_set_settings(req: Req) {
  const { params, ...restReq } = req;

  return axiosWpadmin<unknown, Res>({
    method: "POST",
    params: {
      action: "warpdriven_set_settings",
      ...params,
    },
    ...restReq,
  });
}

export type Req = AxiosRequestConfig<Data>;

export interface Data {
  wd_api_key: string;
  wd_data_server_key: string;
  wd_data_server: string;
  wd_custom_js: string;
  wd_is_test_mode: string;
}

export interface Res {
  status: number;
  msg: string;
}
