import React, { FC } from "react";
import { IProductDetails } from "src/@types/products";
import { getProperties } from "../constants";
import { Property } from "./Property";

export const PropertiesCard: FC<IProductDetails> = ({ ...product }) => {
  const properties = getProperties(product);

  return (
    <div className="mt-2">
      {properties.map((card) => (
        <Property key={`${card.label}-${card.value}`} {...card} />
      ))}
    </div>
  );
};
