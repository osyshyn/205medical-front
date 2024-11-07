import React, { FC } from "react";
import { useRoutes } from "react-router-dom";
import { Dashboard, NotFound } from "src/pages";
import { PATHNAMES } from "src/constants/routes";

const ROUTES = [
  {
    element: <Dashboard />,
    path: PATHNAMES.DASHBOARD,
  },
  {
    element: <NotFound />,
    path: PATHNAMES.NOT_FOUND,
  },
];

const AppRoutes: FC = () => {
  return useRoutes(ROUTES);
};

export default AppRoutes;
