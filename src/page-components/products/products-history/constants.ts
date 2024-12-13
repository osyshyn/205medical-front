import { IFilterList } from "src/components/FilterButton/types";
import { QUERY_PARAM_KEYS } from "src/constants/queryParams";
import { ILocation } from "src/@types/location";

export const getFilterList = (locations: ILocation[]): IFilterList[] => [
  {
    title: "Locations",
    items: locations?.map((location) => ({
      value: location.id,
      label: location.name,
    })),
    queryKey: QUERY_PARAM_KEYS.LOCATIONS,
  },
];
