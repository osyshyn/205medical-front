import { FC, useState } from "react";
import { Button } from "src/components/Button";
import { ButtonVariants } from "src/components/Button/types";
import { ReactComponent as FilterIcon } from "src/assets/icons/filter.svg";
import { ICategory } from "src/@types/categories";
import { Dropdown } from "../Dropdown";

interface Props {
  items: ICategory[];
}

export const FilterButton: FC<Props> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const head = (
    <Button className="gap-2.5 px-4 py-2.5" variant={ButtonVariants.WHITE}>
      <FilterIcon />
      <span>Filter</span>
    </Button>
  );

  return (
    <div>
      <Dropdown
        head={head}
        bodyClassName="bg-white-base top-15 z-10 rounded-10 p-8 border"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <ul className="flex flex-col gap-2">
          {items.map((item) => (
            <p key={item.id} className="text-sm">
              {item.name}
            </p>
          ))}
        </ul>
      </Dropdown>
    </div>
  );
};
