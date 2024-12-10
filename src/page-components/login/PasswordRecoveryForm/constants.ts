import * as Yup from "yup";
import { EMAIL_VALIDATION_SCHEMA } from "src/constants/formValidation";
import { IFormikValues } from "./types";

export const LABEL_CLASSNAME = "font-semibold text-gray-dark";
export const TEXT_INPUT_CLASSNAME = "px-6 py-4.5";

export const PASSWRD_RECOVERY_INITIAL_VALUES: IFormikValues = {
  email: "",
};

export const PASSWRD_RECOVERY_FORM_VALIDATION_SCHEMA = Yup.object().shape({
  email: EMAIL_VALIDATION_SCHEMA,
});
