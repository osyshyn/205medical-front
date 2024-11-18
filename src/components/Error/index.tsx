import React, { FC } from "react";
import cn from "classnames";

interface Props {
  children: string ;
  className?: string;
  isShownError: boolean;
}

export const Error: FC<Props> = ({ children, className, isShownError }) => {
  if (!isShownError) return null;

  return (
    <div className={cn("absolute -bottom-2.5 left-4", className)}>
      {children}
    </div>
  );
};
