import { instance } from "src/services/api-client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NotificationService } from "src/helpers/notifications";
import { IAlert } from "src/@types/alert";
import { IResponseWithPagination } from "src/@types/api";

interface FetchAlertsParams {
  type: string;
  current_page: number;
  items_per_page: number;
  search: string;
}

interface IAlertsStore {
  alerts: IResponseWithPagination<IAlert>;
  fetchAlerts: (params: FetchAlertsParams) => void;
  isLoading: boolean;
  deleteAlert: (id: number) => void;
}

export const ALERTS_PER_PAGE = 5;

const useAlertsStore = create(
  devtools<IAlertsStore>((set) => ({
    alerts: null,
    isLoading: false,
    fetchAlerts: async (params) => {
      set({ isLoading: true });
      try {
        const { data } = await instance.get<IResponseWithPagination<IAlert>>(
          `alert/get?&type=${params.type}`,
          { params }
        );
        set({ alerts: data });
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
  }))
);

export default useAlertsStore;
