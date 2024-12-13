import { FC, useState } from "react";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { ReactComponent as FilterIcon } from "src/assets/icons/filter.svg";
import { IOptionSelect } from "src/@types/form";
import { Dropdown } from "../Dropdown";
import { Loader } from "../Loader";
import { CheckOption } from "./CheckOption";

interface Props {
  queryKey: string;
  items: IOptionSelect[];
  isLoading?: boolean;
}

export const FilterButton: FC<Props> = ({ queryKey, items, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);

  const head = (
    <Button className="gap-2.5 px-4 py-2.5" variant={ButtonVariants.WHITE}>
      <FilterIcon />
      <span>Filter</span>
    </Button>
  );

  return (
    <Dropdown
      head={head}
      bodyClassName="bg-white-base top-15 z-10 rounded-10 p-8 border"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <ul className="flex flex-col gap-2">
          {items?.map((item) => (
            <CheckOption key={item.value} option={item} queryKey={queryKey} />
          ))}
        </ul>
      )}
    </Dropdown>
  );
};
