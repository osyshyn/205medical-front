import React, { FC } from "react";
import { Link } from "react-router-dom";
import useUserStore from "src/stores/user-store";
import { PATHNAMES } from "src/constants/routes";

interface Props {
  linkHref?: string;
}

export const ClientLogo: FC<Props> = ({ linkHref }) => {
  const { path, type } = useUserStore((state) => state.user.logo);

  return (
    <div>
      <Link to={linkHref || PATHNAMES.DASHBOARD}>
        <img src={path} alt={type} />
      </Link>
    </div>
  );
};
