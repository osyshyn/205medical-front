import React, { FC, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { Pagination } from "src/components/Pagination";
import { Search } from "src/components/Search";
import {
  DataRangeIndicator,
  Table,
  TableBody,
  TableHeader,
} from "src/components/Table";
import { Window } from "src/components/Window";
import { useQueryParams } from "src/hooks/useQueryParams";
import useOrderStore, { ORDERS_PER_PAGE } from "src/stores/order-store";
import { getArrayFromStringParams } from "src/utils/getArrayFromStringParams";
import { QUERY_PARAM_KEYS } from "src/constants/queryParams";
import { Row } from "src/@types/table";
import {
  getCurrentMonthOption,
  getCurrentYearOption,
} from "../SelectDate/constants";
import { getTableItems, ORDER_COLUMNS } from "./constants";

const DEBOUNCE_DELAY = 1000;

interface RecentOrdersProps {
  locationId?: string[];
}

export const RecentOrders: FC<RecentOrdersProps> = ({ locationId }) => {
  const loadOrders = useOrderStore((state) => state.fetchOrders);
  const isLoading = useOrderStore((state) => state.isLoading);

  const { getQueryParam, setQueryParam, setMultipleQueryParams } =
    useQueryParams();

  const year =
    getQueryParam(QUERY_PARAM_KEYS.YEAR) ||
    getCurrentYearOption().value.toString();
  const month =
    getQueryParam(QUERY_PARAM_KEYS.MONTH) ||
    getCurrentMonthOption().value.toString();

  const searchQuery = getQueryParam(QUERY_PARAM_KEYS.SEARCH) || "";
  const currentPage = Number(getQueryParam(QUERY_PARAM_KEYS.PAGE)) || 1;

  const [debouncedSearchQuery] = useDebounce(searchQuery, DEBOUNCE_DELAY);

  const onChangeSearch = (value: React.ChangeEvent<HTMLInputElement>) => {
    setMultipleQueryParams({
      [QUERY_PARAM_KEYS.SEARCH]: value.target.value,
      [QUERY_PARAM_KEYS.PAGE]: "1",
    });
  };

  const location_ids = locationId
    ? locationId // Используем переданный locationId
    : getArrayFromStringParams(getQueryParam(QUERY_PARAM_KEYS.LOCATIONS));
  const product_ids = getQueryParam(QUERY_PARAM_KEYS.PRODUCTS) || "";

  useEffect(() => {
    loadOrders({
      search: debouncedSearchQuery,
      current_page: currentPage,
      year: year,
      month: month,
      location_ids,
      product_ids: getArrayFromStringParams(product_ids),
    });
  }, [
    currentPage,
    debouncedSearchQuery,
    month,
    year,
    // location_ids,
    product_ids,
    loadOrders,
  ]);

  const ordersResponse = useOrderStore((state) => state.orders);
  const ordersResults = ordersResponse?.result || [];
  const ordersLength = ordersResponse?.count || 0;

  const pageCount = Math.ceil(ordersResponse?.count / ORDERS_PER_PAGE);
  const isPaginated = pageCount > 1;

  const setPage = (page: number) => {
    if (page !== currentPage) {
      setQueryParam(QUERY_PARAM_KEYS.PAGE, page.toString());
    }
  };

  const items = getTableItems(ordersResults) as unknown as Row[];

  console.log("Orders: ", ordersResults);

  return (
    <Window>
      <div className="flex items-center justify-between">
        <h3>Recent Orders</h3>

        <Search
          className="text-xs"
          value={searchQuery}
          onChange={onChangeSearch}
        />
      </div>

      <Table ariaLabel="Recent orders table">
        <TableHeader columns={ORDER_COLUMNS} />
        <TableBody
          items={items}
          columns={ORDER_COLUMNS}
          isLoading={isLoading}
        />
      </Table>

      <div className="mt-8 flex items-center justify-between">
        <DataRangeIndicator
          startEntry={(currentPage - 1) * ORDERS_PER_PAGE + 1}
          endEntry={Math.min(currentPage * ORDERS_PER_PAGE, ordersLength)}
          totalEntries={ordersLength}
        />

        {isPaginated && (
          <Pagination
            page={currentPage}
            pageCount={pageCount}
            setPage={setPage}
          />
        )}
      </div>
    </Window>
  );
};
