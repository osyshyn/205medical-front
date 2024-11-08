import { PATHNAMES } from "src/constants/routes";
import { ReactComponent as ChatIcon } from "src/assets/icons/sidebar/chat.svg";
import { ReactComponent as DashboardIcon } from "src/assets/icons/sidebar/dashboard.svg";
import { ReactComponent as LocationIcon } from "src/assets/icons/sidebar/location.svg";
import { ReactComponent as OrderIcon } from "src/assets/icons/sidebar/order.svg";
import { ReactComponent as ProductIcon } from "src/assets/icons/sidebar/product.svg";
import { ReactComponent as SettingsIcon } from "src/assets/icons/sidebar/settings.svg";
import { ReactComponent as ShipmentsIcon } from "src/assets/icons/sidebar/shipments.svg";
import { Users } from "src/@types/users";
import { ISidebarNavigationItem } from "./types";

const SUB_USER_NAV_ITEMS: ISidebarNavigationItem[] = [
  { id: 1, icon: DashboardIcon, label: "Dashboard", href: PATHNAMES.DASHBOARD },
  {
    id: 2,
    icon: OrderIcon,
    label: "Create an Order",
    href: PATHNAMES.CREATE_ORDER,
  },
  { id: 3, icon: ProductIcon, label: "Products", href: PATHNAMES.PRODUCT },
  { id: 4, icon: ShipmentsIcon, label: "Shipments", href: PATHNAMES.SHIPMENTS },
  { id: 5, icon: LocationIcon, label: "Locations", href: PATHNAMES.LOCATION },
  { id: 6, icon: ChatIcon, label: "Chat", href: PATHNAMES.CHAT },
  { id: 7, icon: SettingsIcon, label: "Settings", href: PATHNAMES.SETTINGS },
];

const CLIENT_ADMIN_NAV_ITEMS: ISidebarNavigationItem[] = [];
const MEDICAL_NAV_ITEMS: ISidebarNavigationItem[] = [];

export const USER_NAV_ITEMS: Record<Users, ISidebarNavigationItem[]> = {
  [Users.SUB_USER]: SUB_USER_NAV_ITEMS,
  [Users.CLIENT_ADMIN]: CLIENT_ADMIN_NAV_ITEMS,
  [Users.MEDICAL]: MEDICAL_NAV_ITEMS,
};
