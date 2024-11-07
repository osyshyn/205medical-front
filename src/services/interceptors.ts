import {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";
import { ACCES_TOKEN } from "src/constants/cookiesKeys";
import { UNAUTHORIZED_STATUS_CODE_401 } from "src/constants/httpStatuses";
import { PATHNAMES } from "src/constants/routes";
import { history } from "./history";

// AxiosRequestConfig
export const addAuthToken = (config) => {
  const token = Cookies.get(ACCES_TOKEN);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

export const removeAuthToken = (error: AxiosError) => {
  if (error.response.status === UNAUTHORIZED_STATUS_CODE_401) {
    Cookies.remove(ACCES_TOKEN);

    // if (!history.location.pathname.includes(PATHNAMES.AUTH)) {
    //   history.push(PATHNAMES.AUTH);
    // }
  }

  return Promise.reject(error);
};
