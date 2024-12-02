import { Row, StyledValue } from "src/@types/table";
import { Image } from ".";

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  google_id: string;
  role: TypesUsers;
  purchase_limit: number;
  created_at: string;
  updated_at: string;
  avatar: Image;
  logo: Image;
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
