import React, { FC, useEffect } from "react";
import { Outlet } from "react-router";
import { Table, TableBody, TableHeader } from "src/components/Table";
import { Window } from "src/components/Window";
import useCartStore from "src/stores/cart-store";
import useProductStore from "src/stores/product-store";
import { ReactComponent as FilterIcon } from "src/assets/icons/filter.svg";
import { Button } from "../Button";
import { ButtonVariants } from "../Button/types";
import { Title } from "../Title";
import { addActionButtons, ALL_PRODUCTS_COLUMNS } from "./constants";

export const AllProducts: FC = () => {
  const loadProducts = useProductStore((state) => state.fetchProducts);
  const products = useProductStore((state) => state.all_products);
  const isLoading = useProductStore((state) => state.isLoadingProducts);
  const fetchCart = useCartStore((state) => state.fetchCart);

  useEffect(() => {
    loadProducts();
    fetchCart();
  }, [fetchCart, loadProducts]);

  const items = addActionButtons(products);

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

      <div className="scrollbar max-h-150 overflow-y-scroll">
        <Table ariaLabel="All product table">
          <TableHeader columns={ALL_PRODUCTS_COLUMNS} />
          <TableBody
            items={items}
            columns={ALL_PRODUCTS_COLUMNS}
            isLoading={isLoading}
          />
        </Table>
      </div>

      <Outlet />
    </Window>
  );
};
