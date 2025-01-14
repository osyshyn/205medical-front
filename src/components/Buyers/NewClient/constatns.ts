import { TextInput } from "src/components/FormField/TextInput";
import { SelectField } from "src/components/SettingUserManagement/SelectField";
import { IRenderFormField } from "src/@types/form";

export const CREATE_USER_FORM_FIELDS: IRenderFormField[] = [
  {
    name: "role",
    type: "select",
    label: "Role",
    component: SelectField,
    placeholder: "Choose the Role",
    options: [
      { label: "205 Medical Admin", value: 3 },
      { label: "Client Admin", value: 2 },
    ],
  },
  {
    name: "company",
    type: "select",
    label: "Company",
    component: SelectField,
    placeholder: "Choose the Company",
    options: [
      { label: "205 Medical Admin", value: 3 },
      { label: "Client Admin", value: 2 },
    ],
  },
  {
    name: "purchase_limit",
    type: "text",
    label: "Purchase Limit",
    component: TextInput,
    placeholder: "Purchase Limit",
  },
  {
    name: "first_name",
    type: "text",
    label: "Name",
    component: TextInput,
    placeholder: "Name",
  },
  {
    name: "last_name",
    type: "text",
    label: "Last Name",
    component: TextInput,
    placeholder: "Last Name",
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    component: TextInput,
    placeholder: "Email",
  },
  {
    name: "phone",
    type: "phone",
    label: "Phone",
    component: TextInput,
    placeholder: "Phone",
  },
];
