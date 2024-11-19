import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ILocation, IOrder, Users } from "src/@types/user";
import { LOCATION_DATA, ORDER_DATA } from "./temp";

interface IUserStore {
  type: Users;
  name: string;
  recent_orders: IOrder[];
  locations: ILocation[];
}

const useUserStore = create(
  devtools<IUserStore>(() => ({
    type: Users.SUB_USER,
    name: "Japp",
    recent_orders: ORDER_DATA,
    locations: LOCATION_DATA
  }))
);

export default useUserStore;
