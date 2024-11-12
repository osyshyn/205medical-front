import { Column } from "./types";

interface Props {
  columns: Column[];
}

export const TableHeader: React.FC<Props> = ({ columns }) => (
  <thead>
    <tr>
      {columns.map((column) => (
        <th
          key={column.key}
          className="border-b pb-4 text-sm font-medium text-gray-regular"
        >
          {column.label}
        </th>
      ))}
    </tr>
  </thead>
);
