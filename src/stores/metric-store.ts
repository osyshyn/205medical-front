import { SVGReactComponent } from "src/@types";
import { instance } from "src/services/api-client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NotificationService } from "src/helpers/notifications";
import { ReactComponent as ClockIcon } from "src/assets/icons/clock.svg";
import { ReactComponent as DeliveryIcon } from "src/assets/icons/delivery.svg";
import { ReactComponent as MarkIcon } from "src/assets/icons/mark.svg";
import { ReactComponent as TruckIcon } from "src/assets/icons/truck.svg";
import {
  IMetrics,
  IMetricsData,
  IMetricsDataFromAPI,
  IMetricsFromAPI,
} from "src/@types/metrics";

const getMetrics = (
  metricsFromAPI: IMetricsFromAPI,
  customizations: Array<{ id: number; icon: SVGReactComponent; color: string }>
): IMetrics => {
  return {
    title: metricsFromAPI.title,
    metrics: metricsFromAPI.metrics.map((metric) => {
      const customization = customizations.find(
        (item) => item.id === metric.id
      );

      return {
        id: metric.id,
        label: metric.label,
        value: metric.value,
        trend: metric.trend,
        icon: customization?.icon || null, // Прокинута іконка
        color: customization?.color || "#000000", // Прокинутий колір або дефолтний
      };
    }),
  };
};

interface FetchMetricsParams {
  month: number;
  year: number;
}

interface IMetricStore {
  metrics: IMetricsData;
  fetchMetrics: (params: FetchMetricsParams) => void;
  isLoading: boolean;
}

const useMetricStore = create(
  devtools<IMetricStore>((set) => ({
    isLoading: false,
    metrics: null,
    fetchMetrics: async (params) => {
      set({ isLoading: true });
      try {
        const { data } = await instance.get<IMetricsDataFromAPI>(
          "order/countOrdersPerMonth",
          { params }
        );

        const approvalCustomizations = [
          { id: 1, icon: MarkIcon, color: "#108A00" },
          { id: 2, icon: ClockIcon, color: "#F4C732" },
        ];

        const shipmentCustomizations = [
          { id: 1, icon: TruckIcon, color: "#DF0404" },
          { id: 2, icon: DeliveryIcon, color: "#348ECF" },
        ];

        const approvalMetrics = getMetrics(
          data.approval_metrics,
          approvalCustomizations
        );
        const shipmentMetrics = getMetrics(
          data.shipments_metrics,
          shipmentCustomizations
        );

        set({
          metrics: {
            approval_metrics: approvalMetrics,
            shipments_metrics: shipmentMetrics,
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

export default useMetricStore;
