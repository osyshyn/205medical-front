import { FC, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  COMPANY_TABLE_COLUMNS,
  getTableItems,
} from "src/page-components/companies/constant";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import { Table, TableBody, TableHeader } from "src/components/Table";
import { Title } from "src/components/Title";
import { Window } from "src/components/Window";
import useCompanyStore from "src/stores/company-store";
import { PATHNAMES } from "src/constants/routes";
import { Row } from "src/@types/table";

export const Companies: FC = () => {
  const { companies, fetchCompanies } = useCompanyStore();

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  // Check if companies are available
  const items = companies ? getTableItems(companies) : [];

  console.log("Companies: ", companies);

  return (
    <PageWrapper>
      <Title title="Companies" subtitle="" />
      <Link to={PATHNAMES.COMPANY_ONBOARDING}>
        <Button variant={ButtonVariants.PRIMARY}>
          <span>Add Company</span>
        </Button>
      </Link>

      <Window>
        <Table>
          <TableHeader columns={COMPANY_TABLE_COLUMNS} />
          <TableBody columns={COMPANY_TABLE_COLUMNS} items={items} />
        </Table>
      </Window>

      <Outlet />
    </PageWrapper>
  );
};
