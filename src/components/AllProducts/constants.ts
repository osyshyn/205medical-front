import { IProduct, IProductTable } from "src/@types/products";
import { Column } from "src/@types/table";
import { ActionsButtons } from "./ActionsButtons";

export const ALL_PRODUCTS_COLUMNS: Column[] = [
  { key: "image", label: "" },
  { key: "sku", label: "SKU" },
  { key: "name", label: "Item name" },
  { key: "price", label: "Unit Price" },
  { key: "minimum_order", label: "Minimum Order" },
  { key: "actionButtons", label: "" },
];

export const addActionButtons = (
  productsData: IProductTable[],
  products: IProduct[]
): IProductTable[] =>
  productsData.map((product, index) => ({
    ...product,
    actionButtons: {
      type: "component",
      component: ActionsButtons,
      props: {
        ...products[index],
      },
    },
  }));
