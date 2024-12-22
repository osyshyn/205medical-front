import React, { FC } from "react";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import { Outlet, useMatch } from "react-router-dom";
import { FinanceSummaryCard } from "src/components/FinanceSummaryCard";
import { PATHNAMES } from "src/constants/routes";
import { SelectDate } from "src/components/SelectDate";
import {
  getCurrentMonthOption,
  getCurrentYearOption,
} from "src/components/SelectDate/constants";
import { useQueryParams } from "src/hooks/useQueryParams";
import { FilterByLocationByUser } from "src/page-components/dashboard/FilterByLocationByUser";

export const Accounting: FC = () => {
  const isRootRoute = useMatch({ path: PATHNAMES.ACCOUNTING, end: true });
  const { setMultipleQueryParams } = useQueryParams();

  return (
    <PageWrapper mainClassName="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <FilterByLocationByUser />

        <SelectDate
          selectMonth={getCurrentMonthOption()}
          setSelectMonth={(val) =>
            setMultipleQueryParams({ month: val.value.toString() })
          }
          selectYear={getCurrentYearOption()}
          setSelectYear={(val) =>
            setMultipleQueryParams({ year: val.value.toString() })
          }
          isTitleHidden
        />
      </div>

      {isRootRoute && <FinanceSummaryCard />}

      <Outlet />
    </PageWrapper>
  );
};
