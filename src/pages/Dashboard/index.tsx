import React, { FC } from "react";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import { Metrics } from "src/components/Metrics";
import { RecentOrders } from "src/components/RecentOrders";

const Dashboard: FC = () => (
  <PageWrapper mainClassName="flex flex-col gap-10">
    <Metrics />
    <RecentOrders />
  </PageWrapper>
);

export default Dashboard;
