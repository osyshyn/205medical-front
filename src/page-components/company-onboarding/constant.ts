import { SelectDropdownListField } from "src/components/FormField/SelectDropdownListField";
import { TextInput } from "src/components/FormField/TextInput";
import { SelectField } from "src/components/SettingUserManagement/SelectField";
import { IRenderFormField } from "src/@types/form";

export const ADD_COMPANY_FORM_FIELDS_1: IRenderFormField[] = [
  {
    name: "company_name",
    type: "text",
    label: "Legal Company Name",
    component: TextInput,
    placeholder: "Legal Company Name",
  },
  {
    name: "trade_name",
    type: "text",
    label: "Trade Name (DBA)",
    component: TextInput,
    placeholder: "Trade Name (DBA)",
  },
  {
    name: "address",
    type: "text",
    label: "Address",
    component: TextInput,
    placeholder: "Address",
  },
  {
    name: "contact",
    type: "text",
    label: "Contact",
    component: TextInput,
    placeholder: "Peter Parker",
  },
  {
    name: "phone",
    type: "text",
    label: "Phone",
    component: TextInput,
    placeholder: "+1 xxxxxxxxx",
  },
  {
    name: "business_type",
    type: "select",
    label: "Type of Business",
    component: TextInput,
    placeholder: "Choose type of Business",
    options: [
      { label: "Wholesale", value: "1" },
      { label: "Retail", value: "2" },
      { label: "Both", value: "3" },
    ],
  },
];

export const ADD_COMPANY_FORM_FIELDS_2: IRenderFormField[] = [
  {
    name: "date_of_incorporation",
    type: "date",
    label: "Date of Incorporation",
    component: TextInput,
    placeholder: "DD/MM/YY",
  },
  {
    name: "state_of_incorporation",
    type: "text",
    label: "State of incorporation",
    component: TextInput,
    placeholder: "State of incorporation",
  },
  {
    name: "federal_tax_id",
    type: "text",
    label: "Federal Tax ID#",
    component: TextInput,
    placeholder: "XXX XXX XXX XXX",
  },
  //?
  {
    name: "duns_no",
    type: "text",
    label: "DUNs No.",
    component: TextInput,
    placeholder: "XXX XXX XXX XXX",
  },
  //?
  {
    name: "sic_code",
    type: "text",
    label: "NAICS/SIC Code",
    component: TextInput,
    placeholder: "NAICS/SIC CODE",
  },
  //?
  {
    name: "years_in_business",
    type: "text",
    label: "Years in Business",
    component: TextInput,
    placeholder: "10 years",
  },
  //?
  {
    name: "website",
    type: "text",
    label: "Website",
    component: TextInput,
    placeholder: "www.website.com",
  },
  {
    name: "primary_contact",
    type: "text",
    label: "Primary Contact",
    component: TextInput,
    placeholder: "Primary Contact",
  },
  {
    name: "email",
    type: "mail",
    label: "Email",
    component: TextInput,
    placeholder: "Email",
  },
];

export const ADD_COMPANY_FORM_FILED_INVOICING: IRenderFormField[] = [
  {
    name: "invoicing_address",
    type: "text",
    label: "Billing address",
    component: TextInput,
    placeholder: "Billing address",
  },
  {
    name: "invoicing_contact",
    type: "text",
    label: "Primary AP Account",
    component: TextInput,
    placeholder: "Primary AP Account",
  },
  {
    name: "invoicing_email",
    type: "email",
    label: "Email",
    component: TextInput,
    placeholder: "Email",
  },
  {
    name: "invoicing_city",
    type: "text",
    label: "City",
    component: TextInput,
    placeholder: "City",
  },
  {
    name: "invoicing_state",
    type: "text",
    label: "State",
    component: SelectField,

    options: [
      { label: "Alabama", value: "1" },
      { label: "Alaska", value: "2" },
      { label: "Arizona", value: "3" },
      { label: "Arkansas", value: "4" },
      { label: "California", value: "5" },
    ],
    placeholder: "State",
  },
  {
    name: "invoicing_zip",
    type: "text",
    label: "Zip",
    component: TextInput,
    placeholder: "XXX",
  },
  {
    name: "invoicing_fax",
    type: "text",
    label: "Fax",
    component: TextInput,
    placeholder: "Fax",
  },
  //?
  {
    name: "payment_method",
    type: "text",
    label: "Payment Methods",
    component: SelectField,
    options: [
      { label: "Prepaid", value: "1" },
      { label: "Due Upon", value: "2" },
      { label: "Receipt", value: "3" },
      { label: "Net 15", value: "4" },
      { label: "Net 30", value: "5" },
    ],
    placeholder: "Payment Methods",
  },
];

export const ADD_COMPANY_FORM_FILED_INVOICING_2: IRenderFormField[] = [
  {
    name: "purchasing_contact",
    type: "text",
    label: "Primary Contact",
    component: TextInput,
    placeholder: "Primary Contact",
  },
  {
    name: "purchasing_phone",
    type: "text",
    label: "Phone",
    component: TextInput,
    placeholder: "Phone",
  },
  {
    name: "purchasing_email",
    type: "email",
    label: "Email",
    component: TextInput,
    placeholder: "Email",
  },
];

export const ADD_COMPANY_FORM_FIELD_CREDIT: IRenderFormField[] = [
  {
    name: "owner_name",
    type: "text",
    label: "Name",
    component: TextInput,
    placeholder: "Name",
  },
  {
    name: "owner_position",
    type: "text",
    label: "Position",
    component: TextInput,
    placeholder: "Position",
  },
  {
    name: "owner_ownership",
    type: "text",
    label: "Ownership",
    component: TextInput,
    placeholder: "Ownership",
  },
  {
    name: "owner_address",
    type: "text",
    label: "Home Address",
    component: TextInput,
    placeholder: "Home Address",
  },
  {
    name: "owner_phone",
    type: "text",
    label: "Phone",
    component: TextInput,
    placeholder: "+1 XXX-XXX-XXXX",
  },
  {
    name: "owner_email",
    type: "email",
    label: "Email",
    component: TextInput,
    placeholder: "Email",
  },
];

export const ADD_COMPANY_FORM_FIELD_BANK_REFERENCE: IRenderFormField[] = [
  {
    name: "bank_name",
    type: "text",
    label: "Name of Bank",
    component: TextInput,
    placeholder: "Name",
  },
  {
    name: "bank_number",
    type: "text",
    label: "Account No",
    component: TextInput,
    placeholder: "XXX XXX XXX",
  },
  {
    name: "bank_contact",
    type: "text",
    label: "Contact",
    component: TextInput,
    placeholder: "Contact",
  },
  {
    name: "bank_phone",
    type: "text",
    label: "Phone No.",
    component: TextInput,
    placeholder: "+1 XXX-XXX-XXXX",
  },
  {
    name: "bank_email",
    type: "email",
    label: "Email",
    component: TextInput,
    placeholder: "Email",
  },
  {
    name: "bank_address",
    type: "text",
    label: "City And State of Bank",
    component: TextInput,
    placeholder: "City and State of Bank",
  },
];

export const ADD_COMPANY_FORM_FILEDS_CREDIT_REFERENCE: IRenderFormField[] = [
  {
    name: "credit_first_name",
    type: "text",
    label: "Firm Name",
    component: TextInput,
    placeholder: "Name",
  },
  {
    name: "credit_contact",
    type: "text",
    label: "Contact",
    component: TextInput,
    placeholder: "Contact",
  },
  {
    name: "credit_phone",
    type: "text",
    label: "Phone",
    component: TextInput,
    placeholder: "+1 XXX-XXX-XXXX",
  },
  {
    name: "credit_fax",
    type: "text",
    label: "Fax",
    component: TextInput,
    placeholder: "Fax",
  },
  {
    name: "credit_email",
    type: "text",
    label: "Email",
    component: TextInput,
    placeholder: "Email",
  },
  {
    name: "credit_address",
    type: "text",
    label: "Address",
    component: TextInput,
    placeholder: "Adress",
  },
];
