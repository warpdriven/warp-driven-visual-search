// Axios Imports
import axios, { AxiosError } from "axios";

export const axiosShopline = axios.create({
  baseURL: globalThis.location.origin,
  timeout: 1000 * 60,
  withCredentials: true,
});

axiosShopline.interceptors.request.use((config) => config);
axiosShopline.interceptors.response.use(
  (res) => {
    const { data } = res;
    return data;
  },
  (err: AxiosError) => {
    const { message } = err;
    throw new Error(message);
  }
);
