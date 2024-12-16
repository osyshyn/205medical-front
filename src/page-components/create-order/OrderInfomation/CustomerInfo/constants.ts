import { TextInput } from "src/components/FormField/TextInput";
import { IRenderFormField } from "src/@types/form";

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
