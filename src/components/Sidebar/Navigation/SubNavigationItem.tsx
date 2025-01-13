import { FC } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import cn from "classnames";
import { ISubNavigationItemProps } from "./types";

export const SubNavigationItem: FC<ISubNavigationItemProps> = ({
  href,
  label,
}) => {
  const { pathname } = useLocation();
  const isActive = pathname === href;

  return (
    <li className="flex justify-start pl-10">
      <Link
        className={cn("w-50 font-medium text-black-ligth", {
          "text-purple-base": isActive,
        })}
        to={href}
      >
        {label}
      </Link>
    </li>
  );
};
