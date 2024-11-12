import React, { FC, useMemo, useState } from "react";
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
import { Row } from "../Table/types";
import {
  ORDER_COLUMNS,
  ORDER_DATA,
  ORDER_SORT_OPTIONS,
  ORDERS_PER_PAGE,
} from "./constants";

export const RecentOrders: FC = () => {
  const [sortBy, setSortBy] = useState(ORDER_SORT_OPTIONS[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    return ORDER_DATA.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  const sortedData = useMemo(() => {
    const sortFunctions: Record<string, (a: Row, b: Row) => number> = {
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
        a.approvalStatus.localeCompare(b.approvalStatus),
      approvalStatus_desc: (a, b) =>
        b.approvalStatus.localeCompare(a.approvalStatus),

      shipStatus_asc: (a, b) => a.shipStatus.localeCompare(b.shipStatus),
      shipStatus_desc: (a, b) => b.shipStatus.localeCompare(a.shipStatus),
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
