import React, { FC, useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
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
import useOrderStore from "src/stores/order-store";
import useProductStore from "src/stores/product-store";
import { QUERY_PARAM_KEYS } from "src/constants/queryParams";
import { ReactComponent as FilterIcon } from "src/assets/icons/filter.svg";
import { Row } from "src/@types/table";

const OrderAlerts: FC = () => {
  const loadAlerts = useAlertsStore((state) => state.fetchAlerts);

  const { getQueryParam, setQueryParam, setMultipleQueryParams } =
    useQueryParams();

  const searchQuery = getQueryParam(QUERY_PARAM_KEYS.SEARCH) || "";
  const [currentPage, setCurrentPage] = useState(1);

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
      type: "1",
    });
  }, [currentPage, debouncedSearchQuery, loadAlerts]);

  const alerts = useAlertsStore((state) => state.alerts);
  const alertsResult = alerts?.result || [];
  const alertsCount = alerts?.count || 0;

  const pageCount = Math.ceil(alertsCount / ALERTS_PER_PAGE);
  const isPaginated = pageCount > 1;

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ALERTS_PER_PAGE;
    const end = start + ALERTS_PER_PAGE;
    return alertsResult.slice(start, end);
  }, [alertsResult, currentPage]);

  const items = getTableItems(paginatedData) as unknown as Row[];

  return (
    <PageWrapper mainClassName="flex flex-col gap-10">
      <div>
        <Button className="gap-2.5 px-4 py-2.5" variant={ButtonVariants.WHITE}>
          <FilterIcon />
          <span>Filter</span>
        </Button>
        <Window className="mt-6">
          <div className="flex items-start justify-between">
            <Title title="Order Alerts" subtitle="" />
            <Search
              className="text-xs"
              value={searchQuery}
              onChange={onChangeSearch}
            />
          </div>
          <Table ariaLabel="All alerts table">
            <TableHeader columns={ORDER_TABLE_COLUMNS} />
            <TableBody items={items} columns={ORDER_TABLE_COLUMNS} />
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
      </div>
    </PageWrapper>
  );
};

export default OrderAlerts;
