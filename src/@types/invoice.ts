import { StyledValue } from "./table";

export interface IInvoice {
  id: number;
  created_at: string;
  po_number: string;
  location_name: string;
  amount: any;
  delivery_status: IStatusesDelivery;
  due_date: string;
  payment_status: IStatusesInvoice;
  user_id: number;
  buyer: {
    first_name: string;
    last_name: string;
    id: number;
  };
}

export enum IStatusesInvoice {
  OPEN = 1,
  PAID = 2,
  NOT_ISSUED = 3,
}

export enum IStatusesDelivery { 
  PENDING = 1,
  SHIPPED = 2,
  RECEIVED = 3,
}

export const INVOICE_STATUS: Record<IStatusesInvoice, StyledValue> = {
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
      color: "#DF0404",
    },
    value: "Not-Issued",
  },
};

export const STATUSES_DELIVERY: Record<IStatusesDelivery, StyledValue> = {
  [IStatusesDelivery.SHIPPED]: {
    style: {
      color: "#008767",
    },
    value: "Shipped",
  },
  [IStatusesDelivery.PENDING]: {
    style: {
      color: "#FFB700",
    },
    value: "Pending",
  },
  [IStatusesDelivery.RECEIVED]: {
    style: {
      color: "#DF0404",
    },
    value: "Canceled",
  },
};
