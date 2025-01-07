import React, { FC, useEffect, useState } from "react";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { ModalWindow } from "src/components/ModalWindow";
import { Table, TableBody, TableHeader } from "src/components/Table";
import { Title } from "src/components/Title";
import { Window } from "src/components/Window";
import useModalWindowStore from "src/stores/modal-window-store";
import useProductListStore from "src/stores/product-list-store";
import { Row } from "src/@types/table";
import { AllProducts } from "./AllProducts";
import { CART_PRODUCTS_COLUMNS, getTableItems } from "./constants";

export const CartProducts: FC = () => {
  const isOpenProductItem = useModalWindowStore(
    (state) => state.isOpenProductItem
  );

  const loadList = useProductListStore((state) => state.fetchList);
  const list = useProductListStore((state) => state.list);
  const isLoading = useProductListStore((state) => state.isLoading);

  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    loadList();
  }, [loadList]);

  const product_to_lists = list?.product_to_lists || [];
  const listId = list.id;

  const items = getTableItems(product_to_lists, listId) as unknown as Row[];

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

        <Button
          className="mt-10"
          variant={ButtonVariants.SECONDARY_SQUARE}
          onClick={onOpen}
        >
          Add product
        </Button>

        <ModalWindow
          className="w-3/4"
          onClose={onClose}
          isOpen={isOpen}
          isActiveCloseClickOutside={!isOpenProductItem}
        >
          <AllProducts />
        </ModalWindow>
      </div>
    </Window>
  );
};
