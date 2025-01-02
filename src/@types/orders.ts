import { IProduct } from "./products";
import { StyledValue } from "./table";

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
  user: {
    first_name: string;
    last_name: string;
  };
}

export interface IOrderToApprove {
  id: number;
  buyer_name: string;
  created_at: string;
  expected_delivery_date: string;
  location: string;
  products: IProduct[];
  rush_service: string;
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

export enum IStatusesInvoice {
  OPEN = 1,
  PAID = 2,
  NOT_ISSUED = 3,
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

export const INVOICE_SHIPS: Record<IStatusesInvoice, StyledValue> = {
  [IStatusesInvoice.PAID]: {
    style: {
      color: "#008767",
    },
    value: "Paid",
  },
  [IStatusesInvoice.OPEN]: {
    style: {
      color: "#FFB700",
    },
    value: "Open",
  },
  [IStatusesInvoice.NOT_ISSUED]: {
    style: {
      color: "blue",
    },
    value: "Not-Issued",
  },
};
