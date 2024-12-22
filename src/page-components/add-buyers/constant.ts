import { TextInput } from "src/components/FormField/TextInput";
import { IRenderFormField } from "src/@types/form";

export const ADD_BUYERS_FORM_FIELDS: IRenderFormField[] = [
  {
    name: "first_name",
    type: "text",
    label: "First Name",
    component: TextInput,
    placeholder: "First Name",
  },
  {
    name: "last_name",
    type: "text",
    label: "Last Name",
    component: TextInput,
    placeholder: "Last Name",
  },
  {
    name: "role",
    type: "text",
    label: "Role",
    component: TextInput,
    placeholder: "Role",
  },
  {
    name: "phone",
    type: "phone",
    label: "Phone",
    component: TextInput,
    placeholder: "Phone",
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    component: TextInput,
    placeholder: "Email",
  },
  {
    name: "purchase_limit",
    type: "text",
    label: "Purchase Limit",
    component: TextInput,
    placeholder: "Purchase Limit",
  },
];
