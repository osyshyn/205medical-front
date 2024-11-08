import { Users } from "src/@types/users";
import { USER_NAV_ITEMS } from "./constants";
import { NavigationItem } from "./NavigationItem";

//temp
const current_user = Users.SUB_USER;

export const Navigation = () => (
  <nav>
    <ul className="flex flex-col gap-4 px-7">
      {USER_NAV_ITEMS[current_user].map(({ id, ...nav }) => (
        <li key={id}>
          <NavigationItem {...nav} />
        </li>
      ))}
    </ul>
  </nav>
);
