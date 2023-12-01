// Axios Imports
import { AxiosRequestConfig } from "axios";
import { axiosWpadmin } from "./axios-wpadmin";

export function warpdriven_recs_settings(req: Req) {
  return axiosWpadmin<unknown, Res, Data>({
    params: {
      action: "warpdriven_recs_settings",
    },
    ...req,
  });
}

export type Req = AxiosRequestConfig<Data>;
export type Res = Data;
export interface Data {
  api_key: string;
  custom_js: string;
  data_server: string;
  data_server_key: string;
  is_test_mode: boolean;
}
