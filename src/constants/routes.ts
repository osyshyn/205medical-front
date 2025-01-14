export const PATHNAMES = {
  HOME: "/",

  LOGIN: "/login",
  PASSWRD_RECOVERY: "/password-recovery",
  CHECK_OTP: "/check-otp",
  CHANGE_PASSWORD: "/change-password",

  DASHBOARD: "/dashboard",

  REPORTING_ANALYTICS: "/analytics",
  PURCHASE_PRODUCTS: "/analytics/purchase-products",
  PURCHASE_ANALYTICS: "/analytics/purchase-analytics",

  CREATE_ORDER: "/create-order",
  ORDER_ALERTS: "/create-order/order-alerts",

  PRODUCT: "/products",
  PRODUCT_HISTORY: "/products/history",
  PRODUCT_PURCHASES: "/products/purchases",
  EDIT_PRODUCT: "/products/edit/:id",

  SHIPMENTS: "/shipments",
  SHIPMENT_ALERTS: "/shipments/alerts",
  ORDER_DETAIL: "/shipments/:id",

  LOCATION: "/location",
  ORDER_HISTORY_BY_LOCATION: "/location/order-history",
  LOCATION_ID: "/location/:id?",
  ADD_LOCATION: "/location/add",
  EDIT_LOCATION: "/location/edit",

  CHAT: "/chat",
  SETTINGS: "/settings",

  // ADMIN
  BUYERS: "/buyers",
  BUYER_ITEM: "/buyers/:id",
  EDIT_BUYER: "/buyers/edit/:id",
  BUYER_NEW_CLIENT: "/buyers/new-client-onboarding",

  ACCOUNTING: "/accounting",
  OPEN_INVOICES: "/accounting/open-invoices",
  PAID_INVOICES: "/accounting/paid-invoices",

  // 205 MEDICAL ADMIN
  SETTINGS_MEDICAL: "/settings-medical",

  NOT_FOUND: "/*",

  RECENT_ORDERS: "/recent-orders",
  AWAITING_APPROVAL: "/recent-orders/awaiting-approval",
  APPROVAL_DETAIL: "/recent-orders/awaiting-approval/:id",
};
