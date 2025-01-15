import { FC, useEffect } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { ShipmentHistory } from "src/page-components/shipments/ShipmentHistory";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import { Metrics } from "src/components/Metrics";
import { Metric } from "src/components/Metrics/Metric";
import { getShipmentStatusLabel } from "src/components/OrderAlerts/constants";
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
import useAlertsStore from "src/stores/alert-store";
import useMetricStore from "src/stores/metric-store";
import useShipmentStore from "src/stores/shipment-store";
import { QUERY_PARAM_KEYS } from "src/constants/queryParams";
import { PATHNAMES } from "src/constants/routes";
import { IAlertType } from "src/@types/alert";
import { IOptionSelect } from "src/@types/form";

const Shipment: FC = () => {
  const loadMetrics = useMetricStore((state) => state.fetchMetricOrders);
  const metrics = useMetricStore((state) => state.metrics_orders);
  const isLoading = useMetricStore((state) => state.isLoading);

  const loadShipmentAlerts = useAlertsStore((state) => state.fetchAlerts);
  const alerts = useAlertsStore((state) => state.reportingAlerts);

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

  const currentPage = 1;
  const [debouncedSearchQuery] = useDebounce("", 1000);

  useEffect(() => {
    loadMetrics({
      year: selectMonthOption?.value.toString(),
      month: selectYearOption?.value.toString(),
    });
    loadShipmentAlerts({
      search: debouncedSearchQuery,
      current_page: currentPage,
      items_per_page: 10,
      type: IAlertType.SHIPMENT,
    });
  }, [loadMetrics, selectMonthOption, selectYearOption]);

  const { orders, shipments } = alerts;

  const shipmentsResult = shipments?.result || [];

  return (
    <PageWrapper mainClassName="flex flex-col gap-10">
      <SelectDate
        selectMonth={selectMonthOption || getCurrentMonthOption()}
        setSelectMonth={setSelectMonthOption}
        selectYear={selectYearOption || getCurrentYearOption()}
        setSelectYear={setSelectYearOption}
      />
      <div className="mt-5 flex gap-6">
        <Metric {...metrics?.approval_metrics} />
        <Window className="w-1/2">
          <Title title="Shipment alerts" subtitle="" />
          <div className="mt-5 flex max-h-[150px] flex-col gap-2 overflow-auto">
            {shipmentsResult.map((shipment) => (
              <div className="flex justify-between">
                <p>
                  Order {shipment.id} {getShipmentStatusLabel(shipment.status)}
                </p>
                <p className="text-gray-300">{shipment.created_at}</p>
              </div>
            ))}
          </div>

          <Link to={PATHNAMES.SHIPMENT_ALERTS}>
            <div className="mt-4 flex w-full justify-end underline">
              View All
            </div>
          </Link>
        </Window>
      </div>
      {/* <Metrics metrics={metrics} isLoading={isLoading} /> */}
      <ShipmentHistory />
      <Outlet />
    </PageWrapper>
  );
};

export default Shipment;
