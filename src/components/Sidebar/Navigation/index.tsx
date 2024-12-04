import { FC } from "react";
import useUserStore from "src/stores/user-store";
import { USER_NAV_ITEMS } from "./constants";
import { NavigationItem } from "./NavigationItem";

interface Props {
  isSidebarCollapsed: boolean;
}

export const Navigation: FC<Props> = ({ isSidebarCollapsed }) => {
  const role = useUserStore((state) => state.user.role);

  return (
    <nav>
      <ul className="flex flex-col gap-4">
        {USER_NAV_ITEMS[role].map(({ id, ...item }) => (
          <NavigationItem
            key={id}
            item={item}
            isSidebarCollapsed={isSidebarCollapsed}
          />
        ))}
      </ul>
    </nav>
  );
};
