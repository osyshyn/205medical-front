import * as Yup from "yup";

export const SIX_DIGIT_VALIDATION = Yup.string()
  .matches(/^\d{6}$/, "Must be exactly 6 digits.")
  .required("This field is required.");

export const LENGTH_VALIDATION = (min: number, max: number) =>
  Yup.string()
    .trim()
    .min(min, `Minimum ${min} characters required.`)
    .max(max, `Maximum ${max} characters allowed.`)
    .required("This field is required.");

export const FULL_NAME_VALIDATION_SCHEMA = LENGTH_VALIDATION(5, 50).matches(
  /^[A-Za-z\s]+$/,
  "Name must only contain letters and spaces."
);

export const EMAIL_VALIDATION_SCHEMA = LENGTH_VALIDATION(3, 100)
  .email("Incorrect email format.")
  .required("This field is required.");

export const PASSWORD_VALIDATION_SCHEMA = LENGTH_VALIDATION(4, 100)
  .matches(
    /^(?=.*[0-9])|(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
    "Password must contain at least one number or special character."
  )
  .matches(/[0-9]/, "Password must include at least one number.")
  .matches(/[a-z]/, "Password must include at least one lowercase letter.")
  .matches(/[A-Z]/, "Password must include at least one uppercase letter.")
  .required("This field is required.");

export const REPEAT_CONFIRM_PASSWORD_VALIDATION_SCHEMA = (ref: string) =>
  Yup.string()
    .required("Password confirmation is required.")
    .oneOf([Yup.ref(ref), null], "Passwords must match.");

export const PHONE_VALIDATION_SCHEMA = LENGTH_VALIDATION(3, 20).matches(
  /^(\+?[1-9]{1,4}[ -]*|\([0-9]{2,3}\)[ -]*|[0-9]{2,4}[ -]*)*?[0-9]{3,4}[ -]*[0-9]{3,4}([ -]*x[0-9]+)?$/,
  "Incorrect phone number format."
);

// export const MAX_LENGTH_VALIDATION = (max: number) =>
//   Yup.string().max(max, `max-symbols ${max}`).trim();

// export const WEBSITE_LINK_VALIDATION_SCHEMA =
//   Yup.string().url("url-is-invalid");
