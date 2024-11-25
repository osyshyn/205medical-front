import React, { FC } from "react";
import cn from "classnames";
import { Sizes } from "src/@types/sizes";
import { LOADER_SIZES } from "./constants";

interface Props {
  size?: Sizes;
  className?: string;
}

export const Loader: FC<Props> = ({ size = Sizes.XS, className }) => (
  <div className={className}>
    <div
      className={cn(
        "mx-auto animate-spin rounded-full border-2 border-gray-regular border-t-purple-base",
        LOADER_SIZES[size]
      )}
    />
  </div>
);
