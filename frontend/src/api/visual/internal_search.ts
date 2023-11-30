// Axios Imports
import { axiosVisual } from "./axios-visual";
import { AxiosRequestConfig } from "axios";

export function internal_search(req: Req) {
  return axiosVisual<unknown, Res>({
    url: "/internal_search",
    method: "POST",
    ...req,
  });
}

export interface Req extends AxiosRequestConfig {
  params: Params;
}

export interface Params {
  shop_variant_id: string;
  top_k: number;
}

export type Res = Product[];
export interface Product {
  product_id: string;
  recall_type: string;
  score: number;
  shop_variant_id: string;
  handle: string;
}
