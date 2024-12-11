import * as Yup from "yup";
import { TextInput } from "src/components/FormField/TextInput";
import { LENGTH_VALIDATION } from "src/constants/formValidation";
import { IRenderFormField } from "src/@types/form";
import { IFormikValues } from "./types";

export const SETTINGS_INITIAL_VALUES: IFormikValues = {
  phone: "",
  email: "",
  current_password: "",
  new_password: "",
  confirm_password: "",
};

export const SETTINGS_BUYER_INFO_FORM_FIELDS: IRenderFormField[] = [
  {
    name: "phone",
    type: "text",
    label: "Phone",
    component: TextInput,
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    component: TextInput,
  },
];

export const SETTINGS_CHANGE_PASSWORD_FORM_FIELDS: IRenderFormField[] = [
  {
    name: "current_password",
    type: "password",
    label: "Currently Password",
    component: TextInput,
  },
  {
    name: "new_password",
    type: "password",
    label: "New Password",
    component: TextInput,
  },
  {
    name: "confirm_password",
    type: "password",
    label: "Confirmed password",
    component: TextInput,
  },
];

export const EDIT_LOCATION_VALIDATION_SCHEMA = Yup.object().shape({
  name: LENGTH_VALIDATION(5, 50),
  address_1: LENGTH_VALIDATION(10, 50),
  address_2: LENGTH_VALIDATION(10, 50),
});
