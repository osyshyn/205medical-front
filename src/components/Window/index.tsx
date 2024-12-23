import React, { FC, ReactNode } from "react";
import cn from "classnames";

interface Props {
  children: ReactNode;
  className?: string;
}

export const Window: FC<Props> = ({ children, className }) => (
  <div
    className={cn(
      "rounded-30 border-1 border-gray-soft bg-white-base p-7.5",
      className

    )}
  >
    {children}
  </div>
);
