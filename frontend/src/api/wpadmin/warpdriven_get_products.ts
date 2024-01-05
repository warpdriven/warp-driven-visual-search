// Axios Imports
import { axiosWpadmin } from "./axios-wpadmin";
import { AxiosRequestConfig } from "axios";

export function warpdriven_get_products(req: Req) {
  const { params, ...restReq } = req;

  return axiosWpadmin<unknown, Res, Data>({
    method: "POST",
    params: {
      action: "warpdriven_get_products",
      ...params,
    },
    ...restReq,
  });
}

export type Req = AxiosRequestConfig<Data>;

export interface Data {
  ids: number[];
}

export type Res = Record<string, Product>;

export interface Product {
  product_id: number;
  product_title: string;
  productlink: string;
  main_image_url: string;
  product_price: string;

  product_sku: string;
  keywords: string[];
  product_image_html: string;
  product_description: string;
  product_short_description: string;
}
