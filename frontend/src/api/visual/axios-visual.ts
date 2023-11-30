// Axios Imports
import axios, { AxiosError } from "axios";

// Utils Imports
import { getJsonSettings } from "@/utils";

export const axiosVisual = axios.create({
  baseURL: import.meta.env.VITE_VS_URL,
  timeout: 1000 * 60,
});

axiosVisual.interceptors.request.use((config) => {
  const settings = getJsonSettings();

  config.headers.set("X-API-Key", settings?.recommender_api_key);

  return config;
});
axiosVisual.interceptors.response.use(
  (res) => {
    const { data } = res;
    return data;
  },
  (err: AxiosError) => {
    const { message } = err;
    throw new Error(message);
  }
);
