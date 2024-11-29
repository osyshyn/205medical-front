import React, { FC } from "react";
import { IProperty } from "./types";

export const Property: FC<IProperty> = ({ label, value }) => (
  <p className="flex justify-between border-b pb-3.5 pt-3 text-sm font-medium">
    <span className="text-black-soft">{label}</span>
    <span className="uppercase">{value}</span>
  </p>
);
