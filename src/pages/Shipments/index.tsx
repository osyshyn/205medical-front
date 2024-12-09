import React, { FC } from "react";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import { Metrics } from "src/components/Metrics";

const Shipments: FC = () => (
  <PageWrapper mainClassName="flex flex-col gap-10">
    <Metrics />
    <div>table</div>
  </PageWrapper>
);

export default Shipments;
