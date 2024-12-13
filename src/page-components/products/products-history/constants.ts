import { IOptionSelect } from "src/@types/form";
import { ILocation } from "src/@types/location";

export const getLocationsOption = (locations: ILocation[]): IOptionSelect[] =>
  locations?.map((location) => ({
    value: location.id,
    label: location.name,
  }));
