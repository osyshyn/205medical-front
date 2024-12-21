import React, { FC } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import { getItemPath } from "src/utils/getItemPath";
import { PATHNAMES } from "src/constants/routes";
import { ReactComponent as ArrowGrayIcon } from "src/assets/icons/arrow-gray.svg";
import { ReactComponent as ArrowPurpleIcon } from "src/assets/icons/arrow-purple.svg";
import { ILocation } from "src/@types/location";

interface Props {
  isActive: boolean;
  location: ILocation;
}

export const LocationButton: FC<Props> = ({
  isActive,
  location: { name, id },
}) => (
  <Link
    className={cn("flex justify-between gap-5 border-b pb-3.5 pt-2.5", {
      "border-b-purple-base": isActive,
    })}
    to={getItemPath(PATHNAMES.LOCATION_ID, { id })}
  >
    <span
      className={cn("line-clamp-1 text-sm font-medium text-gray-regular", {
        "text-purple-base": isActive,
      })}
    >
      {name}
    </span>

    {isActive ? <ArrowPurpleIcon /> : <ArrowGrayIcon />}
  </Link>
);
