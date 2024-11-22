import React, { FC, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { Pagination } from "src/components/Pagination";
import { Search } from "src/components/Search";
import { SortingDropdownList } from "src/components/SortDropdownList";
import {
  DataRangeIndicator,
  Table,
  TableBody,
  TableHeader,
} from "src/components/Table";
import { Window } from "src/components/Window";
import {
  ORDER_COLUMNS,
  ORDER_SORT_OPTIONS,
  ORDERS_PER_PAGE,
} from "./constants";
import { IOrder } from "src/@types/user";
import useUserStore from "src/stores/user-store";

const DEBOUNCE_DELAY = 1000;

export const RecentOrders: FC = () => {
  const orders = useUserStore((state) => state.recent_orders)

  const [sortBy, setSortBy] = useState(ORDER_SORT_OPTIONS[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [debouncedSearchQuery] = useDebounce(searchQuery, DEBOUNCE_DELAY);

  const filteredData = useMemo(() => {
    setCurrentPage(1);

    return orders.filter((row) =>
      Object.values(row).some((value) =>
        value
          .toString()
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase())
      )
    );
  }, [debouncedSearchQuery, orders]);

  const sortedData = useMemo(() => {
    const sortFunctions: Record<string, (a: IOrder, b: IOrder) => number> = {
      amount_asc: (a, b) =>
        parseFloat(a.amount.slice(1)) - parseFloat(b.amount.slice(1)),
      amount_desc: (a, b) =>
        parseFloat(b.amount.slice(1)) - parseFloat(a.amount.slice(1)),

      customerPO_asc: (a, b) =>
        parseFloat(a.customerPO.slice(1)) - parseFloat(b.customerPO.slice(1)),
      customerPO_desc: (a, b) =>
        parseFloat(b.customerPO.slice(1)) - parseFloat(a.customerPO.slice(1)),

      poDate_asc: (a, b) =>
        new Date(a.poDate).getTime() - new Date(b.poDate).getTime(),
      poDate_desc: (a, b) =>
        new Date(b.poDate).getTime() - new Date(a.poDate).getTime(),

      approvalStatus_asc: (a, b) =>
        a.approvalStatus.value.localeCompare(b.approvalStatus.value),
      approvalStatus_desc: (a, b) =>
        b.approvalStatus.value.localeCompare(a.approvalStatus.value),

      shipStatus_asc: (a, b) =>
        a.shipStatus.value.localeCompare(b.shipStatus.value),
      shipStatus_desc: (a, b) =>
        b.shipStatus.value.localeCompare(a.shipStatus.value),
    };

    const sortFunction = sortFunctions[sortBy.value] || (() => 0);
    return [...filteredData].sort(sortFunction);
  }, [filteredData, sortBy]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ORDERS_PER_PAGE;
    const end = start + ORDERS_PER_PAGE;
    return sortedData.slice(start, end);
  }, [sortedData, currentPage]);

  const pageCount = Math.ceil(sortedData.length / ORDERS_PER_PAGE);
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

          <SortingDropdownList
            headLabel="Sort by:"
            options={ORDER_SORT_OPTIONS}
            activeOption={sortBy}
            setOption={setSortBy}
          />
        </div>
      </div>

      <Table ariaLabel="Recent orders table">
        <TableHeader columns={ORDER_COLUMNS} />
        <TableBody items={paginatedData} columns={ORDER_COLUMNS} />
      </Table>

      <div className="mt-8 flex items-center justify-between">
        <DataRangeIndicator
          startEntry={(currentPage - 1) * ORDERS_PER_PAGE + 1}
          endEntry={Math.min(currentPage * ORDERS_PER_PAGE, sortedData.length)}
          totalEntries={sortedData.length}
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
