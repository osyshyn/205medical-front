import React, { FC } from "react";
import { Sizes } from "src/@types/sizes";
import { Loader } from "../Loader";
import { Metric } from "./Metric";

export const FinanceSummaryCard: FC = () => {
  const isLoading = false;

  return (
    <section>
      {isLoading ? (
        <Loader size={Sizes.XXL} />
      ) : (
        <div className="mt-5 flex gap-6">
          <Metric
            title="Monthly Purchases"
            value={"$475,374.60"}
            color="#5932EA"
            subtitle="Monthly tear to date"
          />
          <Metric
            title="Open Invoice Total"
            value={"$475,374.60"}
            color="#DF0404"
          />
        </div>
      )}
    </section>
  );
};
