import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IOrder, Users } from "src/@types/user";
import { ORDER_DATA } from "./temp";

interface IUserStore {
  type: Users;
  name: string;
  recent_orders: IOrder[];
}

const useUserStore = create(
  devtools<IUserStore>(() => ({
    type: Users.SUB_USER,
    name: "Japp",
    recent_orders: ORDER_DATA,
  }))
);

export default useUserStore;

