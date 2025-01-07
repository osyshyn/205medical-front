import { Column, Row } from "src/@types/table";

export const NUMBER_OF_ORDERS: Column[] = [
  { key: "category", label: "Category" },
  { key: "number", label: "Number of Order" },
];

interface OrderNumber {
  id: number;
  category: string;
  number: number;
}

export const getTableItemsNumber = (numberList: OrderNumber[]): Row[] =>
  numberList?.map((item) => ({
    id: item.id,
    number: item.number,
    category: item.category,
  }));
