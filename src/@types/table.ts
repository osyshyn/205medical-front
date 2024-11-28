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

export interface ImageValue {
  type: "image";
  src: string;
  alt?: string;
  style?: {
    [key: string]: string | number;
  };
}

export interface ComponentValue {
  type: "component";
  component: React.FC;
  props?: {
    [key: string]: string | number;
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
