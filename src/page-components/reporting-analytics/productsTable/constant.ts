import { IProductPurchases } from "src/stores/product-store";
import { IProduct } from "src/@types/products";
import { Column } from "src/@types/table";

export const PURCHASE_BY_PRODUCTS_LIST_COLUMNS: Column[] = [
  { key: "image", label: "" },
  { key: "sku", label: "SKU" },
  { key: "name", label: "Item name" },
  { key: "price", label: "Unit Price" },
  { key: "quantity", label: "Quantity" },
  { key: "monthly_total", label: "Monthly total" },
  { key: "ytd_total", label: "YTD total" },
  { key: "actionButtons", label: "" },
];

export const getTableItems = (products: IProductPurchases[]): any =>
  products.map((product) => ({
    ...product,
    monthly_total: product.per_monthly,
    ytd_total: product.per_year,
  }));
