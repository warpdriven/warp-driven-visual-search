import { axiosRecommender } from "./axiosRecommender";
import type { AxiosRequestConfig } from "axios";

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
  top_k: number;
  /**
   * @field rec_number
   * 1: home & cf;
   * 10: plp & cf;
   * 20: pdp & cf;
   * 21: pdp & cv;
   * 22: pdp & nlp;
   * 23: pdp & cf,nlp;
   */
  rec_number: number;
}

export type Res = Row[];

export interface Row {
  shop_product_id: string;
  count: number;
}
