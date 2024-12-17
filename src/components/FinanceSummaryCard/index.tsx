import React, { FC, useEffect } from "react";
import useMetricStore from "src/stores/metric-store";
import { Sizes } from "src/@types/sizes";
import { Loader } from "../Loader";
import { Metric } from "./Metric";

export const FinanceSummaryCard: FC = () => {
  const fetchMonthlyPurchases = useMetricStore(
    (state) => state.fetchMonthlyPurchases
  );
  const fetchOpenInvoiceTotal = useMetricStore(
    (state) => state.fetchOpenInvoiceTotal
  );
  const monthlyPurchases = useMetricStore((state) => state.monthlyPurchases);
  const openInvoiceTotal = useMetricStore((state) => state.monthlyPurchases);

  const isLoading = useMetricStore((state) => state.isLoadingInvoice);

  useEffect(() => {
    fetchMonthlyPurchases();
    fetchOpenInvoiceTotal();
  }, [fetchMonthlyPurchases, fetchOpenInvoiceTotal]);

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
