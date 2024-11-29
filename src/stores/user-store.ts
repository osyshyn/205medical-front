import Cookies from "js-cookie";
// import { instance } from "src/services/api-client";
import { isTokenExpired } from "src/services/interceptors";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NotificationService } from "src/helpers/notifications";
import { AUTH_REFRESH_TOKEN } from "src/constants/cookiesKeys";
import { TypesUsers } from "src/@types/users";
import logo from "./temp/temp_logo.png";

interface IUserStore {
  type: TypesUsers;
  name: string;
  logo: string;
  getClient: () => void;
  isAuthorized: boolean;
  isLoading: boolean;
}

const useUserStore = create(
  devtools<IUserStore>((set) => ({
    type: TypesUsers.SUB_USER,
    name: "Japp",
    logo: logo,
    getClient: async () => {
      try {
        const refreshToken = Cookies.get(AUTH_REFRESH_TOKEN);
        const isRefreshTokenExpired = isTokenExpired(refreshToken);

        if (isRefreshTokenExpired) return null;

        // const { data } = await instance.get("/user/getUser");
        const data = true;

        set({ isAuthorized: Boolean(data) });

        return data;
      } catch ({ response }) {
        const errorText = response?.data?.error;

        set({ isAuthorized: false });

        NotificationService.error(errorText);
      }
    },
    isAuthorized: false,
    isLoading: false,
  }))
);

export default useUserStore;
