import React, { FC } from "react";
import { CartProducts } from "src/page-components/products/CartProducts";
import { AllProducts } from "src/components/AllProducts";
import { PageWrapper } from "src/components/Layouts/PageWrapper";

const Products: FC = () => (
  <PageWrapper mainClassName="flex flex-col gap-10" popup={CartProducts}>
    <AllProducts />
  </PageWrapper>
);

export default Products;
