import React, { FC } from "react";
import { Column, Row } from "src/@types/table";
import { getKeyValue } from "./constants";
import { TableCell } from "./TableCell";

interface Props {
  rowData: Row;
  columns: Column[];
}

export const TableRow: FC<Props> = ({ rowData, columns }) => (
  <tr className="text-center">
    {columns.map((column) => (
      <TableCell key={column.key}>{getKeyValue(rowData, column.key)}</TableCell>
    ))}
  </tr>
);
