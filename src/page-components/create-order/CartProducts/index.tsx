import React, { FC } from "react";
import { Table, TableBody, TableHeader } from "src/components/Table";
import { Title } from "src/components/Title";
import { Window } from "src/components/Window";
import {
  CART_PRODUCTS_COLUMNS,
  DATA_FROM_SERVER,
  getTableItems,
} from "./constants";

export const CartProducts: FC = () => {
  const items = getTableItems(DATA_FROM_SERVER);

  return (
    <Window>
      <Title
        title="Products"
        subtitle="Lorem ipsum dolor sit amet consectetur. Magna aliquet nam vestibulum"
      />

      <div className="scrollbar max-h-162.5 overflow-y-scroll">
        <Table ariaLabel="Products">
          <TableHeader columns={CART_PRODUCTS_COLUMNS} />
          <TableBody items={items} columns={CART_PRODUCTS_COLUMNS} />
        </Table>
      </div>
    </Window>
  );
};
