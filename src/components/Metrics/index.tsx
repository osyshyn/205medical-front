import React, { FC, useEffect } from "react";
import useMetricStore from "src/stores/metric-store";
import { Loader } from "../Loader";
import { DateMetrics } from "./DateMetrics";
import { Metric } from "./Metric";

export const Metrics: FC = () => {
  const loadMetrics = useMetricStore((state) => state.fetchMetrics);
  const metrics = useMetricStore((state) => state.metrics);
  const isLoading = useMetricStore((state) => state.isLoading);

  useEffect(() => {
    loadMetrics();
  }, [loadMetrics]);

  return (
    <section>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <DateMetrics />

          <div className="mt-5 flex gap-6">
            <Metric {...metrics?.approval_metrics} />
            <Metric {...metrics?.shipments_metrics} />
          </div>
        </>
      )}
    </section>
  );
};
