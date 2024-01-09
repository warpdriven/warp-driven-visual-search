// Axios Imports
import { AxiosRequestConfig } from "axios";
import { axiosRecommender } from "./axiosRecommender";

export function get_cf_recommendations(req: Req) {
  return axiosRecommender<unknown, Res>({
    url: "/recommender/get_cf_recommendations",
    ...req,
  });
}

export type Req = AxiosRequestConfig & {
  params: Params;
};

export interface Params {
  shop_product_id: string | number;
  top_k: string | number;
  user_id: string;
  recalls?: "cv" | "cf" | "cv|cf" | "cf|cv";
}

export interface Res {
  data: Row[];
  msg: string;
  status: boolean;
}

export interface Row {
  shop_product_id: string;
  score: number;
}
