import useSidebarStore from "src/stores/siderbar-store";
import useUserStore from "src/stores/user-store";
import { USER_NAV_ITEMS } from "./constants";
import { NavigationItem } from "./NavigationItem";

export const Navigation = () => {
  const role = useUserStore((state) => state.user.role);
  const isSidebarCollapsed = useSidebarStore((state) => state.isCartOpen);

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
