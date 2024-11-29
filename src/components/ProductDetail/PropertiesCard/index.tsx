import React, { FC } from "react";
import { PRODUCT_TEMP } from "src/components/AllProducts/temp/constants";
import { getProperties } from "../constants";
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
