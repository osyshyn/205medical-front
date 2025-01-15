import React, { FC, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Pagination } from "src/components/Pagination";
import { Search } from "src/components/Search";
import { Window } from "src/components/Window";
import { useQueryParams } from "src/hooks/useQueryParams";
import useInvoiceStore from "src/stores/invoice-store";
import { ORDERS_PER_PAGE } from "src/stores/order-store";
import useUserStore from "src/stores/user-store";
import { getArrayFromStringParams } from "src/utils/getArrayFromStringParams";
import { QUERY_PARAM_KEYS } from "src/constants/queryParams";
import { Row } from "src/@types/table";
import { Button } from "../Button";
import { ButtonVariants } from "../Button/types";
import { Checkbox } from "../CheckBox";
import {
  getCurrentMonthOption,
  getCurrentYearOption,
} from "../SelectDate/constants";
import { DataRangeIndicator } from "../Table";
import { getKeyValue } from "../Table/constants";
import { getTableItems, ORDER_COLUMNS } from "./constants";

const DEBOUNCE_DELAY = 1000;
const PAGE_OPEN = "PAGE_OPEN";
const SEARCH_OPEN = "SEARCH_OPEN";

export const OpenInvoices: FC = () => {
  const role = useUserStore((state) => state.user.role);
  const loadOpenInvoices = useInvoiceStore((state) => state.fetchOpenInvoices);
  const paidInvoices = useInvoiceStore((state) => state.paidInvoices);
  const isLoading = useInvoiceStore((state) => state.isLoadingOpen);

  const { getQueryParam, setQueryParam, setMultipleQueryParams } =
    useQueryParams();

  const year =
    getQueryParam(QUERY_PARAM_KEYS.YEAR) ||
    getCurrentYearOption().value.toString();
  const month =
    getQueryParam(QUERY_PARAM_KEYS.MONTH) ||
    getCurrentMonthOption().value.toString();
  const searchQuery = getQueryParam(SEARCH_OPEN) || "";
  const currentPage = Number(getQueryParam(PAGE_OPEN)) || 1;
  const [debouncedSearchQuery] = useDebounce(searchQuery, DEBOUNCE_DELAY);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChangeSearch = (value: React.ChangeEvent<HTMLInputElement>) => {
    setMultipleQueryParams({
      [SEARCH_OPEN]: value.target.value,
      [PAGE_OPEN]: "1",
    });
  };

  const location_ids = getQueryParam(QUERY_PARAM_KEYS.LOCATIONS) || "";
  const product_ids = getQueryParam(QUERY_PARAM_KEYS.PRODUCTS) || "";

  const refreshData = () => {
    loadOpenInvoices({
      search: debouncedSearchQuery,
      current_page: currentPage,
      year: year,
      month: month,
      location_ids: getArrayFromStringParams(location_ids),
      product_ids: getArrayFromStringParams(product_ids),
    });
  };

  useEffect(() => {
    if (debouncedSearchQuery || 2) {
      refreshData();
    }
  }, [
    currentPage,
    debouncedSearchQuery,
    month,
    year,
    location_ids,
    product_ids,
    loadOpenInvoices,
  ]);

  const invoiceResponse = useInvoiceStore((state) => state.invoiceOpen);
  const invoiceResults = invoiceResponse?.result || [];
  const filteredInvoices = invoiceResults || [];
  const invoiceLength = filteredInvoices.length;

  const pageCount = Math.ceil(invoiceLength / ORDERS_PER_PAGE);
  const isPaginated = pageCount > 1;

  const setPage = (page: number) => {
    if (page !== currentPage) {
      setQueryParam(PAGE_OPEN, page.toString());
    }
  };

  const toggleCheckbox = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleButtonClick = async () => {
    if (selectedIds.length === 0) return;

    setIsSubmitting(true);
    try {
      await paidInvoices({ invoice_ids: selectedIds });
      setSelectedIds([]); // Clear selection after successful payment
      refreshData(); // Refresh open invoices list
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectAll = () => {
    if (selectedIds.length === items.length) {
      setSelectedIds([]);
    } else {
      const allIds = items.map((item) => item.id);
      setSelectedIds(allIds);
    }
  };

  const items = getTableItems(filteredInvoices) as unknown as Row[];

  return (
    <Window>
      <div className="flex items-center justify-between">
        <h3>Invoices</h3>
        <Search
          className="text-xs"
          value={searchQuery}
          onChange={onChangeSearch}
        />
      </div>

      <div className="mt-10">
        <table aria-label="Open Invoices table" className="min-w-full">
          <thead className="border-b">
            <tr>
              {role === 3 && <th className="pb-4"></th>}
              {ORDER_COLUMNS.map((column) => (
                <th
                  key={column.key}
                  className="border-b-1 border-white-lightgray pb-4 text-sm font-medium text-gray-regular"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={ORDER_COLUMNS.length} className="text-center">
                  Loading...
                </td>
              </tr>
            ) : items.length > 0 ? (
              items.map((item) => (
                <tr key={item.id} className="border-b text-center">
                  {role === 3 && (
                    <td className="py-6">
                      <Checkbox
                        label=""
                        onChange={() => toggleCheckbox(item.id)}
                        checked={selectedIds.includes(item.id)}
                      />
                    </td>
                  )}
                  {ORDER_COLUMNS.map((column) => (
                    <td
                      key={column.key}
                      className="!border-b-1 border-white-lightgray py-6 text-sm font-medium"
                    >
                      {getKeyValue(item, column.key)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={ORDER_COLUMNS.length}
                  className="pt-8 text-center text-sm font-medium text-gray-regular"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {role === 3 && (
        <div className="mt-4 flex items-center justify-between gap-4">
          <button
            onClick={handleSelectAll}
            className="text-14 text-gray-500 underline decoration-solid hover:text-gray-700 hover:underline"
          >
            {selectedIds.length === items.length
              ? "Unselect All"
              : "Select All"}
          </button>
          <Button
            onClick={handleButtonClick}
            className="h-10 w-52 rounded-20"
            variant={ButtonVariants.PRIMARY}
            isDisabled={selectedIds.length === 0 || isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Transfer To Paid"}
          </Button>
        </div>
      )}

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
