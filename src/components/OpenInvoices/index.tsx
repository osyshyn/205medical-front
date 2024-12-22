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
import { ORDERS_PER_PAGE } from "src/stores/order-store";
import { getArrayFromStringParams } from "src/utils/getArrayFromStringParams";
import { QUERY_PARAM_KEYS } from "src/constants/queryParams";
import { Row } from "src/@types/table";
import {
  getCurrentMonthOption,
  getCurrentYearOption,
} from "../SelectDate/constants";
import { getTableItems, ORDER_COLUMNS } from "./constants";
import useInvoiceStore from "src/stores/invoice-store";

const DEBOUNCE_DELAY = 1000;

const generateInvoiceTable = (status: number, title: string): FC => {
  const tableSpecificKeys = {
    SEARCH: `${QUERY_PARAM_KEYS.SEARCH}_${status}`,
    PAGE: `${QUERY_PARAM_KEYS.PAGE}_${status}`,
  };

  const InvoiceTable: FC = () => {
    const loadOrders = useInvoiceStore((state) => state.fetchinvoice);
    const isLoading = useInvoiceStore((state) => state.isLoading);
    const { getQueryParam, setQueryParam, setMultipleQueryParams } = useQueryParams();

    const year = getQueryParam(QUERY_PARAM_KEYS.YEAR) || getCurrentYearOption().value.toString();
    const month = getQueryParam(QUERY_PARAM_KEYS.MONTH) || getCurrentMonthOption().value.toString();

    const searchQuery = getQueryParam(tableSpecificKeys.SEARCH) || "";
    const currentPage = Number(getQueryParam(tableSpecificKeys.PAGE)) || 1;

    const [debouncedSearchQuery] = useDebounce(searchQuery, DEBOUNCE_DELAY);

    const onChangeSearch = (value: React.ChangeEvent<HTMLInputElement>) => {
      setMultipleQueryParams({
        [tableSpecificKeys.SEARCH]: value.target.value,
        [tableSpecificKeys.PAGE]: "1",
      });
    };

    const location_ids = getQueryParam(QUERY_PARAM_KEYS.LOCATIONS) || "";
    const product_ids = getQueryParam(QUERY_PARAM_KEYS.PRODUCTS) || "";

    useEffect(() => {
      if (debouncedSearchQuery || status) {
        loadOrders({
          search: debouncedSearchQuery,
          current_page: currentPage,
          year: year,
          month: month,
          location_ids: getArrayFromStringParams(location_ids),
          product_ids: getArrayFromStringParams(product_ids),
        });
      }
    }, [
      currentPage,
      debouncedSearchQuery,
      month,
      year,
      location_ids,
      product_ids,
      loadOrders,
    ]);

    const invoiceResponse = useInvoiceStore((state) => state.invoice);
    const invoiceResults = invoiceResponse?.result || [];
    const filteredInvoices = invoiceResults.filter(
      (invoice) => invoice.payment_status === status
    );
    const invoiceLength = filteredInvoices.length;

    const pageCount = Math.ceil(invoiceLength / ORDERS_PER_PAGE);
    const isPaginated = pageCount > 1;

    const setPage = (page: number) => {
      if (page !== currentPage) {
        setQueryParam(tableSpecificKeys.PAGE, page.toString());
      }
    };

    const items = getTableItems(filteredInvoices) as unknown as Row[];

    return (
      <Window>
        <div className="flex items-center justify-between">
          <h3>{title}</h3>

          <Search
            className="text-xs"
            value={searchQuery}
            onChange={onChangeSearch}
          />
        </div>

        <Table ariaLabel={`${title} table`}>
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
            endEntry={Math.min(currentPage * ORDERS_PER_PAGE, invoiceLength)}
            totalEntries={invoiceLength}
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

  return InvoiceTable;
};

export const OpenInvoices = generateInvoiceTable(1, "Open Invoices");
export const PaidInvoices = generateInvoiceTable(2, "Paid Invoices");