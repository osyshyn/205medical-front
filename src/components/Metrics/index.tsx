import React, { FC, useEffect, useState } from "react";
import useMetricStore from "src/stores/metric-store";
import { IOptionSelect } from "src/@types/form";
import { Sizes } from "src/@types/sizes";
import { Loader } from "../Loader";
import { getCurrentMonthOption, getCurrentYearOption } from "./constants";
import { DateMetrics } from "./DateMetrics";
import { Metric } from "./Metric";

export const Metrics: FC = () => {
  const [selectMonth, setSelectMonth] = useState<IOptionSelect>(
    getCurrentMonthOption()
  );
  const [selectYear, setSelectYear] = useState<IOptionSelect>(
    getCurrentYearOption()
  );

  const loadMetrics = useMetricStore((state) => state.fetchMetrics);
  const metrics = useMetricStore((state) => state.metrics);
  const isLoading = useMetricStore((state) => state.isLoading);

  useEffect(() => {
    loadMetrics({
      year: selectYear.value as number,
      month: selectMonth.value as number,
    });
  }, [loadMetrics, selectMonth, selectYear]);

  return (
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
};
