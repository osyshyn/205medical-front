import React, { FC, useState } from "react";
import { Search } from "src/components/Search";
import { SortingDropdownList } from "src/components/SortDropdownList";
import { Window } from "src/components/Window";
import { IOptionSelect } from "src/@types/form";
import { Table } from "../Table";
import { TableBody } from "../Table/TableBody";
import { TableHeader } from "../Table/TableHeader";
import { columns, rows, SORT_OPTIONS } from "./constants";

export const RecentOrders: FC = () => {
  const [sortBy, setSortBy] = useState<IOptionSelect>(SORT_OPTIONS[0]);

  return (
    <Window className="">
      <div className="flex items-center justify-between">
        <h3>Recent Orders</h3>

        <div className="flex items-center gap-4">
          <Search className="text-xs" />
          <SortingDropdownList
            headLabel="Sort by :"
            options={SORT_OPTIONS}
            activeOption={sortBy}
            setOption={setSortBy}
          />
        </div>
      </div>

      <Table ariaLabel="Recent orders table">
        <TableHeader columns={columns} />
        <TableBody items={rows} columns={columns} />
      </Table>
    </Window>
  );
};
