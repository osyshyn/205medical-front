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
}) => (
  <div className="flex h-full">
    <Sidebar />

    <div className={cn("px-18.75 flex flex-1 flex-col py-10", className)}>
      <Header />
      <main className={cn("flex-1", mainClassName)}>{children}</main>
    </div>
  </div>
);
