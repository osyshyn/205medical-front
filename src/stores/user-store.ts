import Cookies from "js-cookie";
import { instance } from "src/services/api-client";
import { isTokenExpired } from "src/services/interceptors";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { AUTH_REFRESH_TOKEN } from "src/constants/cookiesKeys";
import { IUser } from "src/@types/users";
import logo from "./temp/temp_logo.png";

interface IUserStore extends IUser {
  logo: string;
  getUser: () => void;
  isAuthorized: boolean;
  isLoading: boolean;
}

const useUserStore = create(
  devtools<IUserStore>((set) => ({
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    google_id: undefined,
    role: undefined,
    purchase_limit: 0,
    created_at: "",
    updated_at: "",
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

        const { data } = await instance.get<{ user: IUser }>("/user/getUser");

        const {
          id,
          first_name,
          last_name,
          email,
          phone,
          password,
          google_id,
          role,
          purchase_limit,
          created_at,
          updated_at,
        } = data.user;

        set({
          id,
          first_name,
          last_name,
          email,
          phone,
          password,
          google_id,
          role,
          purchase_limit,
          created_at,
          updated_at,
          isAuthorized: Boolean(data),
          isLoading: false,
        });
      } catch {
        set({ isAuthorized: false, isLoading: false });
      }
    },
  }))
);

export default useUserStore;
