import { IStatusesInvoice, IStatusesShip } from "./orders";

export interface IInvoice {
  id: number;
  created_at: string;
  po_number: string;
  location_name: string;
  amount: any;
  delivery_status: IStatusesShip;
  due_date: string;
  payment_status: IStatusesInvoice;
  user_id: number;
  buyer: {
    first_name: string;
    last_name: string;
    id: number;
  };
}
