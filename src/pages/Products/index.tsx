import React, { FC } from "react";
import { AllProducts } from "src/page-components/products/AllProducts";
import { Cart } from "src/page-components/products/Cart";
import { PageWrapper } from "src/components/Layouts/PageWrapper";

const Products: FC = () => (
  <PageWrapper mainClassName="flex flex-col gap-10" popup={Cart}>
    <AllProducts />
  </PageWrapper>
);

export default Products;
