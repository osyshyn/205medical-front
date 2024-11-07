import React, { FC, ReactNode } from "react";
import cn from "classnames";

// import { Header } from "../Header";
// import { Footer } from "../Footer";

interface Props {
  children: ReactNode;
  className?: string;
  mainClassName?: string;
  isShownHeader?: boolean;
  isShownFooter?: boolean;
}

export const PageWrapper: FC<Props> = ({
  children,
  className,
  mainClassName,
  isShownHeader,
  isShownFooter,
}) => (
  <div className={cn("flex h-screen flex-col", className)}>
    {/* <Header isShown={isShownHeader} /> */}
    <main className={cn("flex-1", mainClassName)}>{children}</main>
    {/* <Footer isShown={isShownFooter} /> */}
  </div>
);
