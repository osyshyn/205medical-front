import React, { FC, useEffect } from "react";
import { FilterButton } from "src/components/FilterButton";
import useLocationStore from "src/stores/location-store";
import useUserStore from "src/stores/user-store";
import { getFilterList } from "./constants";

export const FilterByLocationByUser: FC = () => {
  const loadLocation = useLocationStore((state) => state.fetchLocation);
  const locations = useLocationStore((state) => state.locations);
  const isLoadingLocation = useLocationStore((state) => state.isLoadingFetch);

  const getSubUsers = useUserStore((state) => state.getSubUsers);
  const subUsers = useUserStore((state) => state.subUsers);
  const isLoadingSubUsers = useUserStore((state) => state.isLoadingSubUsers);

  useEffect(() => {
    loadLocation();
    getSubUsers();
  }, [loadLocation, getSubUsers]);

  return (
    <FilterButton
      className="w-max"
      list={getFilterList(locations, subUsers)}
      isLoading={isLoadingLocation || isLoadingSubUsers}
    />
  );
};
