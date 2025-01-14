import { FC } from "react";
import { Link, Outlet } from "react-router-dom";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { Title } from "src/components/Title";
import { PATHNAMES } from "src/constants/routes";

export const Companies: FC = () => {
  return (
    <div>
      <Title title="Companies" subtitle="" />
      <Link to={PATHNAMES.COMPANY_ONBOARDING}>
        <Button variant={ButtonVariants.PRIMARY}>
          <span>Add Company</span>
        </Button>
      </Link>
      <Outlet />
    </div>
  );
};
