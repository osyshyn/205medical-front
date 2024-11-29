import React, { FC } from "react";
import { AllProducts } from "src/components/AllProducts";
import { PageWrapper } from "src/components/Layouts/PageWrapper";

const Products: FC = () => (
  <PageWrapper mainClassName="flex flex-col gap-10">
    <AllProducts />
  </PageWrapper>
);

export default Products;
