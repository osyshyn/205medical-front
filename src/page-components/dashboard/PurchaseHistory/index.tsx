import React, { FC, useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Loader } from "src/components/Loader";
import {
  getCurrentMonthOption,
  getCurrentYearOption,
} from "src/components/SelectDate/constants";
import { Window } from "src/components/Window";
import { useQueryParams } from "src/hooks/useQueryParams";
import useMetricStore from "src/stores/metric-store";
import { getArrayFromStringParams } from "src/utils/getArrayFromStringParams";
import { QUERY_PARAM_KEYS } from "src/constants/queryParams";
import { Sizes } from "src/@types/sizes";
import { Switch } from "./Switch";
import { BarChartOptions } from "./types";

export const PurchaseHistory: FC = () => {
  const { getQueryParam } = useQueryParams();

  const [option, setOption] = useState<BarChartOptions>(
    BarChartOptions.QUANTITY
  );

  const loadMetrics = useMetricStore((state) => state.fetchPurchaseHistory);
  const metrics_products = useMetricStore((state) => state.purchase_history);
  const isLoading = useMetricStore((state) => state.isLoadingPurchaseHistory);

  const year =
    getQueryParam(QUERY_PARAM_KEYS.YEAR) ||
    getCurrentYearOption().value.toString();
  const month =
    getQueryParam(QUERY_PARAM_KEYS.MONTH) ||
    getCurrentMonthOption().value.toString();

  const location_ids = getQueryParam(QUERY_PARAM_KEYS.LOCATIONS) || "";
  const su_users_ids = getQueryParam(QUERY_PARAM_KEYS.SUB_USERS) || "";

  useEffect(() => {
    loadMetrics({
      year,
      month,
      location_ids: getArrayFromStringParams(location_ids),
      su_users_ids: getArrayFromStringParams(su_users_ids),
    });
  }, [loadMetrics, month, year, su_users_ids, location_ids]);

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

      {isLoading ? (
        <Loader size={Sizes.XXL} />
      ) : (
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
      )}
    </Window>
  );
};
