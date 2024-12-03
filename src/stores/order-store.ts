import { instance } from "src/services/api-client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NotificationService } from "src/helpers/notifications";
import { IResponseWithPagination } from "src/@types/api";
import {
  IOrder,
  IRecentOrderTable,
  STATUSES_APPROVAL,
  STATUSES_SHIPS,
} from "src/@types/orders";

interface FetchOrdersParams {
  current_page: number;
  items_per_page: number;
  search: string;
}

interface IOrderStore {
  orders: IResponseWithPagination<IOrder>;
  recent_orders: IResponseWithPagination<IRecentOrderTable>;
  fetchOrders: (params: FetchOrdersParams) => void;
  isLoading: boolean;
}

const useOrderStore = create(
  devtools<IOrderStore>((set) => ({
    orders: null,
    recent_orders: null,
    isLoading: false,
    fetchOrders: async (params) => {
      set({ isLoading: true });
      try {
        const { data } = await instance.get<IResponseWithPagination<IOrder>>(
          "order/getOrders",
          {
            params,
          }
        );

        set({ orders: data });

        const recentOrders = data.result.map(
          ({
            id,
            order_number,
            location,
            order_amt,
            customer_po_number,
            expected_delivery_date,
            approval_status,
          }) => ({
            key: String(id),
            order_number,
            location,
            order_amt,
            customer_po_number,
            expected_delivery_date,
            approvalStatus: STATUSES_APPROVAL[approval_status],
            shipStatus: STATUSES_SHIPS[approval_status],
          })
        );

        set({
          recent_orders: {
            count: data.count,
            next: data.next,
            previous: data.previous,
            result: recentOrders,
          },
        });
      } catch (error) {
        NotificationService.error();
      } finally {
        set({ isLoading: false });
      }
    },
  }))
);

export default useOrderStore;
