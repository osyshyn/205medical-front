import {
  INVOICE_SHIPS,
  IOrder,
  STATUSES_APPROVAL,
  STATUSES_SHIPS,
} from "src/@types/orders";
import { Column } from "src/@types/table";

export const ORDER_COLUMNS: Column[] = [
  { key: "customer_po_number", label: "Customer PO #" },
  { key: "expected_delivery_date", label: "PO Date" },
  { key: "order_number", label: "Sales Order #" },
  { key: "location", label: "Ship To" },
  { key: "order_amt", label: "Order Amt." },
  { key: "shipping_fee", label: "Shipping fee" },
  { key: "approvalStatus", label: "Approval Stat." },
  { key: "shipStatus", label: "Ship Stat." },
  { key: "invoiceStatus", label: "Invoice Stat." },
];

export const INVOICE_COLUMN: Column[] = [
  {
    key: "invoice",
    label: "Invoice Number",
  },
];

export const DUE_DATE_COLUMN: Column[] = [
  {
    key: "expected_delivery_date",
    label: "Due Date",
  },
];

export const getTableItems = (orders: IOrder[]): IOrder[] =>
  orders.map((order) => ({
    approvalStatus: STATUSES_APPROVAL[order.approval_status],
    shipStatus: STATUSES_SHIPS[order.approval_status],
    invoiceStatus: INVOICE_SHIPS[order.invoice_status],
    ...order,
  }));
