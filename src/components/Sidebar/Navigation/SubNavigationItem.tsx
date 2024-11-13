import { FC } from "react";
import { useLocation } from "react-router";
import cn from "classnames";
import { Link } from "src/components/Link";
import { ISubNavigationItemProps } from "./types";

export const SubNavigationItem: FC<ISubNavigationItemProps> = ({
  href,
  label,
}) => {
  const { pathname } = useLocation();
  const isActive = pathname === href;

  return (
    <Link
      className={cn("flex justify-center pt-4 font-medium text-black-ligth", {
        "text-purple-base": isActive,
      })}
      href={href}
    >
      {label}
    </Link>
  );
};
