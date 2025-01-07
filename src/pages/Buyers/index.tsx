import { FC, useEffect, useState } from "react";
import { Outlet } from "react-router";
import { getFilterList } from "src/page-components/create-order/CartProducts/AllProducts/constants";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { BUYERS_COLUMNS, getTableItems } from "src/components/Buyers/constants";
import { FilterButton } from "src/components/FilterButton";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import { ModalWindow } from "src/components/ModalWindow";
import { Show } from "src/components/PrivateRoute/Show";
import { Table, TableBody, TableHeader } from "src/components/Table";
import { Title } from "src/components/Title";
import { Window } from "src/components/Window";
import useCategoryStore from "src/stores/category-store";
import useOrderStore from "src/stores/order-store";
import useUserStore from "src/stores/user-store";
import { Row } from "src/@types/table";
import { TypesUsers } from "src/@types/users";
import { AddBuyers } from "./AddBuyers";

export const Buyers: FC = () => {
  const loadUsers = useUserStore((state) => state.getAllUsers);
  const isLoading = useOrderStore((state) => state.isLoading);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const users = useUserStore((state) => state.users);

  const items = getTableItems(users) as unknown as Row[];

  const categories = useCategoryStore(
    (state) => state.user_products_categories
  );

  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <PageWrapper mainClassName="flex flex-col gap-10">
      <Show onlyFor={TypesUsers.MEDICAL && TypesUsers.CLIENT_ADMIN}>
        <div className="flex w-full justify-end">
          <Button
            className="px-5 py-2"
            variant={ButtonVariants.PRIMARY}
            onClick={onOpen}
          >
            Add User
          </Button>
        </div>
      </Show>

      <div>
        <div className="flex">
          <FilterButton list={getFilterList(categories)} isLoading={false} />
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
      <ModalWindow
        isOpen={isOpen}
        onClose={onClose}
        className="w-3/4"
        closeButtonClassName="!bg-white-base rounded-full  shadow-md"
      >
        <AddBuyers />
      </ModalWindow>
    </PageWrapper>
  );
};
