import { FC, useEffect, useState } from "react";
import { Metric as FinanceMetric } from "src/components/FinanceSummaryCard/Metric";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import { Metrics } from "src/components/Metrics";
import { Metric } from "src/components/Metrics/Metric";
import { RecentOrders } from "src/components/RecentOrders";
import { SelectDate } from "src/components/SelectDate";
import {
  getCurrentMonthOption,
  getCurrentYearOption,
  MONTH_OPTIONS_SELECT,
  YEARS_OPTIONS_SELECT,
} from "src/components/SelectDate/constants";
import { SelectDropdownList } from "src/components/SelectDropdownList";
import { Title } from "src/components/Title";
import { useQueryParams } from "src/hooks/useQueryParams";
import useLocationStore from "src/stores/location-store";
import useMetricStore from "src/stores/metric-store";
import useOrderStore from "src/stores/order-store";
import { getArrayFromStringParams } from "src/utils/getArrayFromStringParams";
import { QUERY_PARAM_KEYS } from "src/constants/queryParams";
import { IOptionSelect } from "src/@types/form";

export const OrderHistoryByLocation: FC = () => {
  const loadLocations = useLocationStore((state) => state.fetchLocation);
  const locations = useLocationStore((state) => state.locations);
  const loadLocation = useLocationStore((state) => state.fetchLocationById);
  const currentLocation = useLocationStore((state) => state.location);
  const loadOrdersMetrics = useMetricStore((state) => state.fetchMetricOrders);
  const ordersMetrics = useMetricStore((state) => state.metrics_orders);
  const isLoading = useMetricStore((state) => state.isLoading);
  const approval_metric = ordersMetrics?.approval_metrics;

  const loadMonthlyPurchases = useMetricStore(
    (state) => state.fetchMonthlyPurchases
  );
  const monthlyPurchases = useMetricStore((state) => state.monthlyPurchases);

  const loadProductMetric = useMetricStore(
    (state) => state.fetchMetricProducts
  );
  const productMetric = useMetricStore((state) => state.metrics_products);

  const loadPurchaseHistory = useMetricStore(
    (state) => state.fetchPurchaseHistory
  );
  const purchaseHistory = useMetricStore((state) => state.purchase_history);

  const currentLocationResult = currentLocation?.result;

  const options: IOptionSelect[] = locations.map((location) => ({
    value: location.id, // Assuming 'id' is the unique identifier for each location
    label: location.name, // Assuming 'name' is the display name for each location
  }));

  const [selectedOption, setSelectedOption] = useState<IOptionSelect | null>(
    options[0]
  );

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
    loadLocations();
  }, [loadLocations, loadOrdersMetrics]);

  useEffect(() => {
    loadLocation(Number(selectedOption?.value));
  }, [selectedOption]);

  useEffect(() => {
    loadOrdersMetrics({
      month: selectMonthOption?.value.toString(),
      year: selectYearOption?.value.toString(),
      location_ids: [currentLocationResult?.id.toString()],
      su_users_ids: getArrayFromStringParams(su_users_ids),
    });
    loadMonthlyPurchases({
      month: selectMonthOption?.value.toString(),
      year: selectYearOption?.value.toString(),
      location_ids: [currentLocationResult?.id.toString()],
      su_users_ids: getArrayFromStringParams(su_users_ids),
    });
    loadProductMetric({
      month: selectMonthOption?.value.toString(),
      year: selectYearOption?.value.toString(),
      location_ids: [currentLocationResult?.id.toString()],
      su_users_ids: getArrayFromStringParams(su_users_ids),
    });
    loadPurchaseHistory({
      month: selectMonthOption?.value.toString(),
      year: selectYearOption?.value.toString(),
      location_ids: [currentLocationResult?.id.toString()],
      su_users_ids: getArrayFromStringParams(su_users_ids),
    });
  }, [
    loadOrdersMetrics,
    loadMonthlyPurchases,
    loadProductMetric,
    loadPurchaseHistory,
    location_ids,
    selectMonthOption,
    selectYearOption,
    currentLocationResult,
  ]);

  return (
    <PageWrapper>
      <SelectDate
        selectMonth={selectMonthOption || getCurrentMonthOption()}
        setSelectMonth={setSelectMonthOption}
        selectYear={selectYearOption || getCurrentYearOption()}
        setSelectYear={setSelectYearOption}
      />
      <Title title="Location name" subtitle="" />

      <SelectDropdownList
        options={options}
        activeOption={selectedOption}
        setOption={setSelectedOption}
        className="w-full"
      />

      {/* <Metrics metrics={ordersMetrics} isLoading={isLoading} /> */}
      <div className="mt-5 flex gap-6">
        <Metric {...approval_metric} />
        <FinanceMetric
          title="Total orders"
          value={monthlyPurchases.total_amount}
          color="#5932EA"
          subtitle="Monthly spemding"
        />
      </div>

      <RecentOrders locationId={[`${currentLocationResult?.id}`]} />
    </PageWrapper>
  );
};
