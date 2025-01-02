import { TextInput } from "src/components/FormField/TextInput";
import { IRenderFormField } from "src/@types/form";

export const EDIT_PRODUCT_FORM_FIELDS_FIRST: IRenderFormField[] = [
  {
    name: "name",
    type: "text",
    label: "Product Name",
    component: TextInput,
    placeholder: "Product Name",
  },
  {
    name: "price",
    type: "number",
    label: "Price",
    component: TextInput,
    placeholder: "Price",
  },
  {
    name: "minimum_order",
    type: "number",
    label: "Minimum Order",
    component: TextInput,
    placeholder: "Minimum Order",
  },
  {
    name: "category_id",
    type: "text",
    label: "Category",
    component: TextInput,
    placeholder: "Category",
  },
  {
    name: "certification",
    type: "text",
    label: "Certification",
    component: TextInput,
    placeholder: "Certification",
  },
  {
    name: "sku",
    type: "text",
    label: "SKU",
    component: TextInput,
    placeholder: "SKU",
  },
];

export const EDIT_PRODUCT_FORM_FIELDS_SECOND: IRenderFormField[] = [
  {
    name: "description",
    type: "text",
    label: "Description",
    component: TextInput,
    placeholder: "Description",
  },
  {
    name: "how_to_use",
    type: "text",
    label: "How to Use",
    component: TextInput,
    placeholder: "How to Use",
  },
  {
    name: "faq",
    type: "text",
    label: "FAQs",
    component: TextInput,
    placeholder: "FAQ",
  },
];
