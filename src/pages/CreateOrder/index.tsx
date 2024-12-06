import React, { FC } from "react";
import { OrderInfomation } from "src/page-components/create-order/OrderInfomation";
import { PageWrapper } from "src/components/Layouts/PageWrapper";

const CreateOrder: FC = () => (
  <PageWrapper mainClassName="flex flex-col gap-10">
    <OrderInfomation />
  </PageWrapper>
);

export default CreateOrder;
