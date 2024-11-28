import React, { FC } from "react";
import { Table, TableBody, TableHeader } from "src/components/Table";
import { Window } from "src/components/Window";
import { ReactComponent as FilterIcon } from "src/assets/icons/filter.svg";
import { Button } from "../Button";
import { ButtonVariants } from "../Button/types";
import { Title } from "../Title";
import { ALL_PRODUCTS_COLUMNS, ALL_PRODUCTS_DATA_TEMP } from "./constants";
import { ProductDetail } from "./ProductDetail";

export const AllProducts: FC = () => {
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
            items={ALL_PRODUCTS_DATA_TEMP}
            columns={ALL_PRODUCTS_COLUMNS}
          />
        </Table>
      </div>

      <ProductDetail />
    </Window>
  );
};
