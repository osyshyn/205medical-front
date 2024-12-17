import React, { FC, useEffect } from "react";
import { FilterButton } from "src/components/FilterButton";
import { FinanceSummaryCard } from "src/components/FinanceSummaryCard";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import { Metrics } from "src/components/Metrics";
import { Show } from "src/components/PrivateRoute/Show";
import { RecentOrders } from "src/components/RecentOrders";
import { SelectDate } from "src/components/SelectDate";
import {
  getCurrentMonthOption,
  getCurrentYearOption,
  MONTH_OPTIONS_SELECT,
  YEARS_OPTIONS_SELECT,
} from "src/components/SelectDate/constants";
import { useQueryParams } from "src/hooks/useQueryParams";
import useMetricStore from "src/stores/metric-store";
import useUserStore from "src/stores/user-store";
import { QUERY_PARAM_KEYS } from "src/constants/queryParams";
import { IOptionSelect } from "src/@types/form";
import { TypesUsers } from "src/@types/users";

const Dashboard: FC = () => {
  const user = useUserStore((state) => state.user);

  const loadMetrics = useMetricStore((state) => state.fetchMetricOrders);
  const metrics = useMetricStore((state) => state.metrics_orders);
  const isLoading = useMetricStore((state) => state.isLoading);

  const { getQueryParam, setMultipleQueryParams } = useQueryParams();

  const selectMonthOption = MONTH_OPTIONS_SELECT.find(
    ({ value }) => value === +getQueryParam(QUERY_PARAM_KEYS.MONTH)
  );

  const selectYearOption = YEARS_OPTIONS_SELECT.find(
    ({ value }) => value === +getQueryParam(QUERY_PARAM_KEYS.YEAR)
  );

  const setSelectMonthOption = ({ value }: IOptionSelect) =>
    setMultipleQueryParams({
      [QUERY_PARAM_KEYS.MONTH]: value,
      [QUERY_PARAM_KEYS.PAGE]: "1",
    });

  const setSelectYearOption = ({ value }: IOptionSelect) => {
    setMultipleQueryParams({
      [QUERY_PARAM_KEYS.YEAR]: value,
      [QUERY_PARAM_KEYS.PAGE]: "1",
    });
  };

  useEffect(() => {
    loadMetrics({
      month: selectMonthOption?.value.toString(),
      year: selectYearOption?.value.toString(),
    });
  }, [loadMetrics, selectMonthOption, selectYearOption]);

  return (
    <PageWrapper mainClassName="flex flex-col gap-10">
      <Show onlyFor={TypesUsers.CLIENT_ADMIN}>
        <FilterButton
          className="w-max"
          list={[]}
          // isLoading={isLoadingCategories}
        />
      </Show>

      <SelectDate
        selectMonth={selectMonthOption || getCurrentMonthOption()}
        setSelectMonth={setSelectMonthOption}
        selectYear={selectYearOption || getCurrentYearOption()}
        setSelectYear={setSelectYearOption}
        isTitleHidden={user.role === TypesUsers.CLIENT_ADMIN}
      />

      <Metrics metrics={metrics} isLoading={isLoading} />

      <Show onlyFor={TypesUsers.CLIENT_ADMIN}>
        <FinanceSummaryCard />
      </Show>

      <RecentOrders />
    </PageWrapper>
  );
};

export default Dashboard;
