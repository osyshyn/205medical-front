import React, { FC } from "react";
import {
  LABEL_STYLE_VARIANTS,
  TEXT_INPUT_STYLE_VARIANTS,
} from "src/components/FormField/constants";
import { BUYER_INFO, LOCATION_INFO } from "./constants";

const CLASSNAME = "grid grid-cols-3 gap-6";

export const LocationInfo: FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <h3>Ship To</h3>

      <div className={CLASSNAME}>
        {LOCATION_INFO.map(({ id, label, value }) => (
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
