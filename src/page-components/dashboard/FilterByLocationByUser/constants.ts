import { IFilterList } from "src/components/FilterButton/types";
import { QUERY_PARAM_KEYS } from "src/constants/queryParams";
import { ILocation } from "src/@types/location";
import { ISubUser } from "src/@types/users";

export const getFilterList = (
  locations: ILocation[],
  subUsers: ISubUser[]
): IFilterList[] => [
  {
    title: "Locations",
    items: locations?.map((location) => ({
      value: location.id,
      label: location.name,
    })),
    queryKey: QUERY_PARAM_KEYS.LOCATIONS,
  },
  {
    title: "Sub Users",
    items: subUsers?.map((subUser) => ({
      value: subUser.id,
      label: `${subUser.first_name} ${subUser.last_name}`,
    })),
    queryKey: QUERY_PARAM_KEYS.SUB_USERS,
  },
];
