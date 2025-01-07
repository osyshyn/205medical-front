import { IOptionSelect } from "src/@types/form";

export interface IFormikValues {
  order_number: string;
  customer_po_number: string;
  expected_delivery_date: string;
  rush_service: string;
  location_id: number | string;
  type: number;
  order_products: { id: string; quantity: string }[];
}
