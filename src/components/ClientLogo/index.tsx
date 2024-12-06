import React, { FC } from "react";
import { Link } from "react-router-dom";
import useUserStore from "src/stores/user-store";
import { PATHNAMES } from "src/constants/routes";

interface Props {
  linkHref?: string;
}

export const ClientLogo: FC<Props> = ({ linkHref }) => {
  const { logo, first_name, last_name } = useUserStore((state) => state.user);

  const altText = `${first_name} ${last_name} logo`;

  return (
    <div>
      <Link to={linkHref || PATHNAMES.DASHBOARD}>
        <img src={logo.path} alt={altText} />
      </Link>
    </div>
  );
};
