import Badge from "src/components/Badge/Badge";
import { IInvoice } from "src/@types/invoice";
import { INVOICE_SHIPS, IOrder, ORDER_STATUS } from "src/@types/orders";

export const ORDER_HISTORY_COLUMNS = [
  { key: "product", label: "Product" },
  { key: "quantity", label: "Quantity" },
  { key: "total", label: "Total" },
];

export const getOrderHistoryItems = (orders: any[]): any[] =>
  orders?.map((order) => ({
    id: order?.id,
    product: order.name || "Unknown Product",
    quantity: order.quantity || 0,
    total: `$${order.per_monthly?.toFixed(2) || "0.00"}`,
  }));

export const OPEN_CLOSED_ORDERS_COLUMNS = [
  { key: "po_number", label: "PO #" },
  { key: "invoice_number", label: "`Invoice #`" },
  { key: "status", label: "Status" },
];

export const getOpenClosedOrdersItems = (orders: IInvoice[]): any[] =>
  orders?.map((order) => ({
    id: order?.id,
    po_number: order?.po_number || "Unknown PO Number",
    invoice_number: order?.id || "Unknown Invoice Number",
    status: {
      type: "component",
      component: Badge,
      props: {
        color: ORDER_STATUS[order?.payment_status],
      },
    },
    // status: INVOICE_SHIPS[order?.invoice_status] || "Unknown Status",
  }));
