import React, { FC } from "react";
import { Window } from "src/components/Window";
import { IMetrics } from "src/@types/metrics";

export const UserMetric: FC<IMetrics> = ({ title, metrics }) => (
  <Window className="max-w-160 relative flex-1">
    {" "}
    {/* Increased max-width */}
    <h3>{title}</h3>
    <div className="mt-2 flex justify-between">
      {metrics.map(({ id, icon: Icon, color, label, value, trend }) => (
        <div key={id} className="flex items-center gap-5">
          <div
            className="flex h-15 w-15 items-center justify-center rounded-full"
            style={{ backgroundColor: color }}
          >
            {Icon ? <Icon /> : <div>No Icon</div>}
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-sm text-gray-regular">{label}</span>
            <span className="text-32 font-semibold">{value}</span>

            {trend && (
              <p className="flex gap-1 text-sm">
                <span className="font-bold" style={{ color }}>
                  {`${trend.value}%`}
                </span>
                <span className="font-regular">{trend.description}</span>
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  </Window>
);
