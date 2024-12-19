import { FC, useEffect } from "react";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import { Metrics } from "src/components/Metrics";
import { SelectDate } from "src/components/SelectDate";
import {
  getCurrentMonthOption,
  getCurrentYearOption,
  MONTH_OPTIONS_SELECT,
  YEARS_OPTIONS_SELECT,
} from "src/components/SelectDate/constants";
import { Title } from "src/components/Title";
import { Window } from "src/components/Window";
import { useQueryParams } from "src/hooks/useQueryParams";
import useMetricStore from "src/stores/metric-store";
import useOrderStore, { ORDERS_PER_PAGE } from "src/stores/order-store";
import { getArrayFromStringParams } from "src/utils/getArrayFromStringParams";
import { QUERY_PARAM_KEYS } from "src/constants/queryParams";
import { IOptionSelect } from "src/@types/form";

export const AwaitingApproval: FC = () => {
  const loadMetrics = useMetricStore((state) => state.fetchMetricOrders);
  const metrics = useMetricStore((state) => state.metrics_orders);
  const loadOrdersToApproves = useOrderStore(
    (state) => state.fetchApprovesOrder
  );
  const ordersToApproves = useOrderStore((state) => state.approvesOrders);
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
    loadOrdersToApproves({
      current_page: "1",
      items_per_page: ORDERS_PER_PAGE,
      month: selectMonthOption?.value.toString(),
      year: selectYearOption?.value.toString(),
    });
  }, [
    loadMetrics,
    loadOrdersToApproves,
    selectMonthOption,
    selectYearOption,
    su_users_ids,
    location_ids,
  ]);

  console.log("Orders to Approves: ", ordersToApproves);

  return (
    <PageWrapper className="flex flex-col">
      <SelectDate
        selectMonth={selectMonthOption || getCurrentMonthOption()}
        setSelectMonth={setSelectMonthOption}
        selectYear={selectYearOption || getCurrentYearOption()}
        setSelectYear={setSelectYearOption}
      />

      <Metrics metrics={metrics} isLoading={isLoading} />

      <Window className="mt-10">
        <Title title="Awaiting approval" subtitle="" />
      </Window>
    </PageWrapper>
  );
};