import React, { FC } from "react";
import logoImg from "src/assets/images/logo.png";
import { PATHNAMES } from "src/constants/routes";
import { Link } from "react-router-dom";

const ALT_TEXT_LOGO_IMG = "205Medical";

interface Props {
  linkHref?: string;
}

export const Logo: FC<Props> = ({ linkHref }) => (
  <div>
    <Link to={linkHref || PATHNAMES.DASHBOARD}>
      <img
        src={logoImg}
        alt={ALT_TEXT_LOGO_IMG}
      />
    </Link>
  </div>
);
