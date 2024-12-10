import * as Yup from "yup";
import { SIX_DIGIT_VALIDATION } from "src/constants/formValidation";
import { IFormikValues } from "./types";

export const LABEL_CLASSNAME = "font-semibold text-gray-dark";
export const TEXT_INPUT_CLASSNAME = "px-6 py-4.5";

export const CHECK_OTP_INITIAL_VALUES: IFormikValues = {
  code: "",
};

export const CHECK_OTP_FORM_VALIDATION_SCHEMA = Yup.object().shape({
  code: SIX_DIGIT_VALIDATION,
});
