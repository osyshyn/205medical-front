import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Users } from "src/@types/user";
import logo from "./temp/temp_logo.png";

interface IUserStore {
  type: Users;
  name: string;
  logo: string;
}

const useUserStore = create(
  devtools<IUserStore>((set) => ({
    type: Users.SUB_USER,
    name: "Japp",
    logo: logo,
  }))
);

export default useUserStore;
