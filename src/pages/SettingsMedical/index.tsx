import React, { FC } from "react";

import { PageWrapper } from "src/components/Layouts/PageWrapper";
import { SelectDate } from "src/components/SelectDate";
import { FilterByLocationByUser } from "src/page-components/dashboard/FilterByLocationByUser";
import {
    getCurrentMonthOption,
    getCurrentYearOption,
  } from "src/components/SelectDate/constants";
  import { useQueryParams } from "src/hooks/useQueryParams";
  import {
    MONTH_OPTIONS_SELECT,
    YEARS_OPTIONS_SELECT,
  } from "src/components/SelectDate/constants";
import { QUERY_PARAM_KEYS } from "src/constants/queryParams";
import { IOptionSelect } from "src/@types/form";
import { Title } from "src/components/Title";
import { Window } from "src/components/Window";
import UserManagement from "src/components/SettingUserManagement";
import AddCategory from "src/components/SettingAddCategory";
import CategoryManagement from "src/components/SettingCategoryManagement";

export const SettingsMedical: FC = () => {
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
        <PageWrapper mainClassName="flex flex-col gap-10">
            <div className="flex items-center justify-between">
                <Title
                          title="Settings"
                          subtitle="Location address"
                        />
                    {/* <FilterByLocationByUser />
            
                    <SelectDate
                      selectMonth={selectMonthOption || getCurrentMonthOption()}
                      setSelectMonth={setSelectMonthOption}
                      selectYear={selectYearOption || getCurrentYearOption()}
                      setSelectYear={setSelectYearOption}
                      isTitleHidden
                    /> */}
                  </div>

                  <Window>
                    <UserManagement/>
                    <AddCategory/>
                    <CategoryManagement/>
                  </Window>

        </PageWrapper>
    );
};