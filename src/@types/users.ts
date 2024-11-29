import { Row, StyledValue } from "src/@types/table";

export enum TypesUsers {
  SUB_USER = "sub-user",
  CLIENT_ADMIN = "client-admin",
  MEDICAL = "medical",
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
