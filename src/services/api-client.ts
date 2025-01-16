import axios from "axios";
// import axiosRetry from "axios-retry";
import { addAccessToken, updateAccessToken } from "./interceptors";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // baseURL: "https://app-api.205medical.com/",
});

// const RETRY_COUNT = 3;
// axiosRetry(instance, {
//   retries: RETRY_COUNT,
//   retryDelay: (retryCount) => retryCount * 200, // time interval between retries,
//   retryCondition: (error) => Boolean(error),
// });

instance.interceptors.request.use(addAccessToken);
instance.interceptors.response.use((config) => config, updateAccessToken);
