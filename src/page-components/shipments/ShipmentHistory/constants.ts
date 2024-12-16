import { IShipment } from "src/@types/shipments";
import { Column } from "src/@types/table";
import { ActionsButtons } from "./ActionButtons";

export const SHIPMENT_HISTORY_COLUMNS: Column[] = [
  { key: "invoice_id", label: "Invoice #" },
  { key: "po_number", label: "PO # " },
  { key: "po_date", label: "PO Date # " },
  { key: "destination", label: "Destination" },
  { key: "location_name", label: "Shop to Address" },
  { key: "ship_date", label: "Ship Date" },
  { key: "ship_carrier", label: "Ship Carrier" },
  { key: "actionButtons", label: "" },
];

export const getTableItems = (shipmentData: IShipment[]): IShipment[] =>
  shipmentData.map((shipment) => ({
    ...shipment,
    actionButtons: {
      type: "component",
      component: ActionsButtons,
      props: {
        id: shipment.id,
      },
    },
  }));
