import Cookies from "js-cookie";
import { instance } from "src/services/api-client";
import { history } from "src/services/history";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NotificationService } from "src/helpers/notifications";
import { ACCESS_TOKEN, AUTH_REFRESH_TOKEN } from "src/constants/cookiesKeys";
import { PATHNAMES } from "src/constants/routes";
import { IAuthTokens } from "src/@types/auth";

interface LoginParams {
  email: string;
  password: string;
}

interface IAuthStore {
  login: (values: LoginParams, onSuccess: () => void) => void;
  logout: () => void;
}

const useAuthStore = create(
  devtools<IAuthStore>((set) => ({
    login: async (values, onSuccess) => {
      try {
        const { data } = await instance.post<IAuthTokens>("user/login", values);

        Cookies.set(ACCESS_TOKEN, data.access_token);
        Cookies.set(AUTH_REFRESH_TOKEN, data.refresh_token);

        onSuccess();
        NotificationService.success();
      } catch ({ response }) {
        const errorText = response?.data?.error;
        NotificationService.error(errorText);
      }
    },
    logout: () => {
      Cookies.remove(ACCESS_TOKEN);
      Cookies.remove(AUTH_REFRESH_TOKEN);
      history.replace(PATHNAMES.LOGIN);
    },
  }))
);

export default useAuthStore;