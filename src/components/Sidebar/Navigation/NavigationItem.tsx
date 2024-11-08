import { FC } from "react";
import { useLocation } from "react-router";
import cn from "classnames";
import { Link } from "../../Link";
import { INavigationItemProps } from "./types";

export const NavigationItem: FC<INavigationItemProps> = ({
  href,
  label,
  icon: Icon,
}) => {
  const { pathname } = useLocation();
  const isActive = pathname === href;

  return (
    <Link
      className={cn("flex gap-3.5 rounded-lg p-3", {
        "bg-purple-base": isActive,
      })}
      href={href}
    >
      <Icon
        className={cn("h-6 w-6", {
          "stroke-white-base": isActive,
        })}
      />
      <span
        className={cn("text-gray-ligth", {
          "text-white-base": isActive,
        })}
      >
        {label}
      </span>
    </Link>
  );
};
