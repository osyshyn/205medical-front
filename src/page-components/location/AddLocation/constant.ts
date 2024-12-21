import * as Yup from "yup";
import { TextInput } from "src/components/FormField/TextInput";
import { LENGTH_VALIDATION } from "src/constants/formValidation";
import { IRenderFormField } from "src/@types/form";

export const ADD_LOCATION_FORM_FIELDS: IRenderFormField[] = [
  {
    name: "name",
    type: "text",
    label: "Location Name",
    component: TextInput,
    placeholder: "Peter Parker",
  },
  {
    name: "address_1",
    type: "text",
    label: "Address 1",
    component: TextInput,
    placeholder: "Address 1",
  },
  {
    name: "state",
    type: "text",
    label: "State",
    component: TextInput,
    placeholder: "State",
  },
  {
    name: "contact_name",
    type: "text",
    label: "Contact Name",
    component: TextInput,
    placeholder: "Contact Name",
  },
  {
    name: "address_2",
    type: "text",
    label: "Address 2",
    component: TextInput,
    placeholder: "Address 2",
  },
  {
    name: "city",
    type: "text",
    label: "City",
    component: TextInput,
    placeholder: "City",
  },

  {
    name: "zip_code",
    type: "number",
    label: "ZipCode",
    component: TextInput,
    placeholder: "ZipCode",
  },

  {
    name: "contact_email",
    type: "email",
    label: "Contact Email",
    component: TextInput,
    placeholder: "Contact Email",
  },
];

export const ADD_LOCATION_FORM_FIELDS_S: IRenderFormField[] = [
  {
    name: "buyer_name",
    type: "text",
    label: "Responsible Buyer Name",
    component: TextInput,
    placeholder: "Responsible Buyer Name",
    className: "col-span-2",
  },
  {
    name: "buyer_email",
    type: "email",
    label: "Responsible Buyer Email",
    component: TextInput,
    placeholder: "Responsible Buyer Email",
    className: "col-span-2",
  },
];

export const EDIT_LOCATION_VALIDATION_SCHEMA = Yup.object().shape({
  name: LENGTH_VALIDATION(5, 50),
  address_1: LENGTH_VALIDATION(10, 50),
  address_2: LENGTH_VALIDATION(10, 50),
});
