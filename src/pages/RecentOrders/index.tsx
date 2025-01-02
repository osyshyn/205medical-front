import { FC } from "react";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import { Title } from "src/components/Title";

export const RecentOrders: FC = () => {
  return (
    <PageWrapper>
      <Title
        title="Recent Orders"
        subtitle="The following addresses will be used on the checkout page by default."
      />
    </PageWrapper>
  );
};
