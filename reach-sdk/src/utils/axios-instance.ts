import axios, { AxiosRequestConfig } from "axios";
import { HOST_API } from "src/config-global";

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  // console.log("fetcher -> args", args);

  const [url, config] = Array.isArray(args) ? args : [args];
  // console.log("fetcher -> [url][config]", url, config);

  const res = await axiosInstance.get(url, { ...config });
  // console.log("fetcher -> res", res);

  return res.data;
};

export const endpoints = {
  clientSdk: {
    get: (id: string) => `/client-sdks/${id}`,
    update: (id: string) => `/client-sdks/${id}`,
  },
};
