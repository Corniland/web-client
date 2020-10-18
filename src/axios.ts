import axios from "axios";

import store from "@/store";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  config.baseURL = process.env.VUE_APP_API_ENDPOINT;
  const token = store.getters.authentication.jwt;
  if (!config.headers.Authorization && token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
