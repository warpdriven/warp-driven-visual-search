// Axios Imports
import { AxiosRequestConfig } from "axios";
import { axiosWoo } from "./axios-woo";

export function get_products(req: AxiosRequestConfig) {
  return axiosWoo({
    ...req,
  });
}
