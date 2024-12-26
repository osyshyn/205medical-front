import { INVOICE_SHIPS, STATUSES_SHIPS } from "src/@types/orders";
import { Column, Row } from "src/@types/table";

export const BUYERS_ORDER_TABLE_COLUMNS: Column[] = [
  { key: "customer_po_number", label: "Customer PO #" },
  { key: "invoice_status", label: "Invoice Status" },
  { key: "date", label: "Date" },
  { key: "location", label: "Location" },
  { key: "order_total", label: "Order Total" },
  { key: "due_date", label: "Due Date" },
  { key: "delivery_status", label: "Delivery Status" },
  { key: "payment_status", label: "Payment Status" },
];

export const getBuyerOrderTableItems = (orders: any[]): Row[] =>
  orders.map((order) => ({
    id: order.id,
    customer_po_number: order.customer_po_number || "N/A",
    invoice_status: getInvoiceStatusLabel(order.invoice_status),
    date: formatDate(order.created_at),
    location: order.location || "N/A",
    order_total: formatAmount(order.order_amt),
    due_date: formatDate(order.expected_delivery_date),
    delivery_status: STATUSES_SHIPS[order.ship_status],
    payment_status: INVOICE_SHIPS[order.status],
  }));

// export const formatDate = (date: string): string => {
//   const [year, month, day] = date.split("T")[0].split("-");
//   return `${month}/${day}/${year.slice(-2)}`;
// };

export const formatAmount = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};

const formatDate = (date: string | number | undefined): string => {
  if (!date) return "Invalid date";
  const parsedDate = new Date(date);
  return isNaN(parsedDate.getTime())
    ? "Invalid date"
    : parsedDate.toLocaleString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
};

const getInvoiceStatusLabel = (status: number): string => {
  switch (status) {
    case 1:
      return "Paid";
    case 2:
      return "Unpaid";
    case 3:
      return "Pending";
    default:
      return "Unknown";
  }
};
