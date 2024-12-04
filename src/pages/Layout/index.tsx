import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "src/components/Sidebar";

const Layout: FC = () => (
  <div className="flex h-full">
    <Sidebar />

    <div className="flex-1">
      <Outlet />
    </div>
  </div>
);

export default Layout;
