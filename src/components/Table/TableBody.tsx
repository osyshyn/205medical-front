import React, { FC } from "react";
import { Sizes } from "src/@types/sizes";
import { Column, Row } from "src/@types/table";
import { Loader } from "../Loader";
import { TableRow } from "./TableRow";

interface Props {
  rowClassname?: string;
  items: Row[];
  columns: Column[];
  emptyLabel?: string;
  isLoading?: boolean;
}

export const TableBody: FC<Props> = ({
  rowClassname,
  items,
  columns,
  emptyLabel = "No data available",
  isLoading,
}) => (
  <tbody>
    {isLoading ? (
      <tr>
        <td colSpan={columns.length}>
          <Loader className="pt-8" size={Sizes.XXL} />
        </td>
      </tr>
    ) : items.length > 0 ? (
      items.map((item) => (
        <TableRow
          className={rowClassname}
          key={item.id}
          rowData={item}
          columns={columns}
        />
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
