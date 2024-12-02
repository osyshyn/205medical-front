import { instance } from "src/services/api-client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NotificationService } from "src/helpers/notifications";
import { IResponseWithPagination } from "src/@types/api";
import { IOrder } from "src/@types/users";

interface IOrderStore {
  recent_orders: IResponseWithPagination<IOrder[]>;
  fetchOrders: () => void;
  isLoading: boolean;
}

const useOrderStore = create(
  devtools<IOrderStore>((set) => ({
    recent_orders: null,
    isLoading: false,
    fetchOrders: async () => {
      set({ isLoading: true });
      try {
        const { data } =
          await instance.get<IResponseWithPagination<IOrder[]>>(
            "order/getOrders"
          );

        set({ recent_orders: data });
      } catch (error) {
        NotificationService.error();
      } finally {
        set({ isLoading: false });
      }
    },
    isLoadingFetch: false,
  }))
);

export default useOrderStore;
