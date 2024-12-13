import React, { FC, useEffect } from "react";
import { Outlet } from "react-router";
import { FilterButton } from "src/components/FilterButton";
import { Table, TableBody, TableHeader } from "src/components/Table";
import { Title } from "src/components/Title";
import { Window } from "src/components/Window";
import { useQueryParams } from "src/hooks/useQueryParams";
import useCartStore from "src/stores/cart-store";
import useCategoryStore from "src/stores/category-store";
import useProductStore from "src/stores/product-store";
import { QUERY_PARAM_KEYS } from "src/constants/queryParams";
import { Row } from "src/@types/table";
import {
  ALL_PRODUCTS_COLUMNS,
  getFilterList,
  getTableItems,
} from "./constants";

export const AllProducts: FC = () => {
  const loadProducts = useProductStore((state) => state.fetchProducts);
  const products = useProductStore((state) => state.products);
  const isLoadingProducts = useProductStore((state) => state.isLoadingProducts);

  const loadCategories = useCategoryStore((state) => state.fetchCategories);
  const categories = useCategoryStore(
    (state) => state.user_products_categories
  );
  const isLoadingCategories = useCategoryStore((state) => state.isLoading);

  const fetchCart = useCartStore((state) => state.fetchCart);

  const { getQueryParam } = useQueryParams();

  const category_ids = getQueryParam(QUERY_PARAM_KEYS.CATEGORIES) || "";

  useEffect(() => {
    loadProducts(category_ids);
    fetchCart();
  }, [category_ids, fetchCart, loadProducts]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const items = getTableItems(products) as unknown as Row[];

  return (
    <Window>
      <div className="flex items-start justify-between">
        <Title
          title="All Products"
          subtitle="Lorem ipsum dolor sit amet consectetur. Magna aliquet nam vestibulum"
        />

        <FilterButton
          queryKey={QUERY_PARAM_KEYS.CATEGORIES}
          list={getFilterList(categories)}
          isLoading={isLoadingCategories}
        />
      </div>

      <Table
        className="scrollbar max-h-150 overflow-y-scroll"
        ariaLabel="All product table"
      >
        <TableHeader columns={ALL_PRODUCTS_COLUMNS} />
        <TableBody
          items={items}
          columns={ALL_PRODUCTS_COLUMNS}
          isLoading={isLoadingProducts}
        />
      </Table>

      <Outlet />
    </Window>
  );
};
