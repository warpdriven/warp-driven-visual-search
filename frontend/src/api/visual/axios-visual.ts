// Axios Imports
import axios, { AxiosError } from "axios";

export const axiosVisual = axios.create({
  baseURL: import.meta.env.VITE_VS_URL,
  timeout: 1000 * 60,
});

axiosVisual.interceptors.request.use((config) => {
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
