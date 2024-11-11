import React, { FC } from "react";
import { APPROVALS_METRICS, SHIPMENTS_METRICS } from "./constants";
import { Metrics } from "./Metrics";

export const DashboardMetrics: FC = () => (
  <section className="flex gap-6">
    <Metrics {...APPROVALS_METRICS} />
    <Metrics {...SHIPMENTS_METRICS} />
  </section>
);
