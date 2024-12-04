import * as Yup from "yup";
import { IOptionSelect } from "src/@types/form";
import { IFormikValues } from "./types";

export const LOCATION_OPTIONS_SELECT: IOptionSelect[] = [
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 },
];

export const PURCHASE_ORDER_INITIAL_VALUES: IFormikValues = {
  orderLocation: LOCATION_OPTIONS_SELECT[4],
  poNumber: "",
};

export const PURCHASE_ORDER_VALIDATION_SCHEMA = Yup.object().shape({
  orderLocation: Yup.object().required("This field is required."),
  poNumber: Yup.string().required("This field is required."),
});
