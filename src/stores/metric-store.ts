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
  IMetricProduct,
  IMetrics,
  IMetricsData,
  IMetricsDataFromAPI,
  IMetricsFromAPI,
} from "src/@types/metrics";

const approvalCustomizations = [
  { id: 1, icon: MarkIcon, color: "#108A00" },
  { id: 2, icon: ClockIcon, color: "#F4C732" },
];

const shipmentCustomizations = [
  { id: 1, icon: TruckIcon, color: "#DF0404" },
  { id: 2, icon: DeliveryIcon, color: "#348ECF" },
];

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
        icon: customization?.icon || null,
        color: customization?.color || "#000000",
      };
    }),
  };
};

interface FetchMetricsParams {
  month: string;
  year: string;
  location_ids?: string[];
  su_users_ids?: string[];
}

interface FetchMetricsProductsParams extends FetchMetricsParams {
  product_ids: string[];
}

interface FetchMetricsInvoiceParams {
  location_ids: string[];
  su_users_ids: string[];
}

interface IMetricStore {
  metrics_orders: IMetricsData;
  fetchMetricOrders: (params: FetchMetricsParams) => void;
  metrics_shipments: IMetricsData;
  fetchMetricShipments: (params: FetchMetricsParams) => void;
  isLoading: boolean;

  metrics_products: IMetricProduct;
  fetchMetricProducts: (params: FetchMetricsProductsParams) => void;
  isLoadingProducts: boolean;

  monthlyPurchases: { total_amount: number };
  fetchMonthlyPurchases: (params: FetchMetricsInvoiceParams) => void;
  openInvoiceTotal: { total_amount: number };
  fetchOpenInvoiceTotal: (params: FetchMetricsInvoiceParams) => void;
  isLoadingInvoice: boolean;
}

const useMetricStore = create(
  devtools<IMetricStore>((set) => ({
    isLoading: false,
    metrics_orders: null,
    fetchMetricOrders: async (params) => {
      set({ isLoading: true });
      try {
        const { data } = await instance.get<IMetricsDataFromAPI>(
          "order/countOrdersPerMonth",
          { params }
        );

        const approvalMetrics = getMetrics(
          data.approval_metrics,
          approvalCustomizations
        );
        const shipmentMetrics = getMetrics(
          data.shipments_metrics,
          shipmentCustomizations
        );

        set({
          metrics_orders: {
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
    metrics_shipments: null,
    fetchMetricShipments: async (params) => {
      set({ isLoading: true });
      try {
        const { data } = await instance.get<IMetricsDataFromAPI>(
          "shipment/getMetrics",
          { params }
        );

        const approvalMetrics = getMetrics(
          data.approval_metrics,
          approvalCustomizations
        );
        const shipmentMetrics = getMetrics(
          data.shipments_metrics,
          shipmentCustomizations
        );

        set({
          metrics_shipments: {
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

    isLoadingProducts: false,
    metrics_products: null,
    fetchMetricProducts: async (params) => {
      set({ isLoadingProducts: true });
      try {
        const { data } = await instance.get<IMetricProduct>("product/metrics", {
          params,
        });

        set({ metrics_products: data });
      } catch (error) {
        NotificationService.error();
      } finally {
        set({ isLoadingProducts: false });
      }
    },
    isLoadingInvoice: false,
    monthlyPurchases: { total_amount: 0 },
    fetchMonthlyPurchases: async () => {
      set({ isLoadingInvoice: true });
      try {
        const { data } = await instance.get("invoice/metricsMonthly");
        set({ monthlyPurchases: data });
      } catch (error) {
        NotificationService.error();
      } finally {
        set({ isLoadingInvoice: false });
      }
    },
    openInvoiceTotal: { total_amount: 0 },
    fetchOpenInvoiceTotal: async () => {
      set({ isLoadingInvoice: true });
      try {
        const { data } = await instance.get("invoice/metricsTotal");
        set({ openInvoiceTotal: data });
      } catch (error) {
        NotificationService.error();
      } finally {
        set({ isLoadingInvoice: false });
      }
    },
  }))
);

export default useMetricStore;
