import React, { FC, useEffect, useState } from "react";
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
import useOrderStore from "src/stores/order-store";
import {
  ORDER_COLUMNS,
  ORDER_SORT_OPTIONS,
  ORDERS_PER_PAGE,
} from "./constants";

const DEBOUNCE_DELAY = 1000;

export const RecentOrders: FC = () => {
  const loadOrders = useOrderStore((state) => state.fetchOrders);
  const isLoading = useOrderStore((state) => state.isLoading);

  const [sortBy, setSortBy] = useState(ORDER_SORT_OPTIONS[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [debouncedQueryParams] = useDebounce(searchQuery, DEBOUNCE_DELAY);

  useEffect(() => {
    loadOrders({
      search: debouncedQueryParams,
      items_per_page: ORDERS_PER_PAGE,
      current_page: currentPage,
    });
  }, [currentPage, debouncedQueryParams, loadOrders]);

  const ordersResponse = useOrderStore((state) => state.recent_orders);
  const ordersResults = ordersResponse?.result || [];

  const pageCount = Math.ceil(ordersResponse?.count / ORDERS_PER_PAGE);
  const isPaginated = pageCount > 1;

  const setPage = (page: number) => setCurrentPage(page);

  return (
    <Window>
      <div className="flex items-center justify-between">
        <h3>Recent Orders</h3>

        <div className="flex items-center gap-4">
          <Search
            className="text-xs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <SelectDropdownList
            headLabel="Sort by:"
            options={ORDER_SORT_OPTIONS}
            activeOption={sortBy}
            setOption={setSortBy}
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
