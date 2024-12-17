import React, { FC, useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  getCurrentMonthOption,
  getCurrentYearOption,
} from "src/components/SelectDate/constants";
import { Window } from "src/components/Window";
import { useQueryParams } from "src/hooks/useQueryParams";
import useMetricStore from "src/stores/metric-store";
import { getArrayFromStringParams } from "src/utils/getArrayFromStringParams";
import { QUERY_PARAM_KEYS } from "src/constants/queryParams";
import { Switch } from "./Switch";
import { BarChartOptions } from "./types";

//temp
const metrics_products = {
  metrics: [
    { order_date: 1, total_amount: 100.5, total_quantity: 2 },
    { order_date: 2, total_amount: 200.75, total_quantity: 3 },
    { order_date: 3, total_amount: 0, total_quantity: 0 },
    { order_date: 4, total_amount: 150.0, total_quantity: 5 },
    { order_date: 5, total_amount: 120.3, total_quantity: 4 },
    { order_date: 6, total_amount: 0, total_quantity: 0 },
    { order_date: 7, total_amount: 310.2, total_quantity: 6 },
    { order_date: 8, total_amount: 0, total_quantity: 0 },
    { order_date: 9, total_amount: 410.45, total_quantity: 8 },
    { order_date: 10, total_amount: 275.35, total_quantity: 7 },
    { order_date: 11, total_amount: 0, total_quantity: 0 },
    { order_date: 12, total_amount: 500.9, total_quantity: 10 },
    { order_date: 13, total_amount: 620.1, total_quantity: 12 },
    { order_date: 14, total_amount: 180.7, total_quantity: 5 },
    { order_date: 15, total_amount: 1175.6, total_quantity: 15 },
    { order_date: 16, total_amount: 822.92, total_quantity: 11 },
    { order_date: 17, total_amount: 0, total_quantity: 0 },
    { order_date: 18, total_amount: 300.4, total_quantity: 6 },
    { order_date: 19, total_amount: 400.1, total_quantity: 9 },
    { order_date: 20, total_amount: 0, total_quantity: 0 },
    { order_date: 21, total_amount: 0, total_quantity: 0 },
    { order_date: 22, total_amount: 850.55, total_quantity: 14 },
    { order_date: 23, total_amount: 925.75, total_quantity: 13 },
    { order_date: 24, total_amount: 0, total_quantity: 0 },
    { order_date: 25, total_amount: 560.2, total_quantity: 9 },
    { order_date: 26, total_amount: 0, total_quantity: 0 },
    { order_date: 27, total_amount: 675.1, total_quantity: 10 },
    { order_date: 28, total_amount: 0, total_quantity: 0 },
    { order_date: 29, total_amount: 950.3, total_quantity: 17 },
    { order_date: 30, total_amount: 480.9, total_quantity: 8 },
    { order_date: 31, total_amount: 720.4, total_quantity: 11 },
  ],
  count: 50,
};

export const PurchaseHistory: FC = () => {
  const { getQueryParam } = useQueryParams();

  const [option, setOption] = useState<BarChartOptions>(
    BarChartOptions.QUANTITY
  );

  const loadMetrics = useMetricStore((state) => state.fetchMetricProducts);
  // const metrics_products = useMetricStore((state) => state.metrics_products);

  const year =
    getQueryParam(QUERY_PARAM_KEYS.YEAR) ||
    getCurrentYearOption().value.toString();
  const month =
    getQueryParam(QUERY_PARAM_KEYS.MONTH) ||
    getCurrentMonthOption().value.toString();

  const product_ids = getQueryParam(QUERY_PARAM_KEYS.PRODUCTS) || "";

  useEffect(() => {
    loadMetrics({
      year,
      month,
      product_ids: getArrayFromStringParams(product_ids),
    });
  }, [loadMetrics, month, year, product_ids]);

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
        <LineChart data={metrics}>
          <CartesianGrid stroke="#F1F1F1" strokeWidth="1" />
          <XAxis dataKey="order_date" />
          <YAxis />

          <Line
            type="monotone"
            dataKey={option}
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Window>
  );
};
