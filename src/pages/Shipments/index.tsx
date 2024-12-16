import React, { FC, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { ShipmentHistory } from "src/page-components/shipments/ShipmentHistory";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import { Metrics } from "src/components/Metrics";
import { SelectDate } from "src/components/SelectDate";
import {
  getCurrentMonthOption,
  getCurrentYearOption,
  MONTH_OPTIONS_SELECT,
  YEARS_OPTIONS_SELECT,
} from "src/components/SelectDate/constants";
import { useQueryParams } from "src/hooks/useQueryParams";
import useMetricStore from "src/stores/metric-store";
import { getItemPath } from "src/utils/getItemPath";
import { QUERY_PARAM_KEYS } from "src/constants/queryParams";
import { PATHNAMES } from "src/constants/routes";
import { IOptionSelect } from "src/@types/form";

const Shipments: FC = () => {
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
      year: selectMonthOption?.value as number,
      month: selectYearOption?.value as number,
    });
  }, [loadMetrics, selectMonthOption, selectYearOption]);

  return (
    <PageWrapper mainClassName="flex flex-col gap-10">
      <SelectDate
        selectMonth={selectMonthOption || getCurrentMonthOption()}
        setSelectMonth={setSelectMonthOption}
        selectYear={selectYearOption || getCurrentYearOption()}
        setSelectYear={setSelectYearOption}
      />
      <Metrics metrics={metrics} isLoading={isLoading} />
      <Link to={getItemPath(PATHNAMES.ORDER_DETAIL, { id: "1" })}>
        <Button variant={ButtonVariants.SECONDARY_SQUARE}>View</Button>
      </Link>
      <ShipmentHistory />
      <Outlet />
    </PageWrapper>
  );
};

export default Shipments;
