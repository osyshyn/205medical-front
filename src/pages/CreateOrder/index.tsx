import React, { FC } from "react";
import { CartProducts } from "src/page-components/create-order/CartProducts";
import { OrderInfomation } from "src/page-components/create-order/OrderInfomation";
import { CreateOrderForm } from "src/page-components/create-order/OrderInfomation/CreateOrderForm";
import { PageWrapper } from "src/components/Layouts/PageWrapper";

const CreateOrder: FC = () => (
  <PageWrapper mainClassName="flex flex-col gap-10">
    <CreateOrderForm>
      <OrderInfomation />
      <CartProducts />
    </CreateOrderForm>
  </PageWrapper>
);

export default CreateOrder;
