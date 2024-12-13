import { IFilterList } from "src/components/FilterButton/types";
import { QUERY_PARAM_KEYS } from "src/constants/queryParams";
import { ILocation } from "src/@types/location";
import { IProduct } from "src/@types/products";

export const getFilterList = (
  locations: ILocation[],
  products: IProduct[]
): IFilterList[] => [
  {
    title: "Locations",
    items: locations?.map((location) => ({
      value: location.id,
      label: location.name,
    })),
    queryKey: QUERY_PARAM_KEYS.LOCATIONS,
  },
  {
    title: "Products",
    items: products?.map((product) => ({
      value: product.id,
      label: product.name,
    })),
    queryKey: QUERY_PARAM_KEYS.PRODUCTS,
  },
];
