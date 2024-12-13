import Cookies from "js-cookie";
import { instance } from "src/services/api-client";
import { history } from "src/services/history";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NotificationService } from "src/helpers/notifications";
import {
  ACCESS_TOKEN,
  AUTH_REFRESH_TOKEN,
  EMAIL,
} from "src/constants/cookiesKeys";
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

interface CheckOtpParams {
  otp: string;
}

interface ChangePasswordParams {
  new_password: string;
  confirm_password: string;
}

interface UpdateSettingParams {
  email?: string;
  phone?: string;
  new_password?: string;
  confirm_password?: string;
}

interface GoogleParams {
  google_id: string;
}

interface IAuthStore {
  isLoading: boolean;
  login: (values: LoginParams, onSuccess: () => void) => void;
  logout: () => void;
  recoveryPassword: (
    values: RecoveryPasswordParams,
    onSuccess: () => void
  ) => void;
  checkOtp: (values: CheckOtpParams, onSuccess: () => void) => void;
  changePassword: (values: ChangePasswordParams, onSuccess: () => void) => void;
  sendCodeAgain: () => void;
  isLoadingRecoveryPassword: boolean;
  isLoadingSendCodeAgain: boolean;
  updateSetting: (values: UpdateSettingParams) => void;
  isLoadingUpdateSetting: boolean;
  loginWithGoogle: (values: GoogleParams, onSuccess: () => void) => void;
  connectGoogle: (values: GoogleParams) => void;
  disConnectGoogle: (values: GoogleParams) => void;
  isLoadingGoogle: boolean;
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
      useUserStore.getState().getUser();
      history.replace(PATHNAMES.LOGIN);
    },
    isLoadingRecoveryPassword: false,
    recoveryPassword: async (values, onSuccess) => {
      set({ isLoadingRecoveryPassword: true });

      try {
        await instance.post("user/recoveryPassword/", values);

        Cookies.set(EMAIL, values.email);

        set({ isLoadingRecoveryPassword: false });
        onSuccess();
        NotificationService.success();
      } catch ({ response }) {
        const errorText = response?.data?.error;
        set({ isLoadingRecoveryPassword: false });
        NotificationService.error(errorText);
      }
    },
    isLoadingSendCodeAgain: false,
    sendCodeAgain: async () => {
      set({ isLoadingSendCodeAgain: true });

      try {
        await instance.post("user/recoveryPassword/", {
          email: Cookies.get(EMAIL),
        });

        set({ isLoadingSendCodeAgain: false });
        NotificationService.success();
      } catch ({ response }) {
        const errorText = response?.data?.error;
        set({ isLoadingSendCodeAgain: false });
        NotificationService.error(errorText);
      }
    },
    checkOtp: async (values, onSuccess) => {
      set({ isLoadingRecoveryPassword: true });

      try {
        await instance.post("user/recoveryPasswordCheckOtp", {
          email: Cookies.get(EMAIL),
          ...values,
        });

        set({ isLoadingRecoveryPassword: false });
        onSuccess();
        NotificationService.success();
      } catch ({ response }) {
        const errorText = response?.data?.error;
        set({ isLoadingRecoveryPassword: false });
        NotificationService.error(errorText);
      }
    },
    changePassword: async (values, onSuccess) => {
      set({ isLoadingRecoveryPassword: true });

      try {
        await instance.post("user/recoveryPasswordChangePassword", {
          email: Cookies.get(EMAIL),
          ...values,
        });

        Cookies.remove(EMAIL);

        set({ isLoadingRecoveryPassword: false });
        onSuccess();
        NotificationService.success();
      } catch ({ response }) {
        const errorText = response?.data?.error;
        set({ isLoadingRecoveryPassword: false });
        NotificationService.error(errorText);
      }
    },
    isLoadingUpdateSetting: false,
    updateSetting: async (values) => {
      set({ isLoadingUpdateSetting: true });

      try {
        await instance.post("user/updateSetting", values);

        set({ isLoadingUpdateSetting: false });
        NotificationService.success();
      } catch ({ response }) {
        const errorText = response?.data?.error;
        set({ isLoadingUpdateSetting: false });
        NotificationService.error(errorText);
      }
    },
    isLoadingGoogle: false,
    loginWithGoogle: async (values, onSuccess) => {
      set({ isLoadingGoogle: true });

      try {
        const { data } = await instance.post<IAuthTokens>(
          "user/socialLogin/",
          values
        );

        Cookies.set(ACCESS_TOKEN, data.access_token);
        Cookies.set(AUTH_REFRESH_TOKEN, data.refresh_token);

        set({ isLoadingGoogle: false });

        onSuccess();
        NotificationService.success();
      } catch ({ response }) {
        const errorText = response?.data?.error;
        set({ isLoadingGoogle: false });
        NotificationService.error(errorText);
      }
    },
    connectGoogle: async (values) => {
      set({ isLoadingGoogle: true });
      try {
        await instance.post("user/bindingUserSocial", values);

        set({ isLoadingGoogle: false });

        NotificationService.success();
      } catch ({ response }) {
        const errorText = response?.data?.error;
        set({ isLoadingGoogle: false });
        NotificationService.error(errorText);
      }
    },
    disConnectGoogle: async (values) => {
      set({ isLoadingGoogle: true });
      try {
        await instance.post("user/unBindingUserSocial", values);

        set({ isLoadingGoogle: false });

        NotificationService.success();
      } catch ({ response }) {
        const errorText = response?.data?.error;
        set({ isLoadingGoogle: false });
        NotificationService.error(errorText);
      }
    },
  }))
);

export default useAuthStore;
