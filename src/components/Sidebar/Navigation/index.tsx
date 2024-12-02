import useUserStore from "src/stores/user-store";
import { USER_NAV_ITEMS } from "./constants";
import { NavigationItem } from "./NavigationItem";

export const Navigation = () => {
  const role = useUserStore((state) => state.user.role);

  return (
    <nav>
      <ul className="flex flex-col gap-4">
        {USER_NAV_ITEMS[role].map(({ id, ...nav }) => (
          <NavigationItem key={id} {...nav} />
        ))}
      </ul>
    </nav>
  );
};
