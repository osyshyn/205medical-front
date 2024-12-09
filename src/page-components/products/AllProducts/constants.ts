import { IProductTable } from "src/@types/table";
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
  productsData: IProductTable[]
): IProductTable[] =>
  productsData.map((product) => ({
    ...product,
    actionButtons: {
      type: "component",
      component: ActionsButtons,
      props: {
        id: product.id,
      },
    },
  }));
