import { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  getOpenClosedOrdersItems,
  getOrderHistoryItems,
  OPEN_CLOSED_ORDERS_COLUMNS,
  ORDER_HISTORY_COLUMNS,
} from "src/page-components/location/OrderHistory/constants";
import { Metric as FinanceMetric } from "src/components/FinanceSummaryCard/Metric";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import { Loader } from "src/components/Loader";
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
import { Table, TableBody, TableHeader } from "src/components/Table";
import { Title } from "src/components/Title";
import { Window } from "src/components/Window";
import { useQueryParams } from "src/hooks/useQueryParams";
import useInvoiceStore from "src/stores/invoice-store";
import useLocationStore from "src/stores/location-store";
import useMetricStore from "src/stores/metric-store";
import useOrderStore from "src/stores/order-store";
import useProductStore from "src/stores/product-store";
import { getArrayFromStringParams } from "src/utils/getArrayFromStringParams";
import { QUERY_PARAM_KEYS } from "src/constants/queryParams";
import { IOptionSelect } from "src/@types/form";
import { Row } from "src/@types/table";

export const OrderHistoryByLocation: FC = () => {
  const loadLocations = useLocationStore((state) => state.fetchLocation);
  const locations = useLocationStore((state) => state.locations);
  const loadLocation = useLocationStore((state) => state.fetchLocationById);
  const currentLocation = useLocationStore((state) => state.location);
  const loadOrdersMetrics = useMetricStore((state) => state.fetchMetricOrders);
  const ordersMetrics = useMetricStore((state) => state.metrics_orders);
  const approval_metric = ordersMetrics?.approval_metrics;
  const loadOrders = useOrderStore((state) => state.fetchOrders);
  const orders = useOrderStore((state) => state.orders);
  const loadPurchasesByProductList = useProductStore(
    (state) => state.fetchPurchasesByProductList
  );
  const purchasesByProductList = useProductStore(
    (state) => state.purchasesByProductList
  );
  const loadMonthlyPurchases = useMetricStore(
    (state) => state.fetchMonthlyPurchases
  );
  const monthlyPurchases = useMetricStore((state) => state.monthlyPurchases);
  const loadInvoices = useInvoiceStore((state) => state.fetchinvoice);
  const invoices = useInvoiceStore((state) => state.invoice);
  const invoiceToShow = useInvoiceStore((state) => state.invoiceToShow);
  const invoiceLoading = useInvoiceStore((state) => state.isLoading);

  const currentLocationResult = currentLocation?.result;

  const options = locations.map((location) => ({
    value: location.id,
    label: location.name,
  }));

  const [selectedOption, setSelectedOption] = useState<IOptionSelect | null>(
    options[0]
  );

  const currentPageRef = useRef(1);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const currnetPurchasesPageRef = useRef(1);
  const purchasesSentinelRef = useRef<HTMLDivElement | null>(null);

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

  const su_users_ids = getQueryParam(QUERY_PARAM_KEYS.SUB_USERS) || "";

  useEffect(() => {
    loadLocations();
  }, [loadLocations]);

  useEffect(() => {
    loadLocation(Number(selectedOption?.value));
  }, [loadLocation, selectedOption]);

  useEffect(() => {
    console.log(
      "TEST:",
      "month: ",
      selectMonthOption?.value,
      "year: ",
      selectYearOption?.value
    );
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
    loadPurchasesByProductList({
      month: selectMonthOption?.value.toString(),
      year: selectYearOption?.value.toString(),
      location_ids: [currentLocationResult?.id.toString()],
    });
    loadOrders({
      current_page: 1,
      search: "",
      month: selectMonthOption?.value.toString(),
      year: selectYearOption?.value.toString(),
      location_ids: [currentLocationResult?.id.toString()],
      su_users_ids: getArrayFromStringParams(su_users_ids),
    });
    loadInvoices({
      current_page: 1,
      search: "",
      month: selectMonthOption?.value.toString(),
      year: selectYearOption?.value.toString(),
      location_ids: [currentLocationResult?.id.toString()],
      su_users_ids: getArrayFromStringParams(su_users_ids),
    });
  }, [
    loadOrdersMetrics,
    loadMonthlyPurchases,
    loadPurchasesByProductList,
    loadOrders,
    loadInvoices,
    selectMonthOption,
    selectYearOption,
    currentLocationResult,
    su_users_ids,
  ]);

  const purchaseItems = (getOrderHistoryItems(purchasesByProductList) ||
    []) as Row[];
  const orderClosed = (getOpenClosedOrdersItems(invoiceToShow) || []) as Row[];

  const loadNextPage = useCallback(() => {
    const currentPage = currentPageRef.current + 1;
    currentPageRef.current = currentPage;

    loadInvoices({
      month: selectMonthOption?.value.toString(),
      year: selectYearOption?.value.toString(),
      location_ids: [currentLocationResult?.id.toString()],
      su_users_ids: getArrayFromStringParams(su_users_ids),
      current_page: currentPage,
      search: "",
    });
  }, [loadInvoices, currentLocationResult]);

  const loadNextPurchasesPage = useCallback(() => {
    const currentPage = currentPageRef.current + 1;
    currentPageRef.current = currentPage;

    loadPurchasesByProductList({
      month: selectMonthOption?.value.toString(),
      year: selectYearOption?.value.toString(),
      location_ids: [currentLocationResult?.id.toString()],
      page: currentPage,
    });
  }, [
    loadPurchasesByProductList,
    selectMonthOption,
    selectYearOption,
    currentLocationResult,
    su_users_ids,
  ]);

  useEffect(() => {
    if (!sentinelRef.current) return;
    if (invoices?.count <= invoiceToShow.length) return;
    // if (!invoices.next) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting ?? !invoiceLoading) {
          loadNextPage();
        }
      },
      { rootMargin: "200px", threshold: 0.1 }
    );

    observer.observe(sentinelRef.current);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [loadNextPage, invoiceLoading]);

  // useEffect(() => {
  //   if (!purchasesSentinelRef.current) return;
  //   if (purchasesByProductList.length === 0) return;

  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       if (entry.isIntersecting) {
  //         loadNextPurchasesPage();
  //       }
  //     },
  //     { rootMargin: "200px", threshold: 0.1 }
  //   );

  //   observer.observe(purchasesSentinelRef.current);
  //   observerRef.current = observer;

  //   return () => {
  //     if (observerRef.current) observerRef.current.disconnect();
  //   };
  // }, [loadNextPurchasesPage]);

  console.log("Monthly Purchases: ", monthlyPurchases);

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

      {currentLocationResult && (
        <>
          <div className="mt-5 flex gap-6">
            <Metric {...approval_metric} />
            <FinanceMetric
              title="Total orders"
              value={monthlyPurchases.total_amount}
              color="#5932EA"
              subtitle="Monthly spemding"
            />
          </div>

          <div className="mt-5 flex gap-6">
            <Window className="max-h-150 w-1/2 overflow-auto">
              <div className="flex items-center justify-between">
                <h3>Product Purchases</h3>
              </div>

              <Table ariaLabel="Product Purchases">
                <TableHeader columns={ORDER_HISTORY_COLUMNS} />
                <TableBody
                  items={purchaseItems}
                  columns={ORDER_HISTORY_COLUMNS}
                  refForInfinityScroll={purchasesSentinelRef}
                />
              </Table>
            </Window>
            <Window className="max-h-150 w-1/2 overflow-auto">
              <div className="flex items-center justify-between">
                <h3>Open/Closed Orders</h3>
              </div>

              <Table ariaLabel="Product Purchases">
                <TableHeader columns={OPEN_CLOSED_ORDERS_COLUMNS} />
                <TableBody
                  items={orderClosed}
                  columns={OPEN_CLOSED_ORDERS_COLUMNS}
                  refForInfinityScroll={sentinelRef}
                />
              </Table>
            </Window>
          </div>

          <div className="mt-5">
            <RecentOrders locationId={[`${currentLocationResult?.id}`]} />
          </div>
        </>
      )}
    </PageWrapper>
  );
};
