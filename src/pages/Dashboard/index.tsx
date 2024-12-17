import React, { FC, useEffect } from "react";
import { FilterByLocationByUser } from "src/page-components/dashboard/FilterByLocationByUser";
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
import { getArrayFromStringParams } from "src/utils/getArrayFromStringParams";
import { QUERY_PARAM_KEYS } from "src/constants/queryParams";
import { IOptionSelect } from "src/@types/form";
import { TypesUsers } from "src/@types/users";

const Dashboard: FC = () => {
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

  const location_ids = getQueryParam(QUERY_PARAM_KEYS.LOCATIONS) || "";
  const su_users_ids = getQueryParam(QUERY_PARAM_KEYS.SUB_USERS) || "";

  useEffect(() => {
    loadMetrics({
      month: selectMonthOption?.value.toString(),
      year: selectYearOption?.value.toString(),
      location_ids: getArrayFromStringParams(location_ids),
      su_users_ids: getArrayFromStringParams(su_users_ids),
    });
  }, [
    loadMetrics,
    location_ids,
    selectMonthOption,
    selectYearOption,
    su_users_ids,
  ]);

  return (
    <PageWrapper mainClassName="flex flex-col gap-10">
      <SelectDate
        selectMonth={selectMonthOption || getCurrentMonthOption()}
        setSelectMonth={setSelectMonthOption}
        selectYear={selectYearOption || getCurrentYearOption()}
        setSelectYear={setSelectYearOption}
      />

      <Show onlyFor={TypesUsers.CLIENT_ADMIN}>
        <FilterByLocationByUser />
      </Show>

      <Metrics metrics={metrics} isLoading={isLoading} />

      <Show onlyFor={TypesUsers.CLIENT_ADMIN}>
        <FinanceSummaryCard />
      </Show>

      <RecentOrders />
    </PageWrapper>
  );
};

export default Dashboard;
