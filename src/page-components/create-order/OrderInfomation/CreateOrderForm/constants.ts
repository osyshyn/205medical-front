import * as Yup from "yup";
import { LENGTH_VALIDATION } from "src/constants/formValidation";
import { IFormikValues } from "./types";

export const CREATE_ORDER_INITIAL_VALUES: IFormikValues = {
  po_date: "",
  customer_po_number: "",
  expected_delivery_date: "",
  rush_service: "",
};

export const CREATE_ORDER_FORM_VALIDATION_SCHEMA = Yup.object().shape({
  po_date: LENGTH_VALIDATION(5, 50),
  customer_po_number: LENGTH_VALIDATION(5, 50),
  expected_delivery_date: LENGTH_VALIDATION(5, 50),
  rush_service: LENGTH_VALIDATION(5, 50),
});
