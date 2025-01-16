import React, { FC } from "react";
import { IMetricsData } from "src/@types/metrics";
import { Sizes } from "src/@types/sizes";
import { Loader } from "../Loader";
import { Metric } from "./Metric";

interface Props {
  metrics: IMetricsData;
  isLoading: boolean;
  isShowSecond?: boolean;
}

export const Metrics: FC<Props> = ({ metrics, isLoading }) => (
  <section>
    {isLoading ? (
      <Loader size={Sizes.XXL} />
    ) : (
      <div className="mt-5 flex gap-6">
        <Metric {...metrics?.approval_metrics} />
        <Metric {...metrics?.shipments_metrics} />
      </div>
    )}
  </section>
);
