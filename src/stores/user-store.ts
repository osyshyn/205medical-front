import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IOrder, Users } from "src/@types/user";
import { ORDER_DATA } from "./temp/constants";
import logo from "./temp/temp_logo.png";

interface IUserStore {
  type: Users;
  name: string;
  logo: string;
  recent_orders: IOrder[];
}

const useUserStore = create(
  devtools<IUserStore>((set) => ({
    type: Users.SUB_USER,
    name: "Japp",
    logo: logo,
    recent_orders: ORDER_DATA,
  }))
);

export default useUserStore;
