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
import { QUERY_PARAM_KEYS } from "src/constants/queryParams";
import { IOptionSelect } from "src/@types/form";

const ProductsHistory: FC = () => {
  const loadLocation = useLocationStore((state) => state.fetchLocation);
  const locations = useLocationStore((state) => state.locations);
  const isLoadingLocation = useLocationStore((state) => state.isLoadingFetch);

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
  }, [loadLocation]);

  return (
    <PageWrapper mainClassName="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <FilterButton
          isLoading={isLoadingLocation}
          list={getFilterList(locations)}
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
