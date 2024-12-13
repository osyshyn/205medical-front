import React, { FC, useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Window } from "src/components/Window";
import useMetricStore from "src/stores/metric-store";
import { Switch } from "./Switch";
import { BarChartOptions } from "./types";

export const ProductMetrics: FC = () => {
  const [option, setOption] = useState<BarChartOptions>(
    BarChartOptions.QUANTITY
  );

  const loadMetrics = useMetricStore((state) => state.fetchMetricProducts);
  const metrics_products = useMetricStore((state) => state.metrics_products);

  useEffect(() => {
    loadMetrics();
  }, [loadMetrics]);

  const onClickSwitch = () => {
    setOption(
      option === BarChartOptions.QUANTITY
        ? BarChartOptions.AMOUNT
        : BarChartOptions.QUANTITY
    );
  };

  const metrics = metrics_products?.metrics || [];
  const count = metrics_products?.count || 0;

  return (
    <Window className="flex flex-col gap-3">
      <h3>Purchases By Product</h3>

      <div className="flex justify-between">
        <p className="text-32 text-purple-base">{count} Orders</p>

        <Switch onClick={onClickSwitch} />
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={metrics}>
          <CartesianGrid stroke="#F1F1F1" strokeWidth="1" />
          <XAxis dataKey="order_date" />
          <YAxis />

          <Bar dataKey={option} barSize={15}>
            {metrics.map((_, index) => (
              <Cell
                cursor="pointer"
                fill={index % 2 === 0 ? "#9197B3" : "#E9EAF0"}
                key={`cell-${index}`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Window>
  );
};
