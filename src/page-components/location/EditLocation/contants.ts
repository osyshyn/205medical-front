import * as Yup from "yup";
import { TextInput } from "src/components/FormField/TextInput";
import { LENGTH_VALIDATION } from "src/constants/formValidation";
import { IRenderFormField } from "src/@types/form";

export const EDIT_LOCATION_FORM_FIELDS: IRenderFormField[] = [
  {
    name: "location_name",
    type: "text",
    label: "Location Name",
    component: TextInput,
  },
  {
    name: "address_1",
    type: "text",
    label: "Address 1",
    component: TextInput,
  },
  {
    name: "address_2",
    type: "text",
    label: "Address 2",
    component: TextInput,
  },
  {
    name: "city",
    type: "text",
    label: "City",
    component: TextInput,
  },
  {
    name: "state",
    type: "text",
    label: "State",
    component: TextInput,
  },
  {
    name: "zip_code",
    type: "number",
    label: "ZipCode",
    component: TextInput,
  },
];

export const EDIT_LOCATION_VALIDATION_SCHEMA = Yup.object().shape({
  location_name: LENGTH_VALIDATION(5, 50),
  address_1: LENGTH_VALIDATION(10, 50),
  address_2: LENGTH_VALIDATION(10, 50),
});
