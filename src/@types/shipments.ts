import { IOrder } from "./orders";
import { IUser } from "./users";

export interface IShipment {
  id: number;
  po_number: string;
  order_id: number;
  user_id: number;
  invoice_id: number;
  location_name: string;
  destination: string;
  ship_carrier: string;
  ship_date: Date;
  created_at: Date;
  updated_at: Date;
  order: IOrder;
}

interface IOrderDetails extends IOrder {
  user: IUser;
  order_to_products: [];
}

export interface IShipmentDetail extends IShipment {
  location_id: number;
  status: number;
  user: IUser;
  order: IOrderDetails;
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
