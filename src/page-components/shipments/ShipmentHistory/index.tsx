import React, { FC } from "react";
import { Outlet } from "react-router";
import { Table, TableHeader } from "src/components/Table";
import { Window } from "src/components/Window";
import { SHIPMENT_HISTORY_COLUMNS } from "./constants";

export const ShipmentHistory: FC = () => {
  return (
    <Window>
      <h3>Shipment History</h3>

      <div className="scrollbar max-h-150 overflow-y-scroll">
        <Table ariaLabel="All product table">
          <TableHeader columns={SHIPMENT_HISTORY_COLUMNS} />
          {/* <TableBody
            items={items}
            columns={SHIPMENT_HISTORY_COLUMNS}
            isLoading={isLoading}
          /> */}
        </Table>
      </div>

      <Outlet />
    </Window>
  );
};
