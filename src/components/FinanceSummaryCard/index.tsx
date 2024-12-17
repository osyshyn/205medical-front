import React, { FC, useEffect } from "react";
import { useQueryParams } from "src/hooks/useQueryParams";
import useMetricStore from "src/stores/metric-store";
import { getArrayFromStringParams } from "src/utils/getArrayFromStringParams";
import { QUERY_PARAM_KEYS } from "src/constants/queryParams";
import { Sizes } from "src/@types/sizes";
import { Loader } from "../Loader";
import {
  getCurrentMonthOption,
  getCurrentYearOption,
} from "../SelectDate/constants";
import { Metric } from "./Metric";

export const FinanceSummaryCard: FC = () => {
  const { getQueryParam } = useQueryParams();

  const fetchMonthlyPurchases = useMetricStore(
    (state) => state.fetchMonthlyPurchases
  );
  const fetchOpenInvoiceTotal = useMetricStore(
    (state) => state.fetchOpenInvoiceTotal
  );
  const monthlyPurchases = useMetricStore((state) => state.monthlyPurchases);
  const openInvoiceTotal = useMetricStore((state) => state.monthlyPurchases);

  const isLoading = useMetricStore((state) => state.isLoadingInvoice);

  const year =
    getQueryParam(QUERY_PARAM_KEYS.YEAR) ||
    getCurrentYearOption().value.toString();
  const month =
    getQueryParam(QUERY_PARAM_KEYS.MONTH) ||
    getCurrentMonthOption().value.toString();

  const location_ids = getQueryParam(QUERY_PARAM_KEYS.LOCATIONS) || "";
  const su_users_ids = getQueryParam(QUERY_PARAM_KEYS.SUB_USERS) || "";

  useEffect(() => {
    fetchMonthlyPurchases({
      year,
      month,
      location_ids: getArrayFromStringParams(location_ids),
      su_users_ids: getArrayFromStringParams(su_users_ids),
    });
    fetchOpenInvoiceTotal({
      location_ids: getArrayFromStringParams(location_ids),
      su_users_ids: getArrayFromStringParams(su_users_ids),
    });
  }, [
    fetchMonthlyPurchases,
    fetchOpenInvoiceTotal,
    year,
    month,
    location_ids,
    su_users_ids,
  ]);

  return (
    <section>
      {isLoading ? (
        <Loader size={Sizes.XXL} />
      ) : (
        <div className="mt-5 flex gap-6">
          <Metric
            title="Monthly Purchases"
            value={monthlyPurchases.total_amount}
            color="#5932EA"
            subtitle="Monthly tear to date"
          />
          <Metric
            title="Open Invoice Total"
            value={openInvoiceTotal.total_amount}
            color="#DF0404"
          />
        </div>
      )}
    </section>
  );
};
