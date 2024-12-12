import { SVGReactComponent } from ".";

interface ITrend {
  value: number;
  direction: "up" | "down";
  description: string;
}

export interface IBaseMetric {
  id: number;
  label: string;
  value: number;
  trend?: ITrend;
}

export interface IMetricsFromAPI {
  title: string;
  metrics: IBaseMetric[];
}

export interface IMetricsDataFromAPI {
  approval_metrics: IMetricsFromAPI;
  shipments_metrics: IMetricsFromAPI;
}

export interface IMetric extends IBaseMetric {
  icon: SVGReactComponent;
  color: string;
}

export interface IMetrics {
  title: string;
  metrics: IMetric[];
}

export interface IMetricsData {
  approval_metrics: IMetrics;
  shipments_metrics: IMetrics;
}

export interface IMetricProductData {
  order_date: number;
  total_amount: number;
  total_quantity: number;
}

export interface IMetricProduct {
  count: number;
  metrics: IMetricProductData[];
}
