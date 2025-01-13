import { FC, useEffect } from "react";
import {
  getTableItems,
  PURCHASE_BY_PRODUCTS_LIST_COLUMNS,
} from "src/page-components/reporting-analytics/productsTable/constant";
import {
  getTableItemsNumber,
  NUMBER_OF_ORDERS,
} from "src/page-components/reporting-analytics/purchasesByCategoryOrderList/constant";
import {
  getTaleItemsCategory,
  PURCHASE_BY_CATEGORY_COLUMNS,
} from "src/page-components/reporting-analytics/purchasesByProductsList/constants";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
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
import useCategoryStore from "src/stores/category-store";
import useProductStore from "src/stores/product-store";
import { QUERY_PARAM_KEYS } from "src/constants/queryParams";
import { IOptionSelect } from "src/@types/form";
import { Row } from "src/@types/table";

export const PurchaseAnalytics: FC = () => {
  const loadPurchaseByCategoryList = useCategoryStore(
    (state) => state.fetchPurchasesByCategoryList
  );
  const purchasesByCategoryList = useCategoryStore(
    (state) => state.purchasesByCategoryList
  );
  const loadPurchasesByOrderList = useCategoryStore(
    (state) => state.fetchPurchasesByOrderList
  );
  const purchasesByOrderList = useCategoryStore(
    (state) => state.purchasesByOrder
  );
  const loadPurchasesByProductList = useProductStore(
    (state) => state.fetchPurchasesByProductList
  );
  const purchasesByProductList = useProductStore(
    (state) => state.purchasesByProductList
  );

  const { getQueryParam, setMultipleQueryParams } = useQueryParams();

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

  useEffect(() => {
    loadPurchaseByCategoryList({ month: 12, year: 2024 });
    loadPurchasesByOrderList({ month: 12, year: 2024 });
    loadPurchasesByProductList({
      month: 12,
      year: 2024,
    });
  }, [
    loadPurchaseByCategoryList,
    loadPurchasesByOrderList,
    loadPurchasesByProductList,
  ]);

  const firstTable = getTableItemsNumber(
    purchasesByOrderList
  ) as unknown as Row[];
  const secondTable = getTaleItemsCategory(
    purchasesByCategoryList
  ) as unknown as Row[];
  const items = getTableItems(purchasesByProductList) as unknown as Row[];

  return (
    <PageWrapper>
      <SelectDate
        selectMonth={selectMonthOption || getCurrentMonthOption()}
        setSelectMonth={setSelectMonthOption}
        selectYear={selectYearOption || getCurrentYearOption()}
        setSelectYear={setSelectYearOption}
      />
      <div className="mt-5 flex gap-6">
        <Window className="max-h-150 w-1/2 overflow-auto">
          <Title title="Purchase by ctegory" subtitle="" />
          <Table>
            <TableHeader columns={PURCHASE_BY_CATEGORY_COLUMNS} />
            <TableBody
              items={firstTable}
              columns={PURCHASE_BY_CATEGORY_COLUMNS}
            />
          </Table>
        </Window>
        <Window className="max-h-150 w-1/2 overflow-auto">
          <Title title="Number of orders" subtitle="" />
          <Table>
            <TableHeader columns={NUMBER_OF_ORDERS} />
            <TableBody items={secondTable} columns={NUMBER_OF_ORDERS} />
          </Table>
        </Window>
      </div>
      <div className="mt-10">
        <Window>
          <Title title="Products" subtitle="" />
          <Table>
            <TableHeader columns={PURCHASE_BY_PRODUCTS_LIST_COLUMNS} />
            <TableBody
              items={items}
              columns={PURCHASE_BY_PRODUCTS_LIST_COLUMNS}
            />
          </Table>
        </Window>
      </div>
    </PageWrapper>
  );
};
