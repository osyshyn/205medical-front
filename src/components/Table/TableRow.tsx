import React, { FC } from "react";
import cn from "classnames";
import { Column, Row } from "src/@types/table";
import { getKeyValue } from "./constants";
import { TableCell } from "./TableCell";

interface Props {
  className: string;
  rowData: Row;
  columns: Column[];
}

export const TableRow: FC<Props> = ({ className, rowData, columns }) => (
  <tr className={cn("text-center", className, "border-b")}>
    {columns.map((column) => (
      <TableCell key={column.key}>{getKeyValue(rowData, column.key)}</TableCell>
    ))}
  </tr>
);
