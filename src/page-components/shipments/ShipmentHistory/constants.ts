import { Column } from "src/@types/table";

export const SHIPMENT_HISTORY_COLUMNS: Column[] = [
  { key: "invoice", label: "Invoice #" },
  { key: "po_number", label: "PO # " },
  { key: "po_date", label: "PO Date # " },
  { key: "destination", label: "Destination" },
  { key: "location_name", label: "Shop to Address" },
  { key: "ship_date", label: "Ship Date" },
  { key: "ship_carrier", label: "Ship Carrier" },
];
