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

// temp
const metrics = [
  { order_date: 1, total_amount: 500, total_quantity: 20 },
  { order_date: 2, total_amount: 1500, total_quantity: 45 },
  { order_date: 3, total_amount: 3200, total_quantity: 65 },
  { order_date: 4, total_amount: 75, total_quantity: 12 },
  { order_date: 5, total_amount: 3000, total_quantity: 30 },
  { order_date: 6, total_amount: 65.3, total_quantity: 120 },
  { order_date: 7, total_amount: 4200, total_quantity: 40 },
  { order_date: 8, total_amount: 2300, total_quantity: 35 },
  { order_date: 9, total_amount: 2800, total_quantity: 50 },
  { order_date: 10, total_amount: 1800, total_quantity: 25 },
  { order_date: 11, total_amount: 2900, total_quantity: 30 },
  { order_date: 12, total_amount: 3700, total_quantity: 60 },
  { order_date: 13, total_amount: 8000, total_quantity: 70 },
  { order_date: 14, total_amount: 2000, total_quantity: 40 },
  { order_date: 15, total_amount: 1500, total_quantity: 15 },
  { order_date: 16, total_amount: 1200, total_quantity: 22 },
  { order_date: 17, total_amount: 5300, total_quantity: 75 },
  { order_date: 18, total_amount: 4000, total_quantity: 65 },
  { order_date: 19, total_amount: 6000, total_quantity: 80 },
  { order_date: 20, total_amount: 2900, total_quantity: 40 },
  { order_date: 21, total_amount: 3400, total_quantity: 55 },
  { order_date: 22, total_amount: 500, total_quantity: 10 },
  { order_date: 23, total_amount: 3000, total_quantity: 50 },
  { order_date: 24, total_amount: 2100, total_quantity: 30 },
  { order_date: 25, total_amount: 3800, total_quantity: 45 },
  { order_date: 26, total_amount: 1500, total_quantity: 20 },
  { order_date: 27, total_amount: 7000, total_quantity: 60 },
  { order_date: 28, total_amount: 2800, total_quantity: 35 },
  { order_date: 29, total_amount: 1200, total_quantity: 22 },
  { order_date: 30, total_amount: 4300, total_quantity: 55 },
  { order_date: 31, total_amount: 5200, total_quantity: 65 },
];
// temp
const count = 50;

export const ProductMetrics: FC = () => {
  const [option, setOption] = useState<BarChartOptions>(
    BarChartOptions.QUANTITY
  );

  const loadMetrics = useMetricStore((state) => state.fetchMetricProducts);
  // const { metrics, count } = useMetricStore((state) => state.metrics_products);

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
