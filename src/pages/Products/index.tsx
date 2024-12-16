import React, { FC } from "react";
import { Cart } from "src/page-components/products/Cart";
import { AllProducts } from "src/components/AllProducts";
import { PageWrapper } from "src/components/Layouts/PageWrapper";

const Products: FC = () => (
  <PageWrapper mainClassName="flex flex-col gap-10" popup={Cart}>
    <AllProducts />
  </PageWrapper>
);

export default Products;
