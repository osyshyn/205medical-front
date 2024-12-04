import React, { FC } from "react";
import { PopupCard } from "src/page-components/products/PopupCard";
import { AllProducts } from "src/components/AllProducts";
import { PageWrapper } from "src/components/Layouts/PageWrapper";

const Products: FC = () => (
  <PageWrapper mainClassName="flex flex-col gap-10" popup={PopupCard}>
    <AllProducts />
  </PageWrapper>
);

export default Products;
