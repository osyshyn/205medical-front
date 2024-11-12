import { ReactNode } from "react";

export const TableCell: React.FC<{ children: ReactNode }> = ({ children }) => (
  <td className="border-b py-6 text-sm font-medium">{children}</td>
);
