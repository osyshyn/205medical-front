import React, { FC } from "react";
import { IOptionSelect, SetOptionSelect } from "src/@types/form";
import { IMetricsData } from "src/@types/metrics";
import { Sizes } from "src/@types/sizes";
import { Loader } from "../Loader";
import { DateMetrics } from "./DateMetrics";
import { Metric } from "./Metric";

interface Props {
  selectMonth: IOptionSelect;
  setSelectMonth: SetOptionSelect;
  selectYear: IOptionSelect;
  setSelectYear: SetOptionSelect;
  metrics: IMetricsData;
  isLoading: boolean;
}

export const Metrics: FC<Props> = ({
  selectMonth,
  setSelectMonth,
  selectYear,
  setSelectYear,
  metrics,
  isLoading,
}) => (
  <section>
    {isLoading ? (
      <Loader size={Sizes.XXL} />
    ) : (
      <>
        <DateMetrics
          selectMonth={selectMonth}
          setSelectMonth={setSelectMonth}
          selectYear={selectYear}
          setSelectYear={setSelectYear}
        />

        <div className="mt-5 flex gap-6">
          <Metric {...metrics?.approval_metrics} />
          <Metric {...metrics?.shipments_metrics} />
        </div>
      </>
    )}
  </section>
);
