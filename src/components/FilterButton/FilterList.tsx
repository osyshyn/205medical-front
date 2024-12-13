import { FC } from "react";
import { useQueryParams } from "src/hooks/useQueryParams";
import { CheckOption } from "./CheckOption";
import { IFilterList } from "./types";

interface Props {
  queryKey: string;
  list: IFilterList;
}

export const FilterList: FC<Props> = ({ queryKey, list: { title, items } }) => {
  const { getQueryParam } = useQueryParams();

  const activeCategories = getQueryParam(queryKey)?.split(",") || [];

  return (
    <ul className="flex flex-col gap-2">
      <li>{title}</li>
      {items?.map((item) => (
        <CheckOption
          key={item.value}
          isActive={activeCategories.includes(String(item.value))}
          value={item.value.toString()}
          queryKey={queryKey}
        />
      ))}
    </ul>
  );
};
