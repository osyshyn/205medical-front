import React, { FC, useEffect, useState } from "react";
import {
  LABEL_STYLE_VARIANTS,
  TEXT_INPUT_STYLE_VARIANTS,
} from "src/components/FormField/constants";
import { SelectDropdownList } from "src/components/SelectDropdownList";
import useLocationStore from "src/stores/location-store";
import { IOptionSelect } from "src/@types/form";
import { BUYER_INFO, getLocationInfo, getLocationList } from "./constants";

const CLASSNAME = "grid grid-cols-3 gap-6";

export const LocationInfo: FC = () => {
  const fetchLocation = useLocationStore((state) => state.fetchLocation);
  const locations = useLocationStore((state) => state.locations);

  const locationOptionList = getLocationList(locations);
  const [activeLocationOption, setActiveLocationOption] =
    useState<IOptionSelect>(locationOptionList[0]);

  const activeLocation = locations.find(
    (location) => location.id === activeLocationOption.value
  );

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  console.log(locations);
  return (
    <div className="flex flex-col gap-6">
      <h3>Ship To</h3>

      <div className={CLASSNAME}>
        <div className="flex flex-col gap-1.5">
          <p className={LABEL_STYLE_VARIANTS.primary}>Location Name</p>
          <SelectDropdownList
            headLabel="Select location"
            headLabelclassName="w-full justify-between text-base"
            options={locationOptionList}
            activeOption={activeLocationOption}
            setOption={setActiveLocationOption}
          />
        </div>

        {getLocationInfo(activeLocation).map(({ id, label, value }) => (
          <div key={id} className="flex flex-col gap-1.5">
            <p className={LABEL_STYLE_VARIANTS.primary}>{label}</p>
            <div className={TEXT_INPUT_STYLE_VARIANTS.primary}>{value}</div>
          </div>
        ))}
      </div>

      <hr />

      <div className={CLASSNAME}>
        {BUYER_INFO.map(({ id, label, value }) => (
          <div key={id} className="flex flex-col gap-1.5">
            <p className={LABEL_STYLE_VARIANTS.primary}>{label}</p>
            <div className={TEXT_INPUT_STYLE_VARIANTS.primary}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
