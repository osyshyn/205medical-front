import React, { FC } from "react";
import { ActiveLocation } from "src/page-components/location/ActiveLocation";
import { EditLocation } from "src/page-components/location/EditLocation";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import { Title } from "src/components/Title";

const Location: FC = () => (
  <PageWrapper mainClassName="flex flex-col gap-10">
    <Title
      title="Location"
      subtitle="The following addresses will be used on the checkout page by default."
    />

    <section className="flex gap-10">
      <ActiveLocation />
      <EditLocation />
    </section>
  </PageWrapper>
);

export default Location;
