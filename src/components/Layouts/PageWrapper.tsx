import React, { FC, ReactNode } from "react";
import cn from "classnames";
import { Header } from "../Header";

interface Props {
  children: ReactNode;
  className?: string;
  mainClassName?: string;
  popup?: FC;
}

export const PageWrapper: FC<Props> = ({
  children,
  className,
  mainClassName,
  popup: Popup,
}) => {
  return (
    <div className="flex flex-1">
      <div
        className={cn(
          "scrollbar flex flex-1 flex-col gap-10 overflow-y-auto px-18.75 py-10",
          className
        )}
      >
        <Header />
        <main className={cn("flex-1", mainClassName)}>{children}</main>
      </div>

      {Popup && <Popup />}
    </div>
  );
};
