// Axios Imports
import { AxiosRequestConfig } from "axios";
import { axiosWoo } from "./axios-woo";

export function get_products(req: AxiosRequestConfig) {
  return axiosWoo<unknown, Res>({
    ...req,
  });
}

export type Res = Product;

export interface Product {
  id: number;
  name: string;
  price: string;
  permalink: string;
  images: Image[];
  on_sale: boolean;
  purchasable: boolean;
  variations: number[];
}

export interface Image {
  id: number;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  src: string;
  name: string;
  alt: string;
}
