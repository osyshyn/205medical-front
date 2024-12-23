import React, { FC } from "react";
import { Window } from "src/components/Window";

interface Props {
  color: string;
  title: string;
  value: any;
  subtitle?: string;
}

export const Metric: FC<Props> = ({ color, title, value, subtitle }) => (
  <Window className="flex min-w- flex-1 items-center gap-10 border-1 border-white-lightgray">
    <div
      className="h-20 w-20 rounded-full border-5"
      style={{ borderColor: color }}
    ></div>

    <div className="flex flex-col">
      <span className="text-sm font-semibold text-gray-regular">{title}</span>
      <span className="mt-2 text-32 font-semibold">${value.toFixed(2)}</span>
      {subtitle && <span className="text-sm text-gray-regular">{subtitle}</span>}
    </div>
  </Window>
);
