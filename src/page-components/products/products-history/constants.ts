import { IFilterList } from "src/components/FilterButton/types";
import { ILocation } from "src/@types/location";

export const getFilterList = (locations: ILocation[]): IFilterList => ({
  title: "Locations",
  items: locations?.map((location) => ({
    value: location.id,
    label: location.name,
  })),
});
