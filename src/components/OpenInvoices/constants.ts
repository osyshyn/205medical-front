import { IInvoice } from "src/@types/invoice";
import { INVOICE_SHIPS, STATUSES_SHIPS } from "src/@types/orders";
import { Column } from "src/@types/table";

export const ORDER_COLUMNS: Column[] = [
  { key: "id", label: "Invoice ID" },
  { key: "created_at", label: "Date" },
  { key: "po_number", label: "PO Number" },
  { key: "location_name", label: "Location" },
  { key: "amount", label: "Inv. Amt." },
  { key: "buyers", label: "Buyer" },
  { key: "deliveryStatus", label: "Delivery Status" },
  { key: "due_date", label: "Due Date" },
  { key: "paymentStatus", label: "Payment Status" },
];

export const formatDate = (date: string): string => {
  const [year, month, day] = date.split("T")[0].split("-");
  return `${month}/${day}/${year.slice(-2)}`;
};

export const formatAmount = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};

export const getTableItems = (invoice: IInvoice[]): IInvoice[] =>
  invoice.map((invoice) => ({
    ...invoice,
    created_at: formatDate(invoice.created_at),
    due_date: formatDate(invoice.due_date),
    amount: formatAmount(invoice.amount),
    deliveryStatus: STATUSES_SHIPS[invoice.delivery_status],
    paymentStatus: INVOICE_SHIPS[invoice.payment_status],
    buyers: `${invoice.buyer.first_name} ${invoice.buyer.last_name}`,
  }));
