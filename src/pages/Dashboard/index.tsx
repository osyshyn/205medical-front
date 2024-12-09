import React, { FC, useEffect, useState } from "react";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import { Metrics } from "src/components/Metrics";
import {
  getCurrentMonthOption,
  getCurrentYearOption,
} from "src/components/Metrics/constants";
import { RecentOrders } from "src/components/RecentOrders";
import useMetricStore from "src/stores/metric-store";
import { IOptionSelect } from "src/@types/form";

const Dashboard: FC = () => {
  const [selectMonth, setSelectMonth] = useState<IOptionSelect>(
    getCurrentMonthOption()
  );
  const [selectYear, setSelectYear] = useState<IOptionSelect>(
    getCurrentYearOption()
  );

  const loadMetrics = useMetricStore((state) => state.fetchMetricOrders);
  const metrics = useMetricStore((state) => state.metrics_orders);
  const isLoading = useMetricStore((state) => state.isLoading);

  useEffect(() => {
    loadMetrics({
      year: selectYear.value as number,
      month: selectMonth.value as number,
    });
  }, [loadMetrics, selectMonth, selectYear]);
  return (
    <PageWrapper mainClassName="flex flex-col gap-10">
      <Metrics
        selectMonth={selectMonth}
        setSelectMonth={setSelectMonth}
        selectYear={selectYear}
        setSelectYear={setSelectYear}
        metrics={metrics}
        isLoading={isLoading}
      />
      <RecentOrders />
    </PageWrapper>
  );
};

export default Dashboard;
