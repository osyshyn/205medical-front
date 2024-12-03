import { Row, StyledValue } from "src/@types/table";

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

export interface IRecentOrderTable extends Row {
  key: string;
  customer_po_number: string;
  expected_delivery_date: string;
  order_number: string;
  location: string;
  order_amt: number;

  approvalStatus: StyledValue;
  shipStatus: StyledValue;
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

export const STATUSES_APPROVAL: Record<IStatusesApproval, StyledValue> = {
  [IStatusesApproval.APPROVED]: {
    style: {
      color: "#008767",
    },
    value: "Approved",
  },
  [IStatusesApproval.PENDING]: {
    style: {
      color: "#FFB700",
    },
    value: "Pending",
  },
  [IStatusesApproval.REJECTED]: {
    style: {
      color: "#DF0404",
    },
    value: "Rejected",
  },
};

export const STATUSES_SHIPS: Record<IStatusesShip, StyledValue> = {
  [IStatusesShip.SHIPPED]: {
    style: {
      color: "#008767",
    },
    value: "Shipped",
  },
  [IStatusesShip.PENDING]: {
    style: {
      color: "#FFB700",
    },
    value: "Pending",
  },
  [IStatusesShip.CANCELED]: {
    style: {
      color: "#DF0404",
    },
    value: "Canceled",
  },
};
