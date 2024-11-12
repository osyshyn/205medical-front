export interface Column {
  key: string;
  label: string;
}

export interface Row {
  key: string;
  [key: string]: any;
}
