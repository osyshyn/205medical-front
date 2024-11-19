import { TextInput } from "src/components/FormField/TextInput";
import { IRenderFormField } from "src/@types/form";

export const EDIT_LOCATION_FORM_FIELDS: IRenderFormField[] = [
  {
    name: "location_name",
    type: "text",
    label: "Location Name",
    component: TextInput,
  },
  {
    name: "address_1",
    type: "text",
    label: "Address 1",
    component: TextInput,
  },
  {
    name: "address_2",
    type: "text",
    label: "Address 2",
    component: TextInput,
  },
  {
    name: "city",
    type: "text",
    label: "City",
    component: TextInput,
  },
  {
    name: "state",
    type: "text",
    label: "State",
    component: TextInput,
  },
  {
    name: "zip_code",
    type: "text",
    label: "ZipCode",
    component: TextInput,
  },
];

// export const LOGIN_VALIDATION_SCHEMA = Yup.object().shape({
//   email: EMAIL_VALIDATION_SCHEMA,
//   password: Yup.string().required("required"),
// });
