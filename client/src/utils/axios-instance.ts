import axios, { AxiosRequestConfig } from 'axios';
import { HOST_API, STORAGE_KEY } from 'src/config-global';

const axiosInstance = axios.create({ baseURL: HOST_API });

const accessToken = sessionStorage.getItem(STORAGE_KEY);

axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
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
  auth: {
    me: (id: string) => `/users/${id}`,
    nonce: '/auth/nonce',
    login: '/auth/verify',
  },
  user: {
    get: (id: string) => `/users/${id}`,
    update: (id: string) => `/users/${id}`,
    delete: (id: string) => `/users/${id}`,
  },
  adverts: {
    create: '/advertisements',
    list: '/advertisements',
    get: (id: string) => `/advertisements/${id}`,
    update: (id: string) => `/advertisements/${id}`,
    delete: (id: string) => `/advertisements/${id}`,
  },
};
