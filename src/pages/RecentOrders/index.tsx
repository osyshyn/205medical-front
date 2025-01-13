import { FC, useEffect } from "react";
import { FilterByLocationByUser } from "src/page-components/dashboard/FilterByLocationByUser";
import { RECENT_ORDERS_COLUMNS } from "src/page-components/orders/recent-orders/constant";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import { RecentOrders as RecentOrdersTable } from "src/components/RecentOrders";
import { SelectDate } from "src/components/SelectDate";
import {
  getCurrentMonthOption,
  getCurrentYearOption,
  MONTH_OPTIONS_SELECT,
  YEARS_OPTIONS_SELECT,
} from "src/components/SelectDate/constants";
import { Table, TableBody, TableHeader } from "src/components/Table";
import { Title } from "src/components/Title";
import { Window } from "src/components/Window";
import { useQueryParams } from "src/hooks/useQueryParams";
import useInvoiceStore from "src/stores/invoice-store";
import useOrderStore from "src/stores/order-store";
import { QUERY_PARAM_KEYS } from "src/constants/queryParams";
import { IOptionSelect } from "src/@types/form";
import { Row } from "src/@types/table";

export const RecentOrders: FC = () => {
  const { setMultipleQueryParams, getQueryParam } = useQueryParams();

  const selectMonthOption = MONTH_OPTIONS_SELECT.find(
    ({ value }) => value === +getQueryParam(QUERY_PARAM_KEYS.MONTH)
  );

  const selectYearOption = YEARS_OPTIONS_SELECT.find(
    ({ value }) => value === +getQueryParam(QUERY_PARAM_KEYS.YEAR)
  );

  const setSelectMonthOption = ({ value }: IOptionSelect) =>
    setMultipleQueryParams({
      [QUERY_PARAM_KEYS.MONTH]: value,
      [QUERY_PARAM_KEYS.PAGE]: "1",
    });

  const setSelectYearOption = ({ value }: IOptionSelect) => {
    setMultipleQueryParams({
      [QUERY_PARAM_KEYS.YEAR]: value,
      [QUERY_PARAM_KEYS.PAGE]: "1",
    });
  };
  return (
    <PageWrapper>
      <div className="flex justify-between">
        <FilterByLocationByUser includeProductFilters={true} />

        <SelectDate
          selectMonth={selectMonthOption || getCurrentMonthOption()}
          setSelectMonth={setSelectMonthOption}
          selectYear={selectYearOption || getCurrentYearOption()}
          setSelectYear={setSelectYearOption}
          isTitleHidden
        />
      </div>

      <div className="mt-10">
        <RecentOrdersTable />
      </div>
    </PageWrapper>
  );
};
