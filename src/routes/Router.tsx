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
import { Accounting } from "src/pages/Accounting";
import { Buyers } from "src/pages/Buyers";
import { EditBuyer } from "src/pages/Buyers/EditBuyer";
import { Chat } from "src/pages/Chat";
import { Companies } from "src/pages/Companies";
import { CompanyOnBoarding } from "src/pages/Companies/CompanyOnBoarding";
import { EditCompany } from "src/pages/Companies/EditCompany";
import { AddLocation } from "src/pages/Location/AddLocation";
import { EditLocation } from "src/pages/Location/EditLocation";
import { OrderHistoryByLocation } from "src/pages/Location/OrderHistoyryyBtLocation";
import { RecentOrders } from "src/pages/RecentOrders";
import { AwaitingApproval } from "src/pages/RecentOrders/AwaitingApproval";
import { Reporting } from "src/pages/Reporting";
import { PurchaseAnalytics } from "src/pages/Reporting/PurchaseAnalytics";
import { SettingsMedical } from "src/pages/SettingsMedical";
import { PurchaseHistory } from "src/page-components/dashboard/PurchaseHistory";
import { EditProduct } from "src/page-components/products/EditProduct";
import { PurchasesByProduct } from "src/page-components/products/products-purchases/PurchasesByProduct";
import { BuyerDetail } from "src/components/Buyers/BuyerDetail";
import { NewClient } from "src/components/Buyers/NewClient";
import { OpenInvoices } from "src/components/OpenInvoices";
import { PaidInvoices } from "src/components/PaidInvoices";
import { PasswordRecoveryProgress } from "src/components/PasswordRecoveryProgress";
import { PrivateRoute } from "src/components/PrivateRoute";
import { ONLY_FOR } from "src/components/PrivateRoute/types";
import { ShipmentDetail } from "src/components/ShipmentDetail";
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
        element: <PrivateRoute component={Reporting} />,
        path: PATHNAMES.REPORTING_ANALYTICS,
      },
      {
        element: <PrivateRoute component={ProductsPurchases} />,
        path: PATHNAMES.PURCHASE_PRODUCTS,
      },
      {
        element: <PrivateRoute component={PurchaseAnalytics} />,
        path: PATHNAMES.PURCHASE_ANALYTICS,
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
        path: PATHNAMES.LOCATION_ID,
      },
      {
        element: <PrivateRoute component={Chat} />,
        path: PATHNAMES.CHAT,
      },
      {
        element: <PrivateRoute component={Products} />,
        path: PATHNAMES.PRODUCT,

        children: [
          {
            element: <PrivateRoute component={EditProduct} />,
            path: PATHNAMES.EDIT_PRODUCT,
          },
        ],
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
        element: <PrivateRoute component={NewClient} />,
        path: PATHNAMES.BUYER_NEW_CLIENT,
      },
      {
        element: <PrivateRoute component={Accounting} />,
        path: PATHNAMES.ACCOUNTING,
        children: [
          {
            index: true,
            element: (
              <React.Fragment>
                <OpenInvoices />
                <PaidInvoices />
              </React.Fragment>
            ),
          },
          {
            element: <PrivateRoute component={OpenInvoices} />,
            path: PATHNAMES.OPEN_INVOICES,
          },
          {
            element: <PrivateRoute component={PaidInvoices} />,
            path: PATHNAMES.PAID_INVOICES,
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
            element: <PrivateRoute component={ShipmentDetail} />,
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
      {
        element: <PrivateRoute component={RecentOrders} />,
        path: PATHNAMES.RECENT_ORDERS,
        children: [],
      },
      {
        element: <PrivateRoute component={AwaitingApproval} />,
        path: PATHNAMES.AWAITING_APPROVAL,
        children: [
          {
            element: <PrivateRoute component={ShipmentDetail} />,
            path: PATHNAMES.APPROVAL_DETAIL,
          },
        ],
      },
      // {
      //   element: <PrivateRoute component={ShipmentDetail} />,
      //   path: PATHNAMES.APPROVAL_DETAIL,
      // },
      {
        element: <PrivateRoute component={SettingsMedical} />,
        path: PATHNAMES.SETTINGS_MEDICAL,
      },
      {
        element: <PrivateRoute component={AddLocation} />,
        path: PATHNAMES.ADD_LOCATION,
      },
      {
        element: <PrivateRoute component={EditLocation} />,
        path: PATHNAMES.EDIT_LOCATION,
      },
      {
        element: <PrivateRoute component={OrderHistoryByLocation} />,
        path: PATHNAMES.ORDER_HISTORY_BY_LOCATION,
      },
      {
        element: <PrivateRoute component={EditBuyer} />,
        path: PATHNAMES.EDIT_BUYER,
      },
      {
        element: <PrivateRoute component={Companies} />,
        path: PATHNAMES.COMPANIES,
        children: [
          {
            element: <PrivateRoute component={CompanyOnBoarding} />,
            path: PATHNAMES.COMPANY_ONBOARDING,
          },
          {
            element: <PrivateRoute component={EditCompany} />,
            path: PATHNAMES.EDIT_COMPANY,
          },
        ],
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
