import { FC } from "react";
import { Link } from "react-router-dom";
import { getItemPath } from "src/utils/getItemPath";
import { PATHNAMES } from "src/constants/routes";
import { Button } from "../Button";
import { ButtonVariants } from "../Button/types";

interface Props {
  id: number;
}

export const ActionsButtons: FC<Props> = ({ id }) => {
  return (
    <div className="max-w flex justify-center gap-3">
      <Link to={getItemPath(PATHNAMES.BUYER_ITEM, { id })}>
        <Button variant={ButtonVariants.PRIMARY_SQUARE}>View</Button>
      </Link>

      <Button variant={ButtonVariants.SECONDARY_SQUARE}>Edit</Button>
    </div>
  );
};
