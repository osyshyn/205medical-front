import { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import useCompanyStore from "src/stores/company-store";
import { getItemPath } from "src/utils/getItemPath";
import { PATHNAMES } from "src/constants/routes";
import { ReactComponent as TrashIcon } from "src/assets/icons/trash.svg";

interface Props {
  id: number;
}

export const ActionButtons: FC<Props> = ({ id }) => {
  const deleteCompany = useCompanyStore((state) => state.deleteCompany);
  const onClickDelete = () => {
    console.log(id);
    deleteCompany(id);
  };
  return (
    <div className="max-w flex justify-center gap-3">
      <Link to={getItemPath(PATHNAMES.EDIT_COMPANY, { id })}>
        <Button variant={ButtonVariants.PRIMARY_SQUARE}>Edit</Button>
      </Link>
      <Button variant={ButtonVariants.PRIMARY_SQUARE} onClick={onClickDelete}>
        <TrashIcon />
      </Button>
    </div>
  );
};
