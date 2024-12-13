import React, { FC, useEffect } from "react";
import { getFilterList } from "src/page-components/products/products-history/constants";
import { FilterButton } from "src/components/FilterButton";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import { RecentOrders } from "src/components/RecentOrders";
import { SelectDate } from "src/components/SelectDate";
import {
  getCurrentMonthOption,
  getCurrentYearOption,
  MONTH_OPTIONS_SELECT,
  YEARS_OPTIONS_SELECT,
} from "src/components/SelectDate/constants";
import { useQueryParams } from "src/hooks/useQueryParams";
import useLocationStore from "src/stores/location-store";
import useProductStore from "src/stores/product-store";
import { QUERY_PARAM_KEYS } from "src/constants/queryParams";
import { IOptionSelect } from "src/@types/form";

const ProductsHistory: FC = () => {
  const loadLocation = useLocationStore((state) => state.fetchLocation);
  const locations = useLocationStore((state) => state.locations);
  const isLoadingLocation = useLocationStore((state) => state.isLoadingFetch);

  const loadProducts = useProductStore((state) => state.fetchProducts);
  const products = useProductStore((state) => state.products);
  const isLoadingProducts = useProductStore((state) => state.isLoadingProducts);

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
    loadLocation();
    loadProducts();
  }, [loadLocation, loadProducts]);

  return (
    <PageWrapper mainClassName="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <FilterButton
          isLoading={isLoadingLocation || isLoadingProducts}
          list={getFilterList(locations, products)}
        />

        <SelectDate
          selectMonth={selectMonthOption || getCurrentMonthOption()}
          setSelectMonth={setSelectMonthOption}
          selectYear={selectYearOption || getCurrentYearOption()}
          setSelectYear={setSelectYearOption}
          isTitleHidden
        />
      </div>

      <RecentOrders />
    </PageWrapper>
  );
};

export default ProductsHistory;
