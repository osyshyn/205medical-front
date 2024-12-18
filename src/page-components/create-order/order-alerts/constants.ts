import { IFilterList } from "src/components/FilterButton/types";
import { QUERY_PARAM_KEYS } from "src/constants/queryParams";

export const SORT_LIST_ORDER_ALERTS: IFilterList[] = [
  {
    title: "",
    items: [
      {
        label: "Order Approval",
        value: "order_approval",
      },
      {
        label: "Order Pending",
        value: "order_pending",
      },
      {
        label: "Order Rejected",
        value: "order_rejected",
      },
      {
        label: "Invoice Paid",
        value: "invoice_paid",
      },
    ],
    queryKey: QUERY_PARAM_KEYS.ORDER_ALERTS,
  },
];
