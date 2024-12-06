import * as Yup from "yup";
import { TextInput } from "src/components/FormField/TextInput";
import {
  LENGTH_VALIDATION,
} from "src/constants/formValidation";
import { IRenderFormField } from "src/@types/form";
import { IFormikValues } from "./types";

export const CREATE_ORDER_INITIAL_VALUES: IFormikValues = {
  po_date: "",
  customer_po_number: "",
  expected_delivery_date: "",
  rush_service: "",
};

export const CREATE_ORDER_FORM_FIELDS: IRenderFormField[] = [
  {
    name: "po_date",
    type: "text",
    label: "PO Date",
    component: TextInput,
  },
  {
    name: "customer_po_number",
    type: "text",
    label: "Customer PO Number",
    component: TextInput,
  },
  {
    name: "expected_delivery_date",
    type: "text",
    label: "Expected Delivery Date",
    component: TextInput,
  },
  {
    name: "rush_service",
    type: "text",
    label: "Rush Service",
    component: TextInput,
  },
];

export const CREATE_ORDER_FORM_VALIDATION_SCHEMA = Yup.object().shape({
  po_date: LENGTH_VALIDATION(5, 50),
  customer_po_number: LENGTH_VALIDATION(5, 50),
  expected_delivery_date: LENGTH_VALIDATION(5, 50),
  rush_service: LENGTH_VALIDATION(5, 50),
});
