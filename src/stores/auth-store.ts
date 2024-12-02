import Cookies from "js-cookie";
import { instance } from "src/services/api-client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NotificationService } from "src/helpers/notifications";
import { ACCESS_TOKEN, AUTH_REFRESH_TOKEN } from "src/constants/cookiesKeys";
import { IAuthTokens } from "src/@types/auth";

interface LoginParams {
  email: string;
  password: string;
}

interface IAuthStore {
  isLoading: boolean;
  login: (values: LoginParams, onSuccess: () => void) => void;
  logout: (onSuccess: () => void) => void;
}

const useAuthStore = create(
  devtools<IAuthStore>((set) => ({
    isLoading: false,
    login: async (values, onSuccess) => {
      set({ isLoading: true });

      try {
        const { data } = await instance.post<IAuthTokens>(
          "user/login/",
          values
        );

        Cookies.set(ACCESS_TOKEN, data.access_token);
        Cookies.set(AUTH_REFRESH_TOKEN, data.refresh_token);

        set({ isLoading: false });

        onSuccess();
        NotificationService.success();
      } catch ({ response }) {
        const errorText = response?.data?.error;

        set({ isLoading: false });

        NotificationService.error(errorText);
      }
    },
    logout: () => {
      Cookies.remove(ACCESS_TOKEN);
      Cookies.remove(AUTH_REFRESH_TOKEN);
    },
  }))
);

export default useAuthStore;
