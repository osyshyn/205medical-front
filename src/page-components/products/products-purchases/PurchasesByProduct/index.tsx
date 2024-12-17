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

export const PurchasesByProduct: FC = () => {
  const { getQueryParam } = useQueryParams();

  const [option, setOption] = useState<BarChartOptions>(
    BarChartOptions.QUANTITY
  );

  const loadMetrics = useMetricStore((state) => state.fetchMetricProducts);
  const metrics_products = useMetricStore((state) => state.metrics_products);

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
