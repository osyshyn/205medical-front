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
    [key: string]: string | number | VoidFunction;
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
