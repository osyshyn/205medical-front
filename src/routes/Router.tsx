import React, { FC } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import {
  CreateOrder,
  Dashboard,
  Location,
  NotFound,
  OrderAlerts,
} from "src/pages";
import { PATHNAMES } from "src/constants/routes";

const ROUTES = [
  {
    path: PATHNAMES.HOME,
    element: <Navigate to={PATHNAMES.DASHBOARD} replace />,
  },
  {
    element: <Dashboard />,
    path: PATHNAMES.DASHBOARD,
  },
  {
    element: <CreateOrder />,
    path: PATHNAMES.CREATE_ORDER,
  },
  {
    element: <OrderAlerts />,
    path: PATHNAMES.ORDER_ALERTS,
  },
  {
    element: <Location />,
    path: PATHNAMES.LOCATION,
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
