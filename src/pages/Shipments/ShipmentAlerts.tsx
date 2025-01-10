import React, { FC, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import {
  getShipmentItems,
  getShipmentTableItems,
  getTableItems,
  ORDER_TABLE_COLUMNS,
  SHIPMENT_TABLE_COLUMNS,
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
import useAlertsStore, { ALERTS_PER_PAGE } from "src/stores/alert-store";
import { QUERY_PARAM_KEYS } from "src/constants/queryParams";
import { ReactComponent as FilterIcon } from "src/assets/icons/filter.svg";
import { IAlertType } from "src/@types/alert";
import { Row } from "src/@types/table";

const ShipmentAlerts: FC = () => {
  const loadAlerts = useAlertsStore((state) => state.fetchAlerts);

  const { getQueryParam, setMultipleQueryParams } = useQueryParams();

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
      type: IAlertType.SHIPMENT,
    });
  }, [currentPage, debouncedSearchQuery, loadAlerts]);

  const alerts = useAlertsStore((state) => state.alerts);
  const alertsResult = alerts?.result || [];
  const alertsCount = alerts?.count || 0;

  const pageCount = Math.ceil(alertsCount / ALERTS_PER_PAGE);
  const isPaginated = pageCount > 1;

  const items = getShipmentTableItems(alertsResult) as unknown as Row[];

  console.log("ALERTS: ", alerts);

  return (
    <PageWrapper mainClassName="flex flex-col gap-10">
      <div>
        <Button className="gap-2.5 px-4 py-2.5" variant={ButtonVariants.WHITE}>
          <FilterIcon />
          <span>Filter</span>
        </Button>
        <Window className="mt-6">
          <div className="flex items-start justify-between">
            <Title title="Shipment Alerts" subtitle="" />
            <Search
              className="text-xs"
              value={searchQuery}
              onChange={onChangeSearch}
            />
          </div>
          <Table ariaLabel="All shipments table">
            <TableHeader
              className="text-left"
              columns={SHIPMENT_TABLE_COLUMNS}
            />
            <TableBody
              rowClassname="!text-left"
              items={items}
              columns={SHIPMENT_TABLE_COLUMNS}
            />
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

export default ShipmentAlerts;
