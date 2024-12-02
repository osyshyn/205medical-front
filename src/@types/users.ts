import { Row, StyledValue } from "src/@types/table";

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  google_id?: string;
  role: TypesUsers;
  purchase_limit: number;
  created_at: string;
  updated_at: string;
}

export enum TypesUsers {
  SUB_USER = 1,
  CLIENT_ADMIN = 2,
  MEDICAL = 3,
}

export enum IStatusesApproval {
  APPROVED = "approved",
  PENDING = "pending",
  REJECTED = "rejected",
}

export enum IStatusesShip {
  SHIPPED = "shipped",
  PENDING = "pending",
  CANCELED = "canceled",
}

export interface IOrder extends Row {
  salesOrder: string;
  poDate: string;
  shipTo: string;
  amount: string;
  approvalStatus: StyledValue;
  shipStatus: StyledValue;
  customerPO: string;
}

export interface ILocation {
  slug: string;
  location_name: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  zip_code: string;
  contact_name: string;
  contact_email: string;
  buyer_name: string;
  buyer_email: string;
}
