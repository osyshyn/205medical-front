import React, { FC, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { SORT_LIST_ORDER_ALERTS } from "src/page-components/create-order/order-alerts/constants";
import { FilterButton } from "src/components/FilterButton";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import {
  ALERTS_PER_PAGE,
  getTableItems,
  ORDER_TABLE_COLUMNS,
} from "src/components/OrderAlerts/constants";
import { Pagination } from "src/components/Pagination";
import { Search } from "src/components/Search";
import {
  DataRangeIndicator,
  Table,
  TableBody,
  TableHeader,
} from "src/components/Table";
import { Title } from "src/components/Title";
import { Window } from "src/components/Window";
import { useQueryParams } from "src/hooks/useQueryParams";
import useAlertsStore from "src/stores/alert-store";
import { getArrayFromStringParams } from "src/utils/getArrayFromStringParams";
import { QUERY_PARAM_KEYS } from "src/constants/queryParams";
import { IAlertType } from "src/@types/alert";
import { Row } from "src/@types/table";

const OrderAlerts: FC = () => {
  const loadAlerts = useAlertsStore((state) => state.fetchAlerts);
  const updateOrderAlertSetting = useAlertsStore(
    (state) => state.updateOrderAlertSetting
  );

  const { getQueryParam, setMultipleQueryParams } = useQueryParams();

  const searchQuery = getQueryParam(QUERY_PARAM_KEYS.SEARCH) || "";
  const [currentPage, setCurrentPage] = useState(1);

  const orderSortParams = getQueryParam(QUERY_PARAM_KEYS.ORDER_ALERTS) || "";
  const orderSortParamsArray = getArrayFromStringParams(orderSortParams);

  const [debouncedSearchQuery] = useDebounce(searchQuery, 1000);

  const onChangeSearch = (value: React.ChangeEvent<HTMLInputElement>) => {
    setMultipleQueryParams({
      [QUERY_PARAM_KEYS.SEARCH]: value.target.value,
      [QUERY_PARAM_KEYS.PAGE]: "1",
    });
  };

  useEffect(() => {
    loadAlerts({
      search: debouncedSearchQuery,
      current_page: currentPage,
      items_per_page: ALERTS_PER_PAGE,
      type: IAlertType.ORDER,
    });
  }, [currentPage, debouncedSearchQuery, loadAlerts]);

  useEffect(() => {
    updateOrderAlertSetting({
      order_pending: orderSortParamsArray.includes("order_pending"),
      order_rejected: orderSortParamsArray.includes("order_rejected"),
      order_approval: orderSortParamsArray.includes("order_approval"),
      invoice_paid: orderSortParamsArray.includes("invoice_paid"),
    });
  }, [orderSortParamsArray, updateOrderAlertSetting]);

  const alerts = useAlertsStore((state) => state.alerts);
  const alertsResult = alerts?.result || [];
  const alertsCount = alerts?.count || 0;

  const pageCount = Math.ceil(alertsCount / ALERTS_PER_PAGE);
  const isPaginated = pageCount > 1;

  const items = getTableItems(alertsResult) as unknown as Row[];

  return (
    <PageWrapper mainClassName="flex flex-col gap-10">
      <FilterButton className="w-max" list={SORT_LIST_ORDER_ALERTS} />

      <Window>
        <div className="flex items-start justify-between">
          <Title title="Order Alerts" subtitle="" />
          <Search
            className="text-xs"
            value={searchQuery}
            onChange={onChangeSearch}
          />
        </div>
        <Table ariaLabel="All alerts table">
          <TableHeader className="text-left" columns={ORDER_TABLE_COLUMNS} />
          <TableBody
            rowClassname="!text-left"
            items={items}
            columns={ORDER_TABLE_COLUMNS}
          />
        </Table>
        <div className="mt-8 flex items-center justify-between">
          <DataRangeIndicator
            startEntry={(currentPage - 1) * ALERTS_PER_PAGE + 1}
            endEntry={Math.min(currentPage * ALERTS_PER_PAGE, alertsCount)}
            totalEntries={alertsCount}
          />

          {isPaginated && (
            <Pagination
              page={currentPage}
              pageCount={pageCount}
              setPage={setCurrentPage}
            />
          )}
        </div>
      </Window>
    </PageWrapper>
  );
};

export default OrderAlerts;
