import React, { FC, ReactNode } from "react";
import cn from "classnames";

interface Props {
  children: ReactNode;
  className?: string;
}

export const Window: FC<Props> = ({ children, className }) => (
  <div
    className={cn(
      "rounded-30 bg-white-base",
      className,
      "border border-gray-soft p-7.5"
    )}
  >
    {children}
  </div>
);
