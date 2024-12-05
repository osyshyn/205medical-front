import React, { FC, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { Pagination } from "src/components/Pagination";
import { Search } from "src/components/Search";
import { SelectDropdownList } from "src/components/SelectDropdownList";
import {
  DataRangeIndicator,
  Table,
  TableBody,
  TableHeader,
} from "src/components/Table";
import { Window } from "src/components/Window";
import { useQueryParams } from "src/hooks/useQueryParams";
import useOrderStore, { ORDERS_PER_PAGE } from "src/stores/order-store";
import { QUERY_PARAM_KEYS } from "src/constants/queryParams";
import { IOptionSelect } from "src/@types/form";
import { ORDER_COLUMNS, ORDER_SORT_OPTIONS } from "./constants";

const DEBOUNCE_DELAY = 1000;

export const RecentOrders: FC = () => {
  const loadOrders = useOrderStore((state) => state.fetchOrders);
  const isLoading = useOrderStore((state) => state.isLoading);

  const { getQueryParam, setQueryParam, setMultipleQueryParams } =
    useQueryParams();

  const searchQuery = getQueryParam(QUERY_PARAM_KEYS.SEARCH) || "";
  const currentPage = Number(getQueryParam(QUERY_PARAM_KEYS.PAGE)) || 1;

  const [debouncedSearchQuery] = useDebounce(searchQuery, DEBOUNCE_DELAY);

  const activeSortOption = ORDER_SORT_OPTIONS.find(
    ({ value }) => value === getQueryParam(QUERY_PARAM_KEYS.SORTING)
  );

  const setSortOption = ({ value }: IOptionSelect) =>
    setMultipleQueryParams({
      [QUERY_PARAM_KEYS.SORTING]: value,
      [QUERY_PARAM_KEYS.PAGE]: "1",
    });

  const onChangeSearch = (value: React.ChangeEvent<HTMLInputElement>) => {
    setMultipleQueryParams({
      [QUERY_PARAM_KEYS.SEARCH]: value.target.value,
      [QUERY_PARAM_KEYS.PAGE]: "1",
    });
  };

  useEffect(() => {
    loadOrders({
      search: debouncedSearchQuery,
      current_page: currentPage,
    });
  }, [currentPage, debouncedSearchQuery, loadOrders]);

  const ordersResponse = useOrderStore((state) => state.recent_orders);
  const ordersResults = ordersResponse?.result || [];

  const pageCount = Math.ceil(ordersResponse?.count / ORDERS_PER_PAGE);
  const isPaginated = pageCount > 1;

  const setPage = (page: number) => {
    if (page !== currentPage) {
      setQueryParam(QUERY_PARAM_KEYS.PAGE, page.toString());
    }
  };

  return (
    <Window>
      <div className="flex items-center justify-between">
        <h3>Recent Orders</h3>

        <div className="flex items-center gap-4">
          <Search
            className="text-xs"
            value={searchQuery}
            onChange={onChangeSearch}
          />

          <SelectDropdownList
            headLabel="Sort by:"
            options={ORDER_SORT_OPTIONS}
            activeOption={activeSortOption || ORDER_SORT_OPTIONS[0]}
            setOption={setSortOption}
          />
        </div>
      </div>

      <Table ariaLabel="Recent orders table">
        <TableHeader columns={ORDER_COLUMNS} />
        <TableBody
          items={ordersResults}
          columns={ORDER_COLUMNS}
          isLoading={isLoading}
        />
      </Table>

      <div className="mt-8 flex items-center justify-between">
        <DataRangeIndicator
          startEntry={(currentPage - 1) * ORDERS_PER_PAGE + 1}
          endEntry={Math.min(
            currentPage * ORDERS_PER_PAGE,
            ordersResults.length
          )}
          totalEntries={ordersResults.length}
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
