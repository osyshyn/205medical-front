import { FC } from "react";
import cn from "classnames";

interface Props {
  className?: string;
  startEntry: number;
  endEntry: number;
  totalEntries: number;
}

export const DataRangeIndicator: FC<Props> = ({
  className,
  startEntry,
  endEntry,
  totalEntries,
}) => (
  <div className={cn("text-sm font-medium text-gray-regular", className)}>
    Showing data {startEntry} to {endEntry} of {totalEntries} entries
  </div>
);
