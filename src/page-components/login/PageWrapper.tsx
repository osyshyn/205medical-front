import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const PageWrapper: FC<Props> = ({ children }) => (
  <div className="flex h-full">
    <main className="h-full flex-1">
      <section className="flex min-h-full bg-white-base">
        <div className="min-h-full w-1/2 self-center px-28 py-10">
          {children}
        </div>

        <div className="flex-1 bg-login-banner bg-cover bg-no-repeat"></div>
      </section>
    </main>
  </div>
);
