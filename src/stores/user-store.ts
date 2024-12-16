import Cookies from "js-cookie";
import { instance } from "src/services/api-client";
import { isTokenExpired } from "src/services/interceptors";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { AUTH_REFRESH_TOKEN } from "src/constants/cookiesKeys";
import { ILocation } from "src/@types/location";
import { IUser } from "src/@types/users";

interface IUserStore {
  user: IUser;
  users: IUser[];
  detailUser: IUser;
  // approvedLocations: ILocation[];
  approvedLocations: any[];
  userNotes: any[];
  getUserNotes: (id) => void;

  getUser: () => void;
  getAllUsers: () => void;
  getUserDetail: (id: string) => void;
  getUserApprovedLocations: (id: string) => void;
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
    users: [],
    detailUser: {} as IUser,

    isAuthorized: false,
    isLoading: true,
    approvedLocations: {} as ILocation[],
    userNotes: {} as any[],
    getUser: async () => {
      try {
        set({ isLoading: true });

        const refreshToken = Cookies.get(AUTH_REFRESH_TOKEN);

        if (!refreshToken || isTokenExpired(refreshToken)) {
          set({ isAuthorized: false, isLoading: false });
          return null;
        }

        const { data } = await instance.get<IUser>("/user/getUser");

        set({
          user: data,
          isAuthorized: true,
          isLoading: false,
        });
      } catch {
        set({ isAuthorized: false, isLoading: false });
      }
    },
    getAllUsers: async () => {
      try {
        const { data } = await instance.get<IUser[]>("/user/getAllUsers");
        set({ users: data });
      } catch {
        return [];
      }
    },
    getUserDetail: async (id) => {
      try {
        const { data } = await instance.get<IUser>(
          `/user/getUserDetail?id=${id}`
        );
        set({ detailUser: data });
        console.log("User: ", data);
      } catch {
        return [];
      }
    },
    getUserApprovedLocations: async (id) => {
      try {
        const { data } = await instance.get<ILocation[]>(
          `/user/getUserApprovedLocations?user_id=${id}`
        );
        set({ approvedLocations: data });
      } catch {
        return [];
      }
    },
    getUserNotes: async (id) => {
      try {
        const { data } = await instance.get<any[]>(
          `/user/getUserNotes?user_id=${id}`
        );
        set({ userNotes: data });
      } catch {
        return [];
      }
    },
  }))
);

export default useUserStore;
