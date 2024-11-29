import React, { FC, useState } from "react";
import { PRODUCT_TEMP } from "src/components/AllProducts/temp/constants";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { Sizes } from "src/@types/sizes";
import { getTabs } from "../constants";
import { ITab } from "./types";

export const Tabs: FC = () => {
  const tabs = getTabs(PRODUCT_TEMP);

  const [visbleTab, setVisbleTab] = useState(tabs[0]);

  const onClickTab = (newTab: ITab) => {
    setVisbleTab(newTab);
  };

  return (
    <div>
      <div className="flex gap-1.5">
        {tabs.map((tab) => (
          <Button
            onClick={() => onClickTab(tab)}
            variant={
              tab.slug === visbleTab.slug
                ? ButtonVariants.PRIMARY_GRADIENT
                : ButtonVariants.SECONDARY
            }
            size={Sizes.XS}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      <p className="mt-4">{visbleTab.value}</p>
    </div>
  );
};
