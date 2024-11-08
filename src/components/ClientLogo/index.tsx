import React, { FC } from "react";
import { PATHNAMES } from "src/constants/routes";
import { Link } from "../Link";
import logoImg from "./temp_logo.png";

const ALT_TEXT_LOGO_IMG = "Client logo";

interface Props {
  linkHref?: string;
}

export const ClientLogo: FC<Props> = ({ linkHref }) => (
  <div>
    <Link href={linkHref || PATHNAMES.DASHBOARD}>
      <img
        src={logoImg}
        alt={ALT_TEXT_LOGO_IMG}
      />
    </Link>
  </div>
);
