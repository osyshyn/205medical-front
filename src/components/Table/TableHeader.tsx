import { Column } from "src/@types/table";

interface Props {
  className?: string;
  columns: Column[];
}

export const TableHeader: React.FC<Props> = ({ className, columns }) => (
  <thead className={className}>
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
