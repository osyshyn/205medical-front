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
import { IOptionSelect } from "src/@types/form";
import { columns, ITEMS_PER_VIEW, rows, SORT_OPTIONS } from "./constants";

export const RecentOrders: FC = () => {
  const [sortBy, setSortBy] = useState<IOptionSelect>(SORT_OPTIONS[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const pageCount = Math.ceil(rows.length / ITEMS_PER_VIEW);
  const isPaginated = pageCount > 1;

  const setPage = (page: number) => setCurrentPage(page);

  const filteredRows = useMemo(() => {
    return rows.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  const sortedRows = useMemo(() => {
    return [...filteredRows].sort((a, b) => {
      if (sortBy.value === "amount") {
        return parseFloat(a.amount.slice(1)) - parseFloat(b.amount.slice(1));
      }

      if (sortBy.value === "poDate") {
        const dateA = new Date(a.poDate);
        const dateB = new Date(b.poDate);
        return dateA.getTime() - dateB.getTime();
      }
      return 0;
    });
  }, [filteredRows, sortBy]);

  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_VIEW;
    const end = start + ITEMS_PER_VIEW;
    return sortedRows.slice(start, end);
  }, [sortedRows, currentPage]);

  return (
    <Window>
      <div className="flex items-center justify-between">
        <h3>Recent Orders</h3>

        <div className="flex items-center gap-4">
          <Search className="text-xs" />

          <SortingDropdownList
            headLabel="Sort by:"
            options={SORT_OPTIONS}
            activeOption={sortBy}
            setOption={setSortBy}
          />
        </div>
      </div>

      <Table ariaLabel="Recent orders table">
        <TableHeader columns={columns} />
        <TableBody items={paginatedRows} columns={columns} />
      </Table>

      <div className="mt-8 flex items-center justify-between">
        <DataRangeIndicator
          startEntry={(currentPage - 1) * ITEMS_PER_VIEW + 1}
          endEntry={Math.min(currentPage * ITEMS_PER_VIEW, sortedRows.length)}
          totalEntries={sortedRows.length}
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
