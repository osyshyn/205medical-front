import React, { FC } from "react";
// import logoImg from "src/assets/images/logo.png";
import { PATHNAMES } from "src/constants/routes";
import { Link } from "../Link";

const ALT_TEXT_LOGO_IMG = "Bussiness Clone";

interface Props {
  linkHref?: string;
}

export const Logo: FC<Props> = ({ linkHref }) => (
  <div>
    <Link href={linkHref || PATHNAMES.DASHBOARD}>
      <img
        // src={logoImg}
        alt={ALT_TEXT_LOGO_IMG}
      />
    </Link>
  </div>
);
