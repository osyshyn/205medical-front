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
  location_ids?: string[];
  product_ids?: string[];
}

interface FetchOrdersToApproveParams {
  current_page: string;
  year: string;
  month: string;
}

interface IOrderStore {
  orders: IResponseWithPagination<IOrder>;
  fetchOrders: (params: FetchOrdersParams) => void;
  approvesOrders: any;
  fetchApprovesOrder: (params: FetchOrdersToApproveParams) => void;

  isLoading: boolean;
}

export const ORDERS_PER_PAGE = 5;

const useOrderStore = create(
  devtools<IOrderStore>((set) => ({
    orders: null,
    isLoading: false,
    fetchOrders: async (params) => {
      set({ isLoading: true });

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

    approvesOrders: null,
    fetchApprovesOrder: async (params) => {
      set({ isLoading: true });
      console.log("Передаваемые параметры:", params); // Для отладки

      try {
        const { data } = await instance.get<any>(
          `order/getOrdersToApprove?&items_per_page=${ORDERS_PER_PAGE}`,
          {
            params: {
              current_page: params.current_page,
              month: params.month,
              year: params.year,
            },
          }
        );

        console.log("Ответ от сервера:", data);

        set({ approvesOrders: data });
      } catch (error) {
        console.error("Ошибка при получении ordersToApprove:", error); // Добавьте лог ошибки
        NotificationService.error();
      } finally {
        set({ isLoading: false });
      }
    },
  }))
);

export default useOrderStore;
