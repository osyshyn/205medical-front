import { FC } from "react";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import { Title } from "src/components/Title";

export const Reporting: FC = () => {
  return (
    <PageWrapper>
      <Title
        title="Reporting"
        subtitle="The following addresses will be used on the checkout page by default."
      />
    </PageWrapper>
  );
};
