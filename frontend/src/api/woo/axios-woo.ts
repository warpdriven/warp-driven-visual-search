// Axios Imports
import axios, { AxiosError } from "axios";

export const axiosWoo = axios.create({
  baseURL: "/wp-json/wc/v3",
  auth: {
    username: "ck_409188ba37831770d26c6b7611db7ed7e00d3048",
    password: "cs_994cbcddb290158e09dbbf490f147d7acc6dadde",
  },
  timeout: 1000 * 60,
});

axiosWoo.interceptors.request.use((config) => {
  return config;
});
axiosWoo.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err: AxiosError) => {
    console.error(err);
    throw new Error(err.message);
  }
);
