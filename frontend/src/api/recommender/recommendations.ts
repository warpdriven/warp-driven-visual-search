// Axios Imports
import { AxiosRequestConfig } from "axios";
import { axiosRecommender } from "./axiosRecommender";

export function recommendations(req: Req) {
  return axiosRecommender<unknown, Res>({
    url: "/recommender/recommendations",
    ...req,
  });
}

export type Req = AxiosRequestConfig & {
  params: Params;
};

export interface Params {
  shop_product_id: string | number;
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
