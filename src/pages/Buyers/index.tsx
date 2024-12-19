import { FC, useEffect } from "react";
import { Outlet } from "react-router";
import { getFilterList } from "src/page-components/create-order/CartProducts/AllProducts/constants";
import { BUYERS_COLUMNS, getTableItems } from "src/components/Buyers/constants";
import { FilterButton } from "src/components/FilterButton";
import { PageWrapper } from "src/components/Layouts/PageWrapper";
import { Table, TableBody, TableHeader } from "src/components/Table";
import { Title } from "src/components/Title";
import { Window } from "src/components/Window";
import useCategoryStore from "src/stores/category-store";
import useOrderStore from "src/stores/order-store";
import useUserStore from "src/stores/user-store";
import { Row } from "src/@types/table";

export const Buyers: FC = () => {
  const loadUsers = useUserStore((state) => state.getAllUsers);
  const isLoading = useOrderStore((state) => state.isLoading);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const users = useUserStore((state) => state.users);

  console.log("users: ", users);

  const items = getTableItems(users) as unknown as Row[];

  const categories = useCategoryStore(
    (state) => state.user_products_categories
  );

  return (
    <PageWrapper mainClassName="flex flex-col gap-10">
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
    </PageWrapper>
  );
};
