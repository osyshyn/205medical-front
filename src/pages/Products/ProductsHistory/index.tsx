import React, { FC } from "react";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import { RecentOrders } from "src/components/RecentOrders";

const ProductsHistory: FC = () => (
  <PageWrapper mainClassName="flex flex-col gap-10">
    <RecentOrders />
  </PageWrapper>
);

export default ProductsHistory;
