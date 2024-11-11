import React, { FC, ReactNode } from "react";
import cn from "classnames";
import { Sidebar } from "../Sidebar";

// import { Header } from "../Header";

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
  <div className={cn("flex h-screen", className)}>
    {/* <Header isShown={isShownHeader} /> */}
    <Sidebar />
    <main className={cn("flex-1", mainClassName)}>{children}</main>
  </div>
);
