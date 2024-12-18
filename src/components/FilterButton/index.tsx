import { FC, useState } from "react";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { ReactComponent as FilterIcon } from "src/assets/icons/filter.svg";
import { Dropdown } from "../Dropdown";
import { Loader } from "../Loader";
import { FilterList } from "./FilterList";
import { IFilterList } from "./types";

interface Props {
  className?: string;
  list: IFilterList[];
  isLoading?: boolean;
}

export const FilterButton: FC<Props> = ({ className, list, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);

  const head = (
    <Button className="gap-2.5 px-4 py-2.5" variant={ButtonVariants.WHITE}>
      <FilterIcon />
      <span>Filter</span>
    </Button>
  );

  return (
    <div className={className}>
      <Dropdown
        head={head}
        bodyClassName="bg-white-base top-15 z-10 rounded-10 p-8 border w-max"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-col gap-3">
            {list.map((item) => (
              <FilterList key={item.queryKey} {...item} />
            ))}
          </div>
        )}
      </Dropdown>
    </div>
  );
};
