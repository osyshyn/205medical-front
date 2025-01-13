import React, { FC, useEffect } from "react";
import { is } from "date-fns/locale";
import { FilterButton } from "src/components/FilterButton";
import useLocationStore from "src/stores/location-store";
import useProductStore from "src/stores/product-store";
import useUserStore from "src/stores/user-store";
import { getFilterList } from "./constants";

interface FilterByLocationByUserProps {
  includeProductFilters?: boolean;
}

export const FilterByLocationByUser: FC<FilterByLocationByUserProps> = ({
  includeProductFilters = false,
}) => {
  const loadLocation = useLocationStore((state) => state.fetchLocation);
  const locations = useLocationStore((state) => state.locations);
  const isLoadingLocation = useLocationStore((state) => state.isLoadingFetch);

  const getSubUsers = useUserStore((state) => state.getSubUsers);
  const subUsers = useUserStore((state) => state.subUsers);
  const isLoadingSubUsers = useUserStore((state) => state.isLoadingSubUsers);

  const getProducts = useProductStore((state) => state.fetchProducts);
  const products = useProductStore((state) => state.products);
  const isLoadingProducts = useProductStore((state) => state.isLoadingProducts);

  useEffect(() => {
    loadLocation();
    getSubUsers();
    if (includeProductFilters) {
      getProducts();
    }
  }, [loadLocation, getSubUsers, getProducts, includeProductFilters]);

  const isLoading =
    isLoadingLocation ||
    isLoadingSubUsers ||
    (includeProductFilters && isLoadingProducts);
  const filterList = getFilterList(
    locations,
    subUsers,
    includeProductFilters ? products : [],
    includeProductFilters
  );

  return (
    <FilterButton className="w-max" list={filterList} isLoading={isLoading} />
  );
};
