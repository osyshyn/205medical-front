import { instance } from "src/services/api-client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NotificationService } from "src/helpers/notifications";
import { IResponseWithPagination } from "src/@types/api";
import { IOrder } from "src/@types/orders";

interface FetchOrdersParams {
  search: string;
  current_page: number;
  year: string;
  month: string;
  location_ids?: string;
}

interface IOrderStore {
  orders: IResponseWithPagination<IOrder>;
  fetchOrders: (params: FetchOrdersParams) => void;
  isLoading: boolean;
}

export const ORDERS_PER_PAGE = 5;

const useOrderStore = create(
  devtools<IOrderStore>((set) => ({
    orders: null,
    isLoading: false,
    fetchOrders: async (values) => {
      set({ isLoading: true });

      const params = {
        location_ids:
          values.location_ids !== "" ? values.location_ids?.split(",") : [],
        ...values,
      };

      try {
        const { data } = await instance.get<IResponseWithPagination<IOrder>>(
          `order/getOrders?&items_per_page=${ORDERS_PER_PAGE}`,
          { params }
        );

        set({ orders: data });
      } catch (error) {
        NotificationService.error();
      } finally {
        set({ isLoading: false });
      }
    },
  }))
);

export default useOrderStore;
