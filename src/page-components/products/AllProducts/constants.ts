import { IFilterList } from "src/components/FilterButton/types";
import { QUERY_PARAM_KEYS } from "src/constants/queryParams";
import { ICategory } from "src/@types/categories";
import { IProduct } from "src/@types/products";
import { Column } from "src/@types/table";
import { TypesUsers } from "src/@types/users";
import { ActionsButtons } from "./ActionsButtons";

export const ALL_PRODUCTS_COLUMNS: Column[] = [
  { key: "image", label: "" },
  { key: "sku", label: "SKU" },
  { key: "name", label: "Item name" },
  { key: "price", label: "Unit Price" },
  { key: "minimum_order", label: "Minimum Order" },
  { key: "actionButtons", label: "" },
];

export const getTableItems = (
  productsData: IProduct[],
  role: TypesUsers
): IProduct[] =>
  productsData.map((product) => ({
    ...product,
    actionButtons: {
      type: "component",
      component: ActionsButtons,
      props: {
        id: product.id,
        role, // Передаем роль в качестве пропа
      },
    },
  }));

export const getFilterList = (categories: ICategory[]): IFilterList[] => [
  {
    title: "Categories",
    items: categories?.map((category) => ({
      value: category.id,
      label: category.name,
    })),
    queryKey: QUERY_PARAM_KEYS.CATEGORIES,
  },
];
