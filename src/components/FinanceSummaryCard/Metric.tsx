import React, { FC } from "react";
import { Window } from "src/components/Window";

interface Props {
  color: string;
  title: string;
  value: string;
  subtitle?: string;
}

export const Metric: FC<Props> = ({ color, title, value, subtitle }) => (
  <Window className="flex flex-1 items-center gap-10">
    <div
      className="h-20 w-20 rounded-full border-4"
      style={{ borderColor: color }}
    ></div>

    <div className="flex flex-col">
      <span className="text-sm font-semibold text-gray-regular">{title}</span>
      <span className="mt-2 text-32 font-semibold">{value}</span>
      {subtitle && <span className="text-sm text-gray-regular">{title}</span>}
    </div>
  </Window>
);
