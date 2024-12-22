import {
  INVOICE_SHIPS,
  IOrder,
  STATUSES_APPROVAL,
  STATUSES_SHIPS,
} from "src/@types/orders";
import { Column } from "src/@types/table";

export const ORDER_COLUMNS: Column[] = [
  { key: "customer_po_number", label: "Invoice ID" },
  { key: "expected_delivery_date", label: "Date" },
  { key: "order_number", label: "PO Number" },
  { key: "location", label: "Location" },
  { key: "order_amt", label: "Inv. Amt." },
  { key: "shipping_fee", label: "Buyer" },
  { key: "approvalStatus", label: "Delivery Status" },
  { key: "shipStatus", label: "Due Date" },
  { key: "invoiceStatus", label: "Payment Status" },
];

export const getTableItems = (orders: IOrder[]): IOrder[] =>
  orders.map((order) => ({
    approvalStatus: STATUSES_APPROVAL[order.approval_status],
    shipStatus: STATUSES_SHIPS[order.approval_status],
    invoiceStatus: INVOICE_SHIPS[order.invoice_status],
    ...order,
  }));
