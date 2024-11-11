import { ReactComponent as ClockIcon } from "src/page-components/dashboard/DashboardMetrics/temp/clock.svg";
import { ReactComponent as DeliveryIcon } from "src/page-components/dashboard/DashboardMetrics/temp/delivery.svg";
import { ReactComponent as MarkIcon } from "src/page-components/dashboard/DashboardMetrics/temp/mark.svg";
import { ReactComponent as TruckIcon } from "src/page-components/dashboard/DashboardMetrics/temp/truck.svg";
import { IMetrics } from "./types";

export const APPROVALS_METRICS: IMetrics = {
  title: "Approvals",
  metrics: [
    {
      id: 1,
      label: "Approval Status",
      value: 542,
      icon: MarkIcon,
      color: "#108A00",
      trend: {
        value: 16,
        direction: "up",
        description: "this month",
      },
    },
    {
      id: 2,
      label: "Ship Status",
      value: 169,
      icon: ClockIcon,
      color: "#F4C732",
      trend: {
        value: 1,
        direction: "down",
        description: "this month",
      },
    },
  ],
};

export const SHIPMENTS_METRICS: IMetrics = {
  title: "Shipments",
  metrics: [
    {
      id: 1,
      label: "Shipped",
      value: 189,
      icon: TruckIcon,
      color: "#DF0404",
    },
    {
      id: 2,
      label: "Delivered",
      value: 135,
      icon: DeliveryIcon,
      color: "#348ECF",
    },
  ],
};
