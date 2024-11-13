import React, { FC } from "react";
import { TableRow } from "./TableRow";
import { Column, Row } from "./types";

interface Props {
  items: Row[];
  columns: Column[];
  emptyLabel?: string;
}

export const TableBody: FC<Props> = ({
  items,
  columns,
  emptyLabel = "No data available",
}) => (
  <tbody>
    {items.length > 0 ? (
      items.map((item) => (
        <TableRow key={item.key} rowData={item} columns={columns} />
      ))
    ) : (
      <tr>
        <td
          colSpan={columns.length}
          className="pt-8 text-center text-sm font-medium text-gray-regular"
        >
          {emptyLabel}
        </td>
      </tr>
    )}
  </tbody>
);
