import React, { FC, useEffect, useState } from "react";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { ModalWindow } from "src/components/ModalWindow";
import { SelectDropdownList } from "src/components/SelectDropdownList";
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

  const loadAllList = useProductListStore((state) => state.fetchAllList);
  const allList = useProductListStore((state) => state.allListId);

  const saveList = useProductListStore((state) => state.saveList);
  const activateList = useProductListStore((state) => state.activateList);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedListId, setSelectedListId] = useState<number | null>(null);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  useEffect(() => {
    activateList(selectedListId);
    loadAllList();
    loadList();
  }, [loadList, loadAllList, selectedListId]);

  const product_to_lists = list?.product_to_lists || [];
  const listId = list?.id;
  const items = getTableItems(product_to_lists, listId) as unknown as Row[];

  const handleSaveList = () => saveList(list?.id);

  const options = allList.map((listItem: { id: number; name: string }) => ({
    value: listItem.id,
    label: listItem.name || `List ${listItem.id}`,
  }));

  const [activeOption, setActiveOption] = useState(
    options.find((opt) => opt.value === selectedListId) || null
  );

  const handleOptionChange = (option: { value: number; label: string }) => {
    setSelectedListId(option.value);
    setActiveOption(option);
    console.log("Selected List ID:", option.value);
  };

  return (
    <Window>
      <div className="mb-5 flex w-full items-center justify-between">
        <Title
          title="Products"
          subtitle="Lorem ipsum dolor sit amet consectetur. Magna aliquet nam vestibulum"
        />

        <SelectDropdownList
          options={options}
          activeOption={activeOption}
          setOption={handleOptionChange}
          headLabel="Saved purchase list"
        />
      </div>

      <div className="scrollbar max-h-162.5 overflow-y-scroll">
        <Table ariaLabel="Products">
          <TableHeader columns={CART_PRODUCTS_COLUMNS} />
          <TableBody
            items={items}
            columns={CART_PRODUCTS_COLUMNS}
            isLoading={isLoading}
          />
        </Table>

        <div className="mb-1 mt-10 flex gap-7">
          <Button
            className="h-7 w-40 rounded-20"
            variant={ButtonVariants.SECONDARY_SQUARE}
            onClick={onOpen}
          >
            Add New Item
          </Button>

          <Button
            className="h-7 w-48 rounded-20"
            variant={ButtonVariants.SECONDARY_SQUARE}
            onClick={handleSaveList}
          >
            Save Purchase List
          </Button>
        </div>

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
