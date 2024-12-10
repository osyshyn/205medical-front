import Cookies from "js-cookie";
import { instance } from "src/services/api-client";
import { history } from "src/services/history";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NotificationService } from "src/helpers/notifications";
import { ACCESS_TOKEN, AUTH_REFRESH_TOKEN } from "src/constants/cookiesKeys";
import { PATHNAMES } from "src/constants/routes";
import { IAuthTokens } from "src/@types/auth";
import useUserStore from "./user-store";

interface LoginParams {
  email: string;
  password: string;
}

interface RecoveryPasswordParams {
  email: string;
}

interface IAuthStore {
  isLoading: boolean;
  login: (values: LoginParams, onSuccess: () => void) => void;
  logout: () => void;
  recoveryPassword: (
    values: RecoveryPasswordParams,
    onSuccess: () => void
  ) => void;
  isLoadingRecoveryPassword: boolean;
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
      NotificationService.success();
      useUserStore.getState().isAuthorized = false;
      history.replace(PATHNAMES.LOGIN);
    },
    isLoadingRecoveryPassword: false,
    recoveryPassword: async (values, onSuccess) => {
      set({ isLoadingRecoveryPassword: true });

      try {
        await instance.post("user/recoveryPassword/", values);

        set({ isLoadingRecoveryPassword: false });
        onSuccess();
        NotificationService.success();
      } catch ({ response }) {
        const errorText = response?.data?.error;
        set({ isLoadingRecoveryPassword: false });
        NotificationService.error(errorText);
      }
    },
  }))
);

export default useAuthStore;
