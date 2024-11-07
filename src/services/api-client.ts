import axios, { AxiosRequestConfig } from "axios";
import { addAuthToken, removeAuthToken } from "./interceptors";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// спробувтаи все в 1 об'єднати
instance.interceptors.request.use(addAuthToken);
instance.interceptors.response.use(undefined, removeAuthToken);
