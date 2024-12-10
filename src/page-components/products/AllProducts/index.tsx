import React, { FC, useEffect } from "react";
import { Outlet } from "react-router";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { Table, TableBody, TableHeader } from "src/components/Table";
import { Title } from "src/components/Title";
import { Window } from "src/components/Window";
import useCartStore from "src/stores/cart-store";
import useProductStore from "src/stores/product-store";
import { ReactComponent as FilterIcon } from "src/assets/icons/filter.svg";
import { Row } from "src/@types/table";
import { ALL_PRODUCTS_COLUMNS, getTableItems } from "./constants";

export const AllProducts: FC = () => {
  const loadProducts = useProductStore((state) => state.fetchProducts);
  const products = useProductStore((state) => state.products);
  const isLoading = useProductStore((state) => state.isLoadingProducts);
  const fetchCart = useCartStore((state) => state.fetchCart);

  useEffect(() => {
    loadProducts();
    fetchCart();
  }, [fetchCart, loadProducts]);

  const items = getTableItems(products) as unknown as Row[];

  return (
    <Window>
      <div className="flex items-start justify-between">
        <Title
          title="All Products"
          subtitle="Lorem ipsum dolor sit amet consectetur. Magna aliquet nam vestibulum"
        />

        <Button className="gap-2.5 px-4 py-2.5" variant={ButtonVariants.WHITE}>
          <FilterIcon />
          <span>Filter</span>
        </Button>
      </div>

      <Table
        className="scrollbar max-h-150 overflow-y-scroll"
        ariaLabel="All product table"
      >
        <TableHeader columns={ALL_PRODUCTS_COLUMNS} />
        <TableBody
          items={items}
          columns={ALL_PRODUCTS_COLUMNS}
          isLoading={isLoading}
        />
      </Table>

      <Outlet />
    </Window>
  );
};
