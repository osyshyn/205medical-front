import React, { FC } from "react";
import cn from "classnames";
import { Sizes } from "src/@types/sizes";
import { LOADER_SIZES } from "./constants";

interface Props {
  size?: Sizes;
  className?: string;
}

export const Loader: FC<Props> = ({ size = Sizes.XS, className }) => (
  <div
    className={cn(
      "mx-auto border-2 border-gray-medium border-t-blue-medium rounded-full animate-spin",
      LOADER_SIZES[size],
      className
    )}
  />
);
