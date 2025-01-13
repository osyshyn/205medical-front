import * as Yup from "yup";
import { TextInput } from "src/components/FormField/TextInput";
import {
  EMAIL_VALIDATION_SCHEMA,
  PHONE_VALIDATION_SCHEMA,
} from "src/constants/formValidation";
import { IRenderFormField } from "src/@types/form";
import { IUser } from "src/@types/users";
import { IFormikValues } from "./types";

export const getInitialValues = ({ phone, email }: IUser): IFormikValues => ({
  phone,
  email,
  password: "",
  new_password: "",
  confirm_password: "",
});

export const SETTINGS_BUYER_INFO_FORM_FIELDS: IRenderFormField[] = [
  {
    name: "phone",
    type: "tel",
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
    name: "password",
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

export const SETTINGS_VALIDATION_SCHEMA = Yup.object().shape({
  // phone: PHONE_VALIDATION_SCHEMA,
  email: EMAIL_VALIDATION_SCHEMA,
  //temp add validation
});
