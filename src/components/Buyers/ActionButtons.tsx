import { FC } from "react";
import { Link } from "react-router-dom";
import { getItemPath } from "src/utils/getItemPath";
import { PATHNAMES } from "src/constants/routes";
import { ReactComponent as MessageIcon } from "src/assets/icons/message.svg";
import { Button } from "../Button";
import { ButtonVariants } from "../Button/types";

interface Props {
  id: number;
}

export const ActionsButtons: FC<Props> = ({ id }) => {
  return (
    <div className="max-w flex justify-center gap-2">
      <Link to={getItemPath(PATHNAMES.BUYER_ITEM, { id })}>
        <Button variant={ButtonVariants.PRIMARY_SQUARE}>View</Button>
      </Link>

      <Link to={getItemPath(PATHNAMES.EDIT_BUYER, { id })}>
        <Button variant={ButtonVariants.SECONDARY_SQUARE}>Edit</Button>
      </Link>

      <Button className="rounded-l bg-gray-500 px-2 py-2">
        <MessageIcon />
      </Button>
    </div>
  );
};
