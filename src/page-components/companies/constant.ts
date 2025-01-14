import { Column, Row } from "src/@types/table";

export const COMPANY_TABLE_COLUMNS: Column[] = [
  { key: "company_name", label: "Company Name" },
  { key: "users", label: "Users" },
  { key: "action_button", label: "" },
];

export const getTableItems = (companies: any[]): Row[] =>
  companies.map((item) => ({
    id: item.id,
    company_name: item.company_name,
    users: item.users,
  }));
