import React, { FC } from "react";
import { SortingDropdownList } from "src/components/SortDropdownList";
import { IOptionSelect, SetOptionSelect } from "src/@types/form";
import { MONTH_OPTIONS_SELECT, YEARS_OPTIONS_SELECT } from "../constants";

interface Props {
  selectMonth: IOptionSelect;
  setSelectMonth: SetOptionSelect;
  selectYear: IOptionSelect;
  setSelectYear: SetOptionSelect;
}

export const DateMetrics: FC<Props> = ({
  selectMonth,
  setSelectMonth,
  selectYear,
  setSelectYear,
}) => (
  <div className="flex items-center justify-between">
    <h3>{selectMonth.label} 2024</h3>

    <div className="flex gap-3">
      <SortingDropdownList
        options={MONTH_OPTIONS_SELECT}
        activeOption={selectMonth}
        setOption={setSelectMonth}
        headLabel="Current Month:"
      />

      <SortingDropdownList
        options={YEARS_OPTIONS_SELECT}
        activeOption={selectYear}
        setOption={setSelectYear}
        headLabel="Current Year:"
      />
    </div>
  </div>
);
