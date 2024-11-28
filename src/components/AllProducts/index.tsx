import React, { FC } from "react";
import { Table, TableBody, TableHeader } from "src/components/Table";
import { Window } from "src/components/Window";
import { ReactComponent as FilterIcon } from "src/assets/icons/filter.svg";
import { Button } from "../Button";
import { ButtonVariants } from "../Button/types";
import { Title } from "../Title";
import { ALL_PRODUCTS_COLUMNS, ALL_PRODUCTS_DATA_TEMP } from "./constants";

export const AllProducts: FC = () => {
  return (
    <Window>
      <div className="flex items-start justify-between">
        <Title
          title="All Products"
          subtitle="Lorem ipsum dolor sit amet consectetur. Magna aliquet nam vestibulum"
        />

        <Button className="px-4 py-2.5 gap-2.5" variant={ButtonVariants.WHITE}>
          <FilterIcon />
          <span>Filter</span>
        </Button>
      </div>

      <Table ariaLabel="Recent orders table">
        <TableHeader columns={ALL_PRODUCTS_COLUMNS} />
        <TableBody
          items={ALL_PRODUCTS_DATA_TEMP}
          columns={ALL_PRODUCTS_COLUMNS}
        />
      </Table>
    </Window>
  );
};
