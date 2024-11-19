import React, { FC } from "react";
import cn from "classnames";

interface Props {
  children: string;
  className?: string;
  isShownError: boolean;
}

export const Error: FC<Props> = ({ children, className, isShownError }) => {
  if (!isShownError) return null;

  return (
    <div
      className={cn(
        "absolute -bottom-4 left-3 text-xs text-red-base",
        className
      )}
    >
      {children}
    </div>
  );
};
