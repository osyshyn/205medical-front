import React, { FC } from "react";
import { APPROVALS_METRICS, SHIPMENTS_METRICS } from "./constants";
import { DateMetrics } from "./DateMetrics";
import { Metrics } from "./Metrics";

export const DashboardMetrics: FC = () => (
  <section>
    <DateMetrics />

    <div className="mt-5 flex gap-6">
      <Metrics {...APPROVALS_METRICS} />
      <Metrics {...SHIPMENTS_METRICS} />
    </div>
  </section>
);
