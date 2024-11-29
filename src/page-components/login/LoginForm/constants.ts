import * as Yup from "yup";
import { TextInput } from "src/components/FormField/TextInput";
import {
  EMAIL_VALIDATION_SCHEMA,
  FULL_NAME_VALIDATION_SCHEMA,
  PASSWORD_VALIDATION_SCHEMA,
} from "src/constants/formValidation";
import { IRenderFormField } from "src/@types/form";
import { IFormikValues } from "./types";

const LABEL_CLASSNAME = "font-semibold text-gray-dark";
const TEXT_INPUT_CLASSNAME = "px-6 py-4.5";

export const AUTH_INITIAL_VALUES: IFormikValues = {
  email: "",
  password: "",
};

export const AUTH_FORM_FIELDS: IRenderFormField[] = [
  {
    name: "full_name",
    type: "text",
    label: "Full Name",
    component: TextInput,
    labelClassName: LABEL_CLASSNAME,
    placeholder: "Enter your name",
    className: TEXT_INPUT_CLASSNAME,
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    component: TextInput,
    labelClassName: LABEL_CLASSNAME,
    placeholder: "Enter your email id",
    className: TEXT_INPUT_CLASSNAME,
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    component: TextInput,
    labelClassName: LABEL_CLASSNAME,
    placeholder: "Enter password",
    className: TEXT_INPUT_CLASSNAME,
  },
];

export const AUTH_FORM_VALIDATION_SCHEMA = Yup.object().shape({
  full_name: FULL_NAME_VALIDATION_SCHEMA,
  email: EMAIL_VALIDATION_SCHEMA,
  password: PASSWORD_VALIDATION_SCHEMA,
});
