import React, { FC } from "react";
import { AllProducts } from "src/page-components/products/AllProducts";
import { CartProducts } from "src/page-components/products/CartProducts";
import { PageWrapper } from "src/components/Layouts/PageWrapper";

const Products: FC = () => (
  <PageWrapper mainClassName="flex flex-col gap-10" popup={CartProducts}>
    <AllProducts />
  </PageWrapper>
);

export default Products;
