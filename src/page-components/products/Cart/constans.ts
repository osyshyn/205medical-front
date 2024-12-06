import * as Yup from "yup";
import { IOptionSelect } from "src/@types/form";
import { ILocation } from "src/@types/location";
import { IFormikValues } from "./types";

export const getLocationOption = (locations: ILocation[]): IOptionSelect[] =>
  locations.map((location) => ({
    label: location.name,
    value: location.id,
  }));

export const PURCHASE_ORDER_INITIAL_VALUES: IFormikValues = {
  orderLocation: undefined,
  poNumber: "",
};

export const PURCHASE_ORDER_VALIDATION_SCHEMA = Yup.object().shape({
  orderLocation: Yup.object().required("This field is required."),
  poNumber: Yup.string().required("This field is required."),
});
