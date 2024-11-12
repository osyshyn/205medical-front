import React, { FC } from "react";
import { DashboardMetrics } from "src/page-components/dashboard/DashboardMetrics";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import { RecentOrders } from "src/components/RecentOrders";

const Dashboard: FC = () => (
  <PageWrapper mainClassName="flex flex-col gap-10">
    <DashboardMetrics />
    <RecentOrders />
  </PageWrapper>
);

export default Dashboard;
