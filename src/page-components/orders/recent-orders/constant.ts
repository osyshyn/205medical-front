import { IInvoice } from "src/@types/invoice";
import { IOrder } from "src/@types/orders";
import { Column } from "src/@types/table";

export const RECENT_ORDERS_COLUMNS: Column[] = [
  { key: "invoice_number", label: "Invoice Number" },
  { key: "due_date", label: "Due Date" },
];

// export const getTableItems = (orders: IOrder[]): IOrder[] =>
//   orders?.map((order) => ({
//     ...order,
//     invoice_number: order?.id,
//     due_date: order?.due_date,
//   }));
