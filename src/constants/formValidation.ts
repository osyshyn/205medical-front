import * as Yup from "yup";

export const LENGTH_VALIDATION = (min: number, max: number) =>
  Yup.string()
    .trim()
    .min(min, `Minimum ${min} characters required.`)
    .max(max, `Maximum ${max} characters allowed.`)
    .required("This field is required.");

// export const MAX_LENGTH_VALIDATION = (max: number) =>
//   Yup.string().max(max, `max-symbols ${max}`).trim();

// export const EMAIL_VALIDATION_SCHEMA = LENGTH_VALIDATION(3, 100)
//   .email("incorrect-email")
//   .required("required");

// export const PHONE_VALIDATION_SCHEMA = LENGTH_VALIDATION(3, 20).matches(
//   /^(\+?[1-9]{1,4}[ -]*|\([0-9]{2,3}\)[ -]*|[0-9]{2,4}[ -]*)*?[0-9]{3,4}[ -]*[0-9]{3,4}([ -]*x[0-9]+)?$/,
//   "incorrect-phone-number"
// );

// export const PASSWORD_VALIDATION_SCHEMA = LENGTH_VALIDATION(3, 100)
//   .matches(
//     /^(?=.*[0-9])|(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
//     "contain-numeric-or-special-character"
//   )
//   .matches(/[0-9]/, "include-number")
//   .matches(/[a-z]/, "include-lowercase-letter")
//   .matches(/[A-Z]/, "include-uppercase-letter");

// export const FIRST_NAME_VALIDATION_SCHEMA = LENGTH_VALIDATION(3, 50).matches(
//   /^[A-Za-z\s]+$/,
//   "not-valid-name"
// );

// export const LAST_NAME_VALIDATION_SCHEMA = LENGTH_VALIDATION(3, 100).matches(
//   /^[A-Za-z\s]+$/,
//   "not-valid-name"
// );

// export const WEBSITE_LINK_VALIDATION_SCHEMA =
//   Yup.string().url("url-is-invalid");

// export const REPEAT_NEW_PASSWORD_VALIDATION_SCHEMA = Yup.string()
//   .required("required")
//   .oneOf([Yup.ref("newPassword"), null], "passwords-must-match");
