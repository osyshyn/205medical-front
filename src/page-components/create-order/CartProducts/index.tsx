import React, { FC, useEffect } from "react";
import { Table, TableBody, TableHeader } from "src/components/Table";
import { Title } from "src/components/Title";
import { Window } from "src/components/Window";
import useCartStore from "src/stores/cart-store";
import { Row } from "src/@types/table";
import { CART_PRODUCTS_COLUMNS, getTableItems } from "./constants";

export const CartProducts: FC = () => {
  const loadCartProduct = useCartStore((state) => state.fetchCartProduct);
  const isLoading = useCartStore((state) => state.isLoadingCartProduct);
  const cartProducts = useCartStore((state) => state.cart_products);

  useEffect(() => {
    loadCartProduct();
  }, [loadCartProduct]);

  const items = getTableItems(cartProducts) as unknown as Row[];

  return (
    <Window>
      <Title
        title="Products"
        subtitle="Lorem ipsum dolor sit amet consectetur. Magna aliquet nam vestibulum"
      />

      <div className="scrollbar max-h-162.5 overflow-y-scroll">
        <Table ariaLabel="Products">
          <TableHeader columns={CART_PRODUCTS_COLUMNS} />
          <TableBody
            items={items}
            columns={CART_PRODUCTS_COLUMNS}
            isLoading={isLoading}
          />
        </Table>
      </div>
    </Window>
  );
};
