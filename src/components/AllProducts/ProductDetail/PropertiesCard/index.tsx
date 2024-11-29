import React, { FC } from "react";
import { getProperties } from "../../constants";
import { PRODUCT_TEMP } from "../../temp/constants";
import { Property } from "./Property";

export const PropertiesCard: FC = () => {
  const properties = getProperties(PRODUCT_TEMP);

  return (
    <div className="mt-2">
      {properties.map((card) => (
        <Property key={`${card.label}-${card.value}`} {...card} />
      ))}
    </div>
  );
};
