import { ICategory } from "src/@types/categories";
import { IOptionSelect } from "src/@types/form";
import { IProduct } from "src/@types/products";
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

export const getTableItems = (productsData: IProduct[]): IProduct[] =>
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

export const getCategoriesOption = (categories: ICategory[]): IOptionSelect[] =>
  categories?.map((category) => ({
    value: category.id,
    label: category.name,
  }));
