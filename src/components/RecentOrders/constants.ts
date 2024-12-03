import { IOptionSelect } from "src/@types/form";
import { Column } from "src/@types/table";

export const ORDER_SORT_OPTIONS: IOptionSelect[] = [
  { label: "Select", value: "select" },
  { label: "PO Date: Newest First", value: "poDate_desc" },
  { label: "PO Date: Oldest First", value: "poDate_asc" },
  { label: "Customer PO: A to Z", value: "customerPO_asc" },
  { label: "Customer PO: Z to A", value: "customerPO_desc" },
  { label: "Amount: Low to High", value: "amount_asc" },
  { label: "Amount: High to Low", value: "amount_desc" },
  { label: "Approval Status: A to Z", value: "approvalStatus_asc" },
  { label: "Approval Status: Z to A", value: "approvalStatus_desc" },
  { label: "Ship Status: A to Z", value: "shipStatus_asc" },
  { label: "Ship Status: Z to A", value: "shipStatus_desc" },
];

export const ORDERS_PER_PAGE = 2;

export const ORDER_COLUMNS: Column[] = [
  { key: "customer_po_number", label: "Customer PO #" },
  { key: "expected_delivery_date", label: "PO Date" },
  { key: "order_number", label: "Sales Order #" },
  { key: "location", label: "Ship To" },
  { key: "order_amt", label: "Amount" },
  { key: "approvalStatus", label: "Approval Status" },
  { key: "shipStatus", label: "Ship Status" },
];
