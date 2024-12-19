import React, { FC, useEffect } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import path from "path";
import {
  ChangePassword,
  CheckOtp,
  CreateOrder,
  Dashboard,
  Layout,
  Location,
  Login,
  NotFound,
  OrderAlerts,
  PasswordRecovery,
  Products,
  ProductsHistory,
  ProductsPurchases,
  Settings,
  ShipmentAlerts,
  Shipments,
} from "src/pages";
import { Buyers } from "src/pages/Buyers";
import { Chat } from "src/pages/Chat";
import { BuyerDetail } from "src/components/Buyers/BuyerDetail";
import { OrderDetail } from "src/components/OrderDetail";
import { PasswordRecoveryProgress } from "src/components/PasswordRecoveryProgress";
import { PrivateRoute } from "src/components/PrivateRoute";
import { ONLY_FOR } from "src/components/PrivateRoute/types";
import useUserStore from "src/stores/user-store";
import { PATHNAMES } from "src/constants/routes";

const ROUTES = [
  {
    element: (
      <PrivateRoute
        onlyFor={ONLY_FOR.UNAUTHORIZED}
        component={Login}
        redirectUrl={PATHNAMES.DASHBOARD}
      />
    ),
    path: PATHNAMES.LOGIN,
  },
  {
    path: PATHNAMES.PASSWRD_RECOVERY,
    element: (
      <PrivateRoute
        onlyFor={ONLY_FOR.UNAUTHORIZED}
        component={PasswordRecovery}
        redirectUrl={PATHNAMES.DASHBOARD}
      />
    ),
  },
  {
    path: PATHNAMES.CHECK_OTP,
    element: (
      <PasswordRecoveryProgress step="otp">
        <PrivateRoute
          onlyFor={ONLY_FOR.UNAUTHORIZED}
          component={CheckOtp}
          redirectUrl={PATHNAMES.DASHBOARD}
        />
      </PasswordRecoveryProgress>
    ),
  },
  {
    path: PATHNAMES.CHANGE_PASSWORD,
    element: (
      <PasswordRecoveryProgress step="password">
        <PrivateRoute
          onlyFor={ONLY_FOR.UNAUTHORIZED}
          component={ChangePassword}
          redirectUrl={PATHNAMES.DASHBOARD}
        />
      </PasswordRecoveryProgress>
    ),
  },
  {
    path: PATHNAMES.HOME,
    element: <Navigate to={PATHNAMES.DASHBOARD} replace />,
  },
  {
    element: <PrivateRoute component={Layout} />,
    path: PATHNAMES.HOME,
    children: [
      {
        element: <PrivateRoute component={Dashboard} />,
        path: PATHNAMES.DASHBOARD,
      },
      {
        element: <PrivateRoute component={CreateOrder} />,
        path: PATHNAMES.CREATE_ORDER,
      },
      {
        element: <PrivateRoute component={OrderAlerts} />,
        path: PATHNAMES.ORDER_ALERTS,
      },
      {
        element: <PrivateRoute component={Location} />,
        path: PATHNAMES.LOCATION_SLUG,
      },
      {
        element: <PrivateRoute component={Chat} />,
        path: PATHNAMES.CHAT,
      },
      {
        element: <PrivateRoute component={Products} />,
        path: PATHNAMES.PRODUCT,
      },
      {
        element: <PrivateRoute component={Buyers} />,
        path: PATHNAMES.BUYERS,
        children: [
          {
            element: <PrivateRoute component={BuyerDetail} />,
            path: PATHNAMES.BUYER_ITEM,
          },
        ],
      },
      {
        element: <PrivateRoute component={ProductsHistory} />,
        path: PATHNAMES.PRODUCT_HISTORY,
      },
      {
        element: <PrivateRoute component={ProductsPurchases} />,
        path: PATHNAMES.PRODUCT_PURCHASES,
      },
      {
        element: <PrivateRoute component={Shipments} />,
        path: PATHNAMES.SHIPMENTS,
        children: [
          {
            element: <PrivateRoute component={OrderDetail} />,
            path: PATHNAMES.ORDER_DETAIL,
          },
        ],
      },
      {
        element: <PrivateRoute component={ShipmentAlerts} />,
        path: PATHNAMES.SHIPMENT_ALERTS,
      },
      {
        element: <PrivateRoute component={Settings} />,
        path: PATHNAMES.SETTINGS,
      },
    ],
  },
  {
    element: <NotFound />,
    path: PATHNAMES.NOT_FOUND,
  },
];

const AppRoutes: FC = () => {
  const getUser = useUserStore((state) => state.getUser);

  useEffect(() => {
    getUser();
  }, []);

  return useRoutes(ROUTES);
};

export default AppRoutes;
