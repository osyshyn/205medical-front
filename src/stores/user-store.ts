import Cookies from "js-cookie";
import { instance } from "src/services/api-client";
import { isTokenExpired } from "src/services/interceptors";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { AUTH_REFRESH_TOKEN } from "src/constants/cookiesKeys";
import { IUser } from "src/@types/users";
import avatarTemp from "./temp/temp_avatar.png";
import logoTemp from "./temp/temp_logo.png";

interface IUserStore {
  user: IUser;
  getUser: () => void;
  isAuthorized: boolean;
  isLoading: boolean;
}

const useUserStore = create(
  devtools<IUserStore>((set) => ({
    user: {
      id: 0,
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      google_id: undefined,
      role: undefined,
      purchase_limit: 0,
      created_at: "",
      updated_at: "",
      avatar: undefined,
      logo: undefined,
    },
    isAuthorized: false,
    isLoading: true,
    getUser: async () => {
      try {
        set({ isLoading: true });

        const refreshToken = Cookies.get(AUTH_REFRESH_TOKEN);

        if (!refreshToken || isTokenExpired(refreshToken)) {
          set({ isAuthorized: false, isLoading: false });
          return null;
        }

        const { data } = await instance.get<{ user: IUser }>("/user/getUser");

        set({
          user: {
            avatar: { path: avatarTemp },
            logo: { path: logoTemp },
            ...data.user,
          },
          isAuthorized: true,
          isLoading: false,
        });
      } catch {
        set({ isAuthorized: false, isLoading: false });
      }
    },
  }))
);

export default useUserStore;
