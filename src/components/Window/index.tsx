import React, { FC, ReactNode } from "react";
import cn from "classnames";

interface Props {
  children: ReactNode;
  className?: string;
}

export const Window: FC<Props> = ({ children, className }) => (
  <div className={cn("p-7.5 bg-white-base border border-gray-soft rounded-30", className)}>{children}</div>
);
