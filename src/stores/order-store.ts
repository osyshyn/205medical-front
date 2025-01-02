import { instance } from "src/services/api-client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NotificationService } from "src/helpers/notifications";
import { IResponseWithPagination } from "src/@types/api";
import { IOrder, IOrderToApprove, IStatusesApproval } from "src/@types/orders";

export interface FetchOrdersParams {
  search: string;
  current_page: number;
  year: string;
  month: string;
  su_users_ids?: any[];
  location_ids?: string[];
  product_ids?: string[];
}

interface FetchOrdersToApproveParams {
  items_per_page: number;
  current_page: string;
  year: string;
  month: string;
}

interface IOrderStore {
  orders: IResponseWithPagination<IOrder>;
  fetchOrders: (params: FetchOrdersParams) => void;
  approvesOrders: any;
  fetchApprovesOrder: (params: FetchOrdersToApproveParams) => void;
  selectedApprovedOrders: any[];
  setSelectedApprovedOrders: (orders: any) => void;
  rejectOrApproveOrder: (id: number[], status: IStatusesApproval) => void;
  selectAllApprovedOrders: (orders: any) => void;

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

      try {
        const { data } = await instance.get<IResponseWithPagination<any>>(
          `order/getOrdersToApprove`,
          { params }
        );

        set((state) => ({
          approvesOrders: {
            result: [...(state.approvesOrders?.result || []), ...data.result],
            total: data.count,
          },
        }));
      } catch (error) {
        console.error("Ошибка при получении ordersToApprove:", error);
        NotificationService.error();
      } finally {
        set({ isLoading: false });
      }
    },

    selectedApprovedOrders: null,
    setSelectedApprovedOrders: (order) => {
      set((state) => {
        const isOrderSelected = state.selectedApprovedOrders?.some(
          (selectedOrder) => selectedOrder.id === order.id
        );

        return {
          selectedApprovedOrders: isOrderSelected
            ? state.selectedApprovedOrders.filter(
                (selectedOrder) => selectedOrder.id !== order.id
              )
            : [...(state.selectedApprovedOrders || []), order],
        };
      });
    },
    selectAllApprovedOrders: (orders) => {
      set((state) => {
        const allSelected =
          orders.length === state.selectedApprovedOrders?.length;
        return {
          selectedApprovedOrders: allSelected ? [] : orders,
        };
      });
    },

    rejectOrApproveOrder: async (id, status) => {
      try {
        await instance.post("order/approveOrders", {
          order_ids: id,
          status: status,
        });
      } catch (error) {
        NotificationService.error();
      }
    },
  }))
);

export default useOrderStore;
