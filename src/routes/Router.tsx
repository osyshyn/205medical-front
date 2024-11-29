import React, { FC } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import {
  CreateOrder,
  Dashboard,
  Location,
  NotFound,
  OrderAlerts,
  Products,
  ProductsHistory,
  ProductsPurchases,
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
    path: PATHNAMES.LOCATION_SLUG,
  },
  {
    element: <Products />,
    path: PATHNAMES.PRODUCT,
  },
  {
    element: <ProductsHistory />,
    path: PATHNAMES.PRODUCT_HISTORY,
  },
  {
    element: <ProductsPurchases />,
    path: PATHNAMES.PRODUCT_PURCHASES,
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
