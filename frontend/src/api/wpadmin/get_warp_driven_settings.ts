// Axios Imports
import { AxiosRequestConfig } from "axios";
import { axiosWpadmin } from "./axios-wpadmin";

export function get_warp_driven_settings(req: AxiosRequestConfig) {
  return axiosWpadmin<unknown, Res>({
    params: {
      action: "get_warp_driven_settings",
    },
    ...req,
  });
}

export interface Res {
  api_key: string;
  data_server_key: string;
  data_server: string;
  custom_js: string;
  is_test_mode: boolean;
  consumer_key: string;
  consumer_secret: string;
}
