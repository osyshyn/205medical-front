import React, { FC, ReactNode } from "react";
import cn from "classnames";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";

interface Props {
  children: ReactNode;
  className?: string;
  mainClassName?: string;
}

export const PageWrapper: FC<Props> = ({
  children,
  className,
  mainClassName,
}) => {
  return (
    <div className="flex h-full">
      <Sidebar />

      <div
        className={cn(
          "scrollbar flex flex-1 flex-col gap-10 overflow-y-auto px-18.75 py-10",
          className
        )}
      >
        <Header />
        <main className={cn("flex-1", mainClassName)}>{children}</main>
      </div>
    </div>
  );
};
