import { PATHNAMES } from "src/constants/routes";
import { ReactComponent as ChatActiveIcon } from "src/assets/icons/sidebar/navigation/chat-active.svg";
import { ReactComponent as ChatIcon } from "src/assets/icons/sidebar/navigation/chat.svg";
import { ReactComponent as CreateOrderActiveIcon } from "src/assets/icons/sidebar/navigation/create-order-active.svg";
import { ReactComponent as CreateOrderIcon } from "src/assets/icons/sidebar/navigation/create-order.svg";
import { ReactComponent as DashboardActiveIcon } from "src/assets/icons/sidebar/navigation/dashboard-active.svg";
import { ReactComponent as DashboardIcon } from "src/assets/icons/sidebar/navigation/dashboard.svg";
import { ReactComponent as LocationActiveIcon } from "src/assets/icons/sidebar/navigation/location-active.svg";
import { ReactComponent as LocationIcon } from "src/assets/icons/sidebar/navigation/location.svg";
import { ReactComponent as ProductActiveIcon } from "src/assets/icons/sidebar/navigation/product-active.svg";
import { ReactComponent as ProductIcon } from "src/assets/icons/sidebar/navigation/product.svg";
import { ReactComponent as SettingsActiveIcon } from "src/assets/icons/sidebar/navigation/settings-active.svg";
import { ReactComponent as SettingsIcon } from "src/assets/icons/sidebar/navigation/settings.svg";
import { ReactComponent as ShipmentsActiveIcon } from "src/assets/icons/sidebar/navigation/shipments-active.svg";
import { ReactComponent as ShipmentsIcon } from "src/assets/icons/sidebar/navigation/shipments.svg";
import { TypesUsers } from "src/@types/users";
import { INavigationItem } from "./types";

const SUB_USER_NAV_ITEMS: INavigationItem[] = [
  {
    id: 1,
    icon: DashboardIcon,
    label: "Dashboard",
    href: PATHNAMES.DASHBOARD,
    iconActive: DashboardActiveIcon,
  },
  {
    id: 2,
    icon: CreateOrderIcon,
    label: "Create an Order",
    href: PATHNAMES.CREATE_ORDER,
    iconActive: CreateOrderActiveIcon,
    subNavItems: [
      {
        id: 1,
        label: "Order alerts",
        href: PATHNAMES.ORDER_ALERTS,
      },
    ],
  },
  {
    id: 3,
    icon: ProductIcon,
    label: "Products",
    href: PATHNAMES.PRODUCT,
    iconActive: ProductActiveIcon,
    subNavItems: [
      {
        id: 1,
        label: "Purchase History",
        href: PATHNAMES.PRODUCT_HISTORY,
      },
      {
        id: 2,
        label: "Purchases by Product",
        href: PATHNAMES.PRODUCT_PURCHASES,
      },
    ],
  },
  {
    id: 4,
    icon: ShipmentsIcon,
    label: "Shipments",
    href: PATHNAMES.SHIPMENTS,
    iconActive: ShipmentsActiveIcon,
    subNavItems: [
      {
        id: 1,
        label: "Shipment alerts",
        href: PATHNAMES.SHIPMENT_ALERTS,
      },
    ],
  },
  {
    id: 5,
    icon: LocationIcon,
    label: "Locations",
    href: PATHNAMES.LOCATION,
    iconActive: LocationActiveIcon,
  },
  {
    id: 6,
    icon: ChatIcon,
    label: "Chat",
    href: PATHNAMES.CHAT,
    iconActive: ChatActiveIcon,
  },
  {
    id: 7,
    icon: SettingsIcon,
    label: "Settings",
    href: PATHNAMES.SETTINGS,
    iconActive: SettingsActiveIcon,
  },
];

const CLIENT_ADMIN_NAV_ITEMS: INavigationItem[] = [
  {
    id: 1,
    icon: DashboardIcon,

    label: "Dashboard",
    href: PATHNAMES.DASHBOARD,
    iconActive: DashboardActiveIcon,
  },
  {
    id: 2,
    icon: DashboardIcon,
    label: "Dashboard",
    href: PATHNAMES.RECENT_ORDERS,
    iconActive: DashboardActiveIcon,
    subNavItems: [
      {
        id: 1,
        label: "AWAITING APPROVAL",
        href: PATHNAMES.AWAITING_APPROVAL,
      },
    ],
  },
  {
    id: 3,
    icon: DashboardIcon,
    label: "Buyers",
    href: PATHNAMES.BUYERS,
    iconActive: DashboardActiveIcon,
  },
];

const MEDICAL_NAV_ITEMS: INavigationItem[] = [];

export const USER_NAV_ITEMS: Record<TypesUsers, INavigationItem[]> = {
  [TypesUsers.SUB_USER]: SUB_USER_NAV_ITEMS,
  [TypesUsers.CLIENT_ADMIN]: CLIENT_ADMIN_NAV_ITEMS,
  [TypesUsers.MEDICAL]: MEDICAL_NAV_ITEMS,
};
