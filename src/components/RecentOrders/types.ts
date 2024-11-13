import { StyledValue , Row } from "src/@types/table";

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
  approvalStatus: StyledValue ;
  shipStatus: StyledValue ;
  customerPO: string;
}
