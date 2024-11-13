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

export interface Row {
  key: string;
  [key: string]: string | StyledValue;
}
