import { FC, useEffect } from "react";
import { RECENT_ORDERS_COLUMNS } from "src/page-components/orders/recent-orders/constant";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import { RecentOrders as RecentOrdersTable } from "src/components/RecentOrders";
import { Table, TableBody, TableHeader } from "src/components/Table";
import { Title } from "src/components/Title";
import { Window } from "src/components/Window";
import useInvoiceStore from "src/stores/invoice-store";
import useOrderStore from "src/stores/order-store";
import { Row } from "src/@types/table";

export const RecentOrders: FC = () => {
  // const items = getTableItems(orders) as unknown as Row[];

  // console.log("Orders", orders);

  return (
    <PageWrapper>
      <RecentOrdersTable />
    </PageWrapper>
  );
};