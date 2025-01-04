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
import useInvoiceStore from "src/stores/invoice-store";
import { ORDERS_PER_PAGE } from "src/stores/order-store";
import { getArrayFromStringParams } from "src/utils/getArrayFromStringParams";
import { QUERY_PARAM_KEYS } from "src/constants/queryParams";
import { Row } from "src/@types/table";
import {
  getCurrentMonthOption,
  getCurrentYearOption,
} from "../SelectDate/constants";
import { getTableItems, ORDER_COLUMNS } from "./constants";

const DEBOUNCE_DELAY = 1000;

const PAGE_PAID = "PAGE_PAID";
const SEARCH_PAID = "SEARCH_PAID";

export const PaidInvoices: FC = () => {
  const loadPaidInvoices = useInvoiceStore((state) => state.fetchPaidInvoices);
  const isLoading = useInvoiceStore((state) => state.isLoadingPaid);
  const { getQueryParam, setQueryParam, setMultipleQueryParams } =
    useQueryParams();

  const year =
    getQueryParam(QUERY_PARAM_KEYS.YEAR) ||
    getCurrentYearOption().value.toString();
  const month =
    getQueryParam(QUERY_PARAM_KEYS.MONTH) ||
    getCurrentMonthOption().value.toString();

  const searchQuery = getQueryParam(SEARCH_PAID) || "";
  const currentPage = Number(getQueryParam(PAGE_PAID)) || 1;

  const [debouncedSearchQuery] = useDebounce(searchQuery, DEBOUNCE_DELAY);

  const onChangeSearch = (value: React.ChangeEvent<HTMLInputElement>) => {
    setMultipleQueryParams({
      [SEARCH_PAID]: value.target.value,
      [PAGE_PAID]: "1",
    });
  };

  const location_ids = getQueryParam(QUERY_PARAM_KEYS.LOCATIONS) || "";
  const product_ids = getQueryParam(QUERY_PARAM_KEYS.PRODUCTS) || "";

  useEffect(() => {
    loadPaidInvoices({
      search: debouncedSearchQuery,
      current_page: currentPage,
      year: year,
      month: month,
      location_ids: getArrayFromStringParams(location_ids),
      product_ids: getArrayFromStringParams(product_ids),
    });
  }, [
    currentPage,
    debouncedSearchQuery,
    month,
    year,
    location_ids,
    product_ids,
    loadPaidInvoices,
  ]);

  const invoiceResponse = useInvoiceStore((state) => state.invoicePaid);
  const invoiceResults = invoiceResponse?.result || [];
  const filteredInvoices = invoiceResults || [];
  const invoiceLength = filteredInvoices.length;

  const pageCount = Math.ceil(invoiceLength / ORDERS_PER_PAGE);
  const isPaginated = pageCount > 1;

  const setPage = (page: number) => {
    if (page !== currentPage) {
      setQueryParam(PAGE_PAID, page.toString());
    }
  };

  const items = getTableItems(filteredInvoices) as unknown as Row[];

  return (
    <Window>
      <div className="flex items-center justify-between">
        <h3>Paid Invoices</h3>

        <Search
          className="text-xs"
          value={searchQuery}
          onChange={onChangeSearch}
        />
      </div>

      <Table ariaLabel="Paid Invoices table">
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
