import { ActionButtons } from "src/pages/Companies/ActionButtons";
import { Users } from "src/pages/Companies/Uers";
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
    users: {
      type: "component",
      component: Users,
      props: {
        users: item.users,
      },
    },
    action_button: {
      type: "component",
      component: ActionButtons,
      props: {
        id: item.id,
      },
    },
    // users: item.users
    //   .map(
    //     (user: { first_name: string; last_name: string }) =>
    //       `${user.first_name} ${user.last_name}`
    //   )
    //   .join(", "),
  }));
