import React, { FC } from "react";
import { ProductMetrics } from "src/page-components/products/products-purchases/ProductMetrics";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import { RecentOrders } from "src/components/RecentOrders";

const ProductsPurchases: FC = () => (
  <PageWrapper mainClassName="flex flex-col gap-10">
    <ProductMetrics />
    <RecentOrders isExtendedTable />
  </PageWrapper>
);

export default ProductsPurchases;
