import { instance } from "src/services/api-client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NotificationService } from "src/helpers/notifications";
import { IAlert, IAlertType } from "src/@types/alert";
import { IResponseWithPagination } from "src/@types/api";

interface FetchAlertsParams {
  type: string;
  current_page: number;
  items_per_page: number;
  search: string;
}

interface UpdateAlertParams {
  order_pending: boolean;
  order_rejected: boolean;
  order_approval: boolean;
  invoice_paid: boolean;
}

interface RepALerts {
  orders: IResponseWithPagination<IAlert>;
  shipments: IResponseWithPagination<IAlert>;
}

interface IAlertsStore {
  alerts: IResponseWithPagination<IAlert>;
  reportingAlerts: RepALerts;
  fetchAlerts: (params: FetchAlertsParams) => void;
  isLoading: boolean;
  deleteAlert: (id: number) => void;
  updateOrderAlertSetting: (params: UpdateAlertParams) => void;
}

export const ALERTS_PER_PAGE = 5;

const useAlertsStore = create(
  devtools<IAlertsStore>((set) => ({
    alerts: null,
    isLoading: false,
    reportingAlerts: { orders: null, shipments: null },
    fetchAlerts: async (params) => {
      set({ isLoading: true });
      try {
        const { data } = await instance.get<IResponseWithPagination<IAlert>>(
          `alert/get`,
          { params }
        );
        set({ alerts: data });
        set((state) => ({
          reportingAlerts: {
            ...state.reportingAlerts, // Сохраняем текущие данные для orders и shipments
            [params.type === IAlertType.ORDER ? "orders" : "shipments"]: data,
          },
        }));
      } catch (error) {
        NotificationService.error();
      } finally {
        set({ isLoading: false });
      }
    },
    deleteAlert: async (id) => {
      set({ isLoading: true });
      try {
        await instance.post("alert/delete", { id });
        NotificationService.success("Alert deleted successfully.");

        set((state) => {
          if (state.alerts) {
            const updatedAlerts = state.alerts.result.filter(
              (alert) => alert.id !== id
            );
            return {
              alerts: {
                ...state.alerts,
                result: updatedAlerts,
                count: state.alerts.count - 1,
              },
            };
          }
          return {};
        });
      } catch (error) {
        NotificationService.error("Failed to delete alert.");
      } finally {
        set({ isLoading: false });
      }
    },
    updateOrderAlertSetting: async (params) => {
      set({ isLoading: true });
      try {
        await instance.post(`alert/updateOrderAlertSetting`, {
          params,
        });
      } catch (error) {
        NotificationService.error();
      } finally {
        set({ isLoading: false });
      }
    },
  }))
);

export default useAlertsStore;
