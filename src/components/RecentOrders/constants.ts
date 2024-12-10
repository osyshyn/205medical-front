import { IOrder, STATUSES_APPROVAL, STATUSES_SHIPS } from "src/@types/orders";
import { Column } from "src/@types/table";

export const ORDER_COLUMNS: Column[] = [
  { key: "customer_po_number", label: "Customer PO #" },
  { key: "expected_delivery_date", label: "PO Date" },
  { key: "order_number", label: "Sales Order #" },
  { key: "location", label: "Ship To" },
  { key: "order_amt", label: "Amount" },
  { key: "approvalStatus", label: "Approval Status" },
  { key: "shipStatus", label: "Ship Status" },
];

export const getTableItems = (orders: IOrder[]): IOrder[] =>
  orders.map((order) => ({
    approvalStatus: STATUSES_APPROVAL[order.approval_status],
    shipStatus: STATUSES_SHIPS[order.approval_status],
    ...order,
  }));
