import React, { FC, useEffect, useState } from "react";
import {
  LABEL_STYLE_VARIANTS,
  TEXT_INPUT_STYLE_VARIANTS,
} from "src/components/FormField/constants";
import { SelectDropdownListField } from "src/components/FormField/SelectDropdownListField";
import useLocationStore from "src/stores/location-store";
import { IOptionSelect } from "src/@types/form";
import { ILocation } from "src/@types/location";
import { getBuyerInfo, getLocationInfo, getLocationList } from "../constants";

const CLASSNAME = "grid grid-cols-3 gap-6";

export const LocationInfo: FC = () => {
  const fetchLocation = useLocationStore((state) => state.fetchLocation);
  const locations = useLocationStore((state) => state.locations);

  const locationOptionList = getLocationList(locations);
  const [activeLocation, setActiveLocation] = useState<ILocation>();

  const onChangeLocationSelect = (option: IOptionSelect) => {
    setActiveLocation(
      locations.find((location) => location.id === option.value)
    );
  };

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  return (
    <div className="flex flex-col gap-6">
      <h3>Ship To</h3>

      <div className={CLASSNAME}>
        <div className="flex flex-col gap-1.5">
          <p className={LABEL_STYLE_VARIANTS.primary}>Location Name</p>

          <SelectDropdownListField
            headLabel="Select location"
            headLabelclassName="w-full justify-between !text-base"
            options={locationOptionList}
            formFieldProps={{ name: "location_id" }}
            onChange={onChangeLocationSelect}
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
        {getBuyerInfo(activeLocation).map(({ id, label, value }) => (
          <div key={id} className="flex flex-col gap-1.5">
            <p className={LABEL_STYLE_VARIANTS.primary}>{label}</p>
            <div className={TEXT_INPUT_STYLE_VARIANTS.primary}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
