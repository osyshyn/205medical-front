import React, { FC } from "react";
import { SelectDropdownList } from "src/components/SelectDropdownList";
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
      <SelectDropdownList
        options={MONTH_OPTIONS_SELECT}
        activeOption={selectMonth}
        setOption={setSelectMonth}
        headLabel="Current Month:"
      />

      <SelectDropdownList
        options={YEARS_OPTIONS_SELECT}
        activeOption={selectYear}
        setOption={setSelectYear}
        headLabel="Current Year:"
      />
    </div>
  </div>
);
