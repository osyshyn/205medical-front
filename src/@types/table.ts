import { Image } from ".";
import { IStatusesApproval, IStatusesShip } from "./orders";

export interface Column {
  key: string;
  label: string;
}

export interface StyledValue {
  style: {
    color: string;
  };
  value: string;
}

export interface ImageValue extends Image {
  type: "image";
  alt: string;
}

export interface ComponentValue {
  type: "component";
  component: React.FC<{ [key: string]: any }>;
  props?: {
    [key: string]: string | number | Image;
  };
}

export type RowValue =
  | string
  | number
  | StyledValue
  | ImageValue
  | ComponentValue;

export interface Row {
  id: number;
  [key: string]: RowValue;
}

export interface IRecentOrderTable extends Row {
  customer_po_number: string;
  expected_delivery_date: string;
  order_number: string;
  location: string;
  order_amt: number;
  approvalStatus: StyledValue;
  shipStatus: StyledValue;
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

export interface IProductTable extends Row {
  image: ImageValue;
  sku: string;
  name: string;
  price: number;
  minimum_order: number;
}

export interface ICartProductTable extends Row {
  quantity: number;
  name: string;
  price: number;
  minimum_order: number;
  preview: ImageValue;
  sku: string;
  package_info: string;
  category: string;
  total: number;
}
