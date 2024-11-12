import React, { FC } from "react";
import { TableRow } from "./TableRow";
import { Column, Row } from "./types";

interface Props {
  items: Row[];
  columns: Column[];
}

export const TableBody: FC<Props> = ({ items, columns }) => (
  <tbody>
    {items.map((item) => (
      <TableRow key={item.key} rowData={item} columns={columns} />
    ))}
  </tbody>
);
