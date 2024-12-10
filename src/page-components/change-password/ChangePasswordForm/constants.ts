import * as Yup from "yup";
import { TextInput } from "src/components/FormField/TextInput";
import {
  PASSWORD_VALIDATION_SCHEMA,
  REPEAT_CONFIRM_PASSWORD_VALIDATION_SCHEMA,
} from "src/constants/formValidation";
import { IRenderFormField } from "src/@types/form";
import { IFormikValues } from "./types";

const LABEL_CLASSNAME = "font-semibold text-gray-dark";
const TEXT_INPUT_CLASSNAME = "px-6 py-4.5";

export const CHANGE_PASSWORD_INITIAL_VALUES: IFormikValues = {
  password: "",
  confirm_password: "",
};

export const CHANGE_PASSWORD_FORM_FIELDS: IRenderFormField[] = [
  {
    name: "password",
    type: "password",
    label: "New Password",
    component: TextInput,
    labelClassName: LABEL_CLASSNAME,
    placeholder: "Enter password",
    className: TEXT_INPUT_CLASSNAME,
  },
  {
    name: "confirm_password",
    type: "password",
    label: "Confirm Password",
    component: TextInput,
    labelClassName: LABEL_CLASSNAME,
    placeholder: "Confirm password",
    className: TEXT_INPUT_CLASSNAME,
  },
];

export const CHANGE_PASSWORD_FORM_VALIDATION_SCHEMA = Yup.object().shape({
  password: PASSWORD_VALIDATION_SCHEMA,
  confirm_password: REPEAT_CONFIRM_PASSWORD_VALIDATION_SCHEMA("password"),
});
