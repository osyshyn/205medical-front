import { FC } from "react";
import { useLocation } from "react-router";
import cn from "classnames";
import { Link } from "src/components/Link";
import { ReactComponent as ArrowIcon } from "src/assets/icons/sidebar/navigation/arrow-white.svg";
import { INavigationItemProps } from "./types";

export const NavigationItem: FC<INavigationItemProps> = ({
  href,
  label,
  icon: Icon,
  iconActive: ActiveIcon,
}) => {
  const { pathname } = useLocation();
  const isActive = pathname === href;

  return (
    <Link
      className={cn("flex items-center justify-between rounded-lg p-3", {
        "bg-purple-base": isActive,
      })}
      href={href}
    >
      <div className="flex items-center gap-3">
        {isActive ? <ActiveIcon /> : <Icon className="h-6 w-6" />}

        <span
          className={cn("text-sm text-gray-ligth", {
            "text-white-base": isActive,
          })}
        >
          {label}
        </span>
      </div>

      {isActive && <ArrowIcon />}
    </Link>
  );
};