import { Column } from "src/@types/table";

interface Props {
  columns: Column[];
}

export const TableHeader: React.FC<Props> = ({ columns }) => (
  <thead className="sticky top-0 mt-10 bg-white-base">
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
