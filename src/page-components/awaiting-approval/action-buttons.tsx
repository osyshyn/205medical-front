import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import useCartStore from "src/stores/cart-store";
import { getItemPath } from "src/utils/getItemPath";
import { PATHNAMES } from "src/constants/routes";

interface Props {
  id: number;
}

export const ActionsButtons: FC<Props> = ({ id }) => {
  return (
    <div className="max-w flex justify-center gap-3">
      <Link to={getItemPath(PATHNAMES.APPROVAL_DETAIL, { id })}>
        <Button variant={ButtonVariants.PRIMARY_SQUARE}>View PO</Button>
      </Link>
    </div>
  );
};
