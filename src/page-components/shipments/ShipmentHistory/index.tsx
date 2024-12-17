import React, { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { Pagination } from "src/components/Pagination";
import {
  getCurrentMonthOption,
  getCurrentYearOption,
} from "src/components/SelectDate/constants";
import {
  DataRangeIndicator,
  Table,
  TableBody,
  TableHeader,
} from "src/components/Table";
import { Window } from "src/components/Window";
import { useQueryParams } from "src/hooks/useQueryParams";
import useShipmentStore, { SHIPMENT_PER_PAGE } from "src/stores/shipment-store";
import { getItemPath } from "src/utils/getItemPath";
import { QUERY_PARAM_KEYS } from "src/constants/queryParams";
import { PATHNAMES } from "src/constants/routes";
import { Row } from "src/@types/table";
import { getTableItems, SHIPMENT_HISTORY_COLUMNS } from "./constants";

export const ShipmentHistory: FC = () => {
  const loadShipments = useShipmentStore((state) => state.fetcShipment);
  const isLoading = useShipmentStore((state) => state.isLoading);

  const { getQueryParam, setQueryParam } = useQueryParams();

  const year =
    getQueryParam(QUERY_PARAM_KEYS.YEAR) || getCurrentYearOption().value;
  const month =
    getQueryParam(QUERY_PARAM_KEYS.MONTH) || getCurrentMonthOption().value;

  const currentPage = Number(getQueryParam(QUERY_PARAM_KEYS.PAGE)) || 1;

  useEffect(() => {
    loadShipments({
      current_page: currentPage,
      year: year as string,
      month: month as string,
    });
  }, [currentPage, month, year, loadShipments]);

  const shipmentResponse = useShipmentStore((state) => state.shipment);
  const shipmentResults = shipmentResponse?.result || [];
  const shipmentLength = shipmentResponse?.count || 0;

  const pageCount = Math.ceil(shipmentResponse?.count / SHIPMENT_PER_PAGE);
  const isPaginated = pageCount > 1;

  const setPage = (page: number) => {
    if (page !== currentPage) {
      setQueryParam(QUERY_PARAM_KEYS.PAGE, page.toString());
    }
  };

  const items = getTableItems(shipmentResults) as unknown as Row[];

  return (
    <Window>
      <h3>Shipment History</h3>

      <Table
        className="scrollbar max-h-150 overflow-y-scroll"
        ariaLabel="All product table"
      >
        <TableHeader columns={SHIPMENT_HISTORY_COLUMNS} />
        <TableBody
          items={items}
          columns={SHIPMENT_HISTORY_COLUMNS}
          isLoading={isLoading}
        />
      </Table>

      <div className="mt-8 flex items-center justify-between">
        <DataRangeIndicator
          startEntry={(currentPage - 1) * SHIPMENT_PER_PAGE + 1}
          endEntry={Math.min(currentPage * SHIPMENT_PER_PAGE, shipmentLength)}
          totalEntries={shipmentLength}
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
