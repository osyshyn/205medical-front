import { IFilterList } from "src/components/FilterButton/types";

export const SORT_LIST_SHIPMENT_ALERTS: IFilterList[] = [
  {
    title: "",
    items: [
      {
        label: "Shipped",
        value: "order_shipment",
      },
      {
        label: "Delievered",
        value: "order_delivered",
      },
    ],
    queryKey: "shipment-alerts",
  },
];
