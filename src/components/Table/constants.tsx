import { Row } from "src/@types/table";

export const getKeyValue = (obj: Row, key: string): string | JSX.Element => {
  const value = obj[key];

  if (typeof value === "string") {
    return value;
  }

  return <span style={value.style}>{value.value}</span>;
};
