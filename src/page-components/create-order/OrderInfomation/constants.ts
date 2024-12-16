import * as Yup from "yup";
import { TextInput } from "src/components/FormField/TextInput";
import { LENGTH_VALIDATION } from "src/constants/formValidation";
import { IRenderFormField } from "src/@types/form";
import { IOptionSelect } from "src/@types/form";
import { ILocation } from "src/@types/location";
import { IFormikValues } from "./types";

export const CREATE_ORDER_INITIAL_VALUES: IFormikValues = {
  po_date: "",
  customer_po_number: "",
  expected_delivery_date: "",
  rush_service: "",
  orderLocation: undefined,
};

export const CREATE_ORDER_FORM_FIELDS: IRenderFormField[] = [
  {
    name: "po_date",
    type: "text",
    label: "PO Date",
    component: TextInput,
  },
  {
    name: "customer_po_number",
    type: "text",
    label: "Customer PO Number",
    component: TextInput,
  },
  {
    name: "expected_delivery_date",
    type: "text",
    label: "Expected Delivery Date",
    component: TextInput,
  },
  {
    name: "rush_service",
    type: "text",
    label: "Rush Service",
    component: TextInput,
  },
];

export const CREATE_ORDER_FORM_VALIDATION_SCHEMA = Yup.object().shape({
  po_date: LENGTH_VALIDATION(5, 50),
  customer_po_number: LENGTH_VALIDATION(5, 50),
  expected_delivery_date: LENGTH_VALIDATION(5, 50),
  rush_service: LENGTH_VALIDATION(5, 50),
});

export const getLocationList = (locations: ILocation[]): IOptionSelect[] =>
  locations.map((location) => ({ value: location.id, label: location.name }));

export const getLocationInfo = (location: ILocation) => [
  {
    id: 1,
    label: "Location Name",
    value: location?.name || "Location Name",
  },
  {
    id: 2,
    label: "Address 1",
    value: location?.address_1 || "Address 1",
  },
  {
    id: 3,
    label: "Address 2",
    value: location?.address_2 || "Address 2",
  },
  {
    id: 4,
    label: "City",
    value: location?.city || "City",
  },
  {
    id: 5,
    label: "State",
    value: location?.state || "State",
  },
  {
    id: 6,
    label: "ZIP",
    value: location?.zip_code || "ZIP",
  },
  {
    id: 7,
    label: "Contact Name",
    value: location?.contact_name || "Contact Name",
  },
];

export const getBuyerInfo = (location: ILocation) => [
  {
    id: 1,
    label: "Buyer Name",
    value: location?.buyer_name || "Buyer Name",
  },
  {
    id: 2,
    label: "Buyer Email",
    value: location?.buyer_email || "Buyer Email",
  },
];
