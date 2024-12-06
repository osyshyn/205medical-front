import { Image } from ".";

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
  key: string;
  [key: string]: RowValue;
}

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
  preview: ImageValue;
  sku: string;
  packageInfo: string;
  category: string;
  totalAmount: number;
}
