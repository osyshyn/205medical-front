import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  ariaLabel?: string;
}

export const Table: FC<Props> = ({ children, ariaLabel }) => (
  <table aria-label={ariaLabel} className="mt-10 min-w-full">
    {children}
  </table>
);
