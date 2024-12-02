import Cookies from "js-cookie";
import { instance } from "src/services/api-client";
import { isTokenExpired } from "src/services/interceptors";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { AUTH_REFRESH_TOKEN } from "src/constants/cookiesKeys";
import { TypesUsers } from "src/@types/users";
import logo from "./temp/temp_logo.png";

interface IUserStore {
  type: TypesUsers;
  name: string;
  logo: string;
  getUser: () => void;
  isAuthorized: boolean;
  isLoading: boolean;
}

const useUserStore = create(
  devtools<IUserStore>((set) => ({
    type: TypesUsers.SUB_USER,
    name: "Japp",
    logo: logo,
    isAuthorized: false,
    isLoading: true,
    getUser: async () => {
      try {
        set({ isLoading: true });

        const refreshToken = Cookies.get(AUTH_REFRESH_TOKEN);
        const isRefreshTokenExpired = isTokenExpired(refreshToken);

        if (isRefreshTokenExpired) {
          set({ isAuthorized: false });
          set({ isLoading: false });

          return null;
        }

        const { data } = await instance.get("/user/getUser");

        set({ isAuthorized: Boolean(data) });
        set({ isLoading: false });

        return data;
      } catch {
        set({ isAuthorized: false });
        set({ isLoading: false });
      }
    },
  }))
);

export default useUserStore;
