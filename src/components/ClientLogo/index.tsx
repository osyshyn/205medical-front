import React, { FC } from "react";
import { Link } from "react-router-dom";
import useUserStore from "src/stores/user-store";
import { PATHNAMES } from "src/constants/routes";

const ALT_TEXT_LOGO_IMG = "Client logo";

interface Props {
  linkHref?: string;
}

export const ClientLogo: FC<Props> = ({ linkHref }) => {
  const logoImg = useUserStore((state) => state.logo);

  return (
    <div>
      <Link to={linkHref || PATHNAMES.DASHBOARD}>
        <img src={logoImg} alt={ALT_TEXT_LOGO_IMG} />
      </Link>
    </div>
  );
};
