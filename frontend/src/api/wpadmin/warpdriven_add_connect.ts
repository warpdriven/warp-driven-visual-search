// Axios Imports
import { AxiosRequestConfig } from "axios";
import { axiosWpadmin } from "./axios-wpadmin";

export function warpdriven_add_connect(req: Req) {
  const { params, ...restReq } = req;

  return axiosWpadmin<unknown, Res>({
    method: "POST",
    params: {
      action: "warpdriven_add_connect",
      ...params,
    },
    ...restReq,
  });
}

export type Req = AxiosRequestConfig<Data>;

export interface Data {
  access_token: string;
  site_url: string;
}

export interface Res {
  [key: string]: never;
}
