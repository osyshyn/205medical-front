import React, { FC } from "react";
import { Window } from "src/components/Window";

interface Props {
  color: string;
  title: string;
  value: any;
  subtitle?: string;
}

export const Metric: FC<Props> = ({ color, title, value, subtitle }) => {
  const displayValue =
    value !== null && !isNaN(Number(value))
      ? `$${Number(value).toFixed(2)}`
      : "0";

  return (
    <Window className="min-w- flex flex-1 items-center gap-10 border border-white-lightgray">
      <div
        className="h-20 w-20 rounded-full border-4"
        style={{ borderColor: color }}
      ></div>

      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-regular">
          {title.toUpperCase()}
        </span>
        <span className="mt-2 text-32 font-semibold">{displayValue}</span>
        {subtitle && (
          <span className="text-sm text-gray-regular">{subtitle}</span>
        )}
      </div>
    </Window>
  );
};
