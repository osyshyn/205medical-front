export const PATHNAMES = {
  HOME: "/",

  LOGIN: "/login",
  PASSWRD_RECOVERY: "/password-recovery",
  CHECK_OTP: "/check-otp",
  CHANGE_PASSWORD: "/change-password",

  DASHBOARD: "/dashboard",

  CREATE_ORDER: "/create-order",
  ORDER_ALERTS: "/create-order/order-alerts",

  PRODUCT: "/products",
  PRODUCT_HISTORY: "/products/history",
  PRODUCT_PURCHASES: "/products/purchases",

  SHIPMENTS: "/shipments",
  SHIPMENT_ALERTS: "/shipments/alerts",
  ORDER_DETAIL: "/shipments/:id",

  LOCATION: "/location",
  LOCATION_ID: "/location/:id?",
  ADD_LOCATION: "/location/add",
  EDIT_LOCATION: "/location/edit",

  CHAT: "/chat",
  SETTINGS: "/settings",

  // ADMIN
  BUYERS: "/buyers",
  BUYER_ITEM: "/buyers/:id",

  NOT_FOUND: "/*",

  RECENT_ORDERS: "/recent-orders",
  AWAITING_APPROVAL: "/awaiting-approval",
};
