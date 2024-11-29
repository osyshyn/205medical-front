import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IOrder } from "src/@types/users";
import { ORDER_DATA } from "./temp/constants";

interface IOrderStore {
  recent_orders: IOrder[];
  isLoading: boolean;
}

const useOrderStore = create(
  devtools<IOrderStore>((set) => ({
    recent_orders: ORDER_DATA,
    isLoading: false,
  }))
);

export default useOrderStore;
