import { FC, useEffect, useState } from "react";
import { Outlet } from "react-router";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { BUYERS_COLUMNS, getTableItems } from "src/components/Buyers/constants";
import { FilterButton } from "src/components/FilterButton";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import { SelectDate } from "src/components/SelectDate";
import { Table, TableBody, TableHeader } from "src/components/Table";
import { Title } from "src/components/Title";
import { Window } from "src/components/Window";
import useOrderStore from "src/stores/order-store";
import useUserStore from "src/stores/user-store";
import { ReactComponent as FilterIcon } from "src/assets/icons/filter.svg";
import { Row } from "src/@types/table";

export const Buyers: FC = () => {
  const loadUsers = useUserStore((state) => state.getAllUsers);
  const isLoading = useOrderStore((state) => state.isLoading);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const users = useUserStore((state) => state.users);

  const items = getTableItems(users) as unknown as Row[];

  return (
    <PageWrapper mainClassName="flex flex-col gap-10">
      <div>
        <div className="flex">
          <FilterButton items={[]} isLoading={isLoading} />
          {/* <Button
            variant={ButtonVariants.WHITE}
            className="gap-2.5 px-4 py-2.5"
          >
            <FilterIcon />
            <span>Filter</span>
          </Button> */}
        </div>

        <Window className="mt-6">
          <div className="flex items-start justify-between">
            <Title title="Users" subtitle="" />
          </div>
          <Table>
            <TableHeader columns={BUYERS_COLUMNS} />
            <TableBody items={items} columns={BUYERS_COLUMNS} />
          </Table>
        </Window>
      </div>
      <Outlet />
    </PageWrapper>
  );
};
