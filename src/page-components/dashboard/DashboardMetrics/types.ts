import { SVGReactComponent } from "src/@types";

interface IMetric {
  id: number;
  label: string;
  value: number;
  icon: SVGReactComponent;
  color: string;
  trend?: {
    value: number;
    direction: string;
    description: string;
  };
}

export interface IMetrics {
  title: string;
  metrics: [IMetric, IMetric];
}
