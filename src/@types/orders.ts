export interface IOrder {
  id: number;
  approval_status: IStatusesApproval;
  created_at: string;
  customer_po_number: string;
  expected_delivery_date: string;
  invoice_status: number;
  location: string;
  location_id: number;
  order_amt: number;
  order_number: string;
  rush_service: string;
  ship_status: IStatusesShip;
  shipping_fee: number;
  status: number;
  updated_at: string;
  user_id: number;
}

export enum IStatusesApproval {
  PENDING = 1,
  APPROVED = 2,
  REJECTED = 3,
}

export enum IStatusesShip {
  PENDING = 1,
  SHIPPED = 2,
  CANCELED = 3,
}
