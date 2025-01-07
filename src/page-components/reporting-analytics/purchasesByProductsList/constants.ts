import { Column, Row } from "src/@types/table";

export const PURCHASE_BY_CATEGORY_COLUMNS: Column[] = [
  { key: "category", label: "Category" },
  { key: "monthly", label: "Monthly" },
  { key: "total", label: "YTD Total" },
];

interface PurchaseByCategory {
  id: number;
  category: string;
  monthly: number;
  total: number;
}

export const getTaleItemsCategory = (numberList: PurchaseByCategory[]): Row[] =>
  numberList?.map((item) => ({
    id: item.id,
    category: item.category,
    monthly: item.monthly,
    total: item.total,
  }));
