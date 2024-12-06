import React, { FC } from "react";
import { CartProducts } from "src/page-components/create-order/CartProducts";
import { OrderInfomation } from "src/page-components/create-order/OrderInfomation";
import { PageWrapper } from "src/components/Layouts/PageWrapper";

const CreateOrder: FC = () => (
  <PageWrapper mainClassName="flex flex-col gap-10">
    <OrderInfomation />
    <CartProducts />
  </PageWrapper>
);

export default CreateOrder;
