import React, { FC, useState } from "react";
import { SortingDropdownList } from "src/components/SortDropdownList";
import { IOptionSelect } from "src/@types/form";
import { DATA_METRICS_OPTIONS } from "./constants";

export const DateMetrics: FC = () => {
  const [selectMonth, setSelectMonth] = useState<IOptionSelect>(
    DATA_METRICS_OPTIONS[0]
  );

  return (
    <div className="flex items-center justify-between">
      <h3>{selectMonth.label} 2024</h3>

      <SortingDropdownList
        options={DATA_METRICS_OPTIONS}
        activeOption={selectMonth}
        setOption={setSelectMonth}
        headLabel="Current Month:"
      />
    </div>
  );
};
