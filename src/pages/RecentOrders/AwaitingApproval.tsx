import { FC, useCallback, useEffect, useRef } from "react";
import { Outlet } from "react-router";
import {
  AWAITING_APPROVALS_COLUMNS,
  AWAITING_PER_PAGE,
  getTableItems,
} from "src/page-components/awaiting-approval/constants";
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
import { Table, TableBody, TableHeader } from "src/components/Table";
import { Title } from "src/components/Title";
import { Window } from "src/components/Window";
import { useQueryParams } from "src/hooks/useQueryParams";
import useMetricStore from "src/stores/metric-store";
import useOrderStore, { ORDERS_PER_PAGE } from "src/stores/order-store";
import { getArrayFromStringParams } from "src/utils/getArrayFromStringParams";
import { QUERY_PARAM_KEYS } from "src/constants/queryParams";
import { IOptionSelect } from "src/@types/form";
import { IStatusesApproval } from "src/@types/orders";
import { Row } from "src/@types/table";

export const AwaitingApproval: FC = () => {
  const loadMetrics = useMetricStore((state) => state.fetchMetricOrders);
  const rejectOrApproveOrder = useOrderStore(
    (state) => state.rejectOrApproveOrder
  );
  const metrics = useMetricStore((state) => state.metrics_orders);
  const loadOrdersToApproves = useOrderStore(
    (state) => state.fetchApprovesOrder
  );
  const selectedApprovedOrders = useOrderStore(
    (state) => state.selectedApprovedOrders
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

  const currentPageRef = useRef(1);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const location_ids = getQueryParam(QUERY_PARAM_KEYS.LOCATIONS) || "";
  const su_users_ids = getQueryParam(QUERY_PARAM_KEYS.SUB_USERS) || "";

  const selectOrder = useOrderStore((state) => state.setSelectedApprovedOrders);

  const year =
    getQueryParam(QUERY_PARAM_KEYS.YEAR) ||
    getCurrentYearOption().value.toString();
  const month =
    getQueryParam(QUERY_PARAM_KEYS.MONTH) ||
    getCurrentMonthOption().value.toString();

  useEffect(() => {
    loadMetrics({
      month: selectMonthOption?.value.toString(),
      year: selectYearOption?.value.toString(),
      location_ids: getArrayFromStringParams(location_ids),
      su_users_ids: getArrayFromStringParams(su_users_ids),
    });
    loadOrdersToApproves({
      month,
      year,
      items_per_page: AWAITING_PER_PAGE,
      current_page: "1",
    });
  }, [
    loadMetrics,
    loadOrdersToApproves,
    selectMonthOption,
    selectYearOption,
    su_users_ids,
    location_ids,
  ]);

  console.log("ordersToApproves: ", ordersToApproves);

  const ordersToApprovesResult = ordersToApproves?.result;
  const ordersLength = ordersToApproves?.total || 0;

  const items = getTableItems(ordersToApprovesResult || []) as unknown as Row[];

  const handleApprove = () => {
    const orderIds = selectedApprovedOrders.map((order) => order.id);
    rejectOrApproveOrder(orderIds, IStatusesApproval.APPROVED);
  };

  const handleReject = () => {
    const orderIds = selectedApprovedOrders.map((order) => order.id);
    rejectOrApproveOrder(orderIds, IStatusesApproval.REJECTED);
  };

  const loadNextPage = useCallback(() => {
    const currentPage = currentPageRef.current + 1;
    currentPageRef.current = currentPage;

    loadOrdersToApproves({
      month,
      year,
      items_per_page: AWAITING_PER_PAGE,
      current_page: currentPage.toString(),
    });
  }, [loadOrdersToApproves, month, year]);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading) {
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
  }, [loadNextPage, isLoading]);

  const selectAllApprovedOrders = useOrderStore(
    (state) => state.selectAllApprovedOrders
  );

  const handleSelectAll = () => {
    if (ordersToApprovesResult) {
      selectAllApprovedOrders(ordersToApprovesResult);
    }
  };

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

        <Table className="h-[600px] overflow-auto">
          <TableHeader columns={AWAITING_APPROVALS_COLUMNS} />
          <TableBody
            items={items}
            columns={AWAITING_APPROVALS_COLUMNS}
            isLoading={isLoading}
            refForInfinityScroll={sentinelRef}
          />
        </Table>

        <div className="max-w mt-5 flex justify-between gap-3">
          <p
            className="cursor-pointer text-gray-ligth underline"
            onClick={handleSelectAll}
          >
            Select All
          </p>
          <div className="flex gap-3">
            <Button
              className="rounded-2xl"
              variant={ButtonVariants.PRIMARY_SQUARE}
              onClick={handleApprove}
            >
              Approve
            </Button>
            <Button
              className="rounded-2xl"
              variant={ButtonVariants.SECONDARY_SQUARE}
              onClick={handleReject}
            >
              Reject
            </Button>
          </div>
        </div>
      </Window>
      <Outlet />
    </PageWrapper>
  );
};
