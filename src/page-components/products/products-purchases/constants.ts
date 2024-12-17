import { IFilterList } from "src/components/FilterButton/types";
import { QUERY_PARAM_KEYS } from "src/constants/queryParams";
import { IProduct } from "src/@types/products";

export const getFilterList = (products: IProduct[]): IFilterList[] => [
  {
    title: "Products",
    items: products?.map((product) => ({
      value: product.id,
      label: product.name,
    })),
    queryKey: QUERY_PARAM_KEYS.PRODUCTS,
  },
];
