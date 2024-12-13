import React, { FC } from "react";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import { RecentOrders } from "src/components/RecentOrders";

const ProductsHistory: FC = () => (
  <PageWrapper>
    <RecentOrders />
  </PageWrapper>
);

export default ProductsHistory;
