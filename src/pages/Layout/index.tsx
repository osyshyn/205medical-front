import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "src/components/Sidebar";

const Layout: FC = () => (
  <div className="flex h-full">
    <Sidebar />
    <Outlet />
  </div>
);

export default Layout;
