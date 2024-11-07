import { PATHNAMES } from "src/constants/routes";
import { ReactComponent as ChatIcon } from "src/assets/icons/chat.svg";
import { ReactComponent as DashboardIcon } from "src/assets/icons/dashboard.svg";
import { ReactComponent as LocationsIcon } from "src/assets/icons/locations.svg";
import { ReactComponent as OrderIcon } from "src/assets/icons/order.svg";
import { ReactComponent as ProductsIcon } from "src/assets/icons/products.svg";
import { ReactComponent as SettingsIcon } from "src/assets/icons/settings.svg";
import { ReactComponent as ShipmentsIcon } from "src/assets/icons/shipments.svg";
import { Users } from "src/@types/users";
import { ISidebarNavigationItem } from "./types";

const SUB_USER_NAV_ITEMS: ISidebarNavigationItem[] = [
  { id: 1, icon: DashboardIcon, label: "Dashboard", href: PATHNAMES.DASHBOARD },
  {
    id: 2,
    icon: OrderIcon,
    label: "Create an Order",
    href: PATHNAMES.DASHBOARD,
  },
  { id: 3, icon: ProductsIcon, label: "Products", href: PATHNAMES.DASHBOARD },
  { id: 4, icon: ShipmentsIcon, label: "Shipments", href: PATHNAMES.DASHBOARD },
  { id: 5, icon: LocationsIcon, label: "Locations", href: PATHNAMES.DASHBOARD },
  { id: 6, icon: ChatIcon, label: "Chat", href: PATHNAMES.DASHBOARD },
  { id: 7, icon: SettingsIcon, label: "Settings", href: PATHNAMES.DASHBOARD },
];

const CLIENT_ADMIN_NAV_ITEMS: ISidebarNavigationItem[] = [];
const MEDICAL_NAV_ITEMS: ISidebarNavigationItem[] = [];

export const USER_NAV_ITEMS: Record<Users, ISidebarNavigationItem[]> = {
  [Users.SUB_USER]: SUB_USER_NAV_ITEMS,
  [Users.CLIENT_ADMIN]: CLIENT_ADMIN_NAV_ITEMS,
  [Users.MEDICAL]: MEDICAL_NAV_ITEMS,
};
