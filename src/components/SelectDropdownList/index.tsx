import React, { FC, useState } from "react";
import cn from "classnames";
import { ReactComponent as ArrowBottomIcon } from "src/assets/icons/arrow-down.svg";
import { IOptionSelect, SetOptionSelect } from "src/@types/form";
import { Dropdown } from "../Dropdown";
import { SortOption } from "./SortOption";

interface Props {
  className?: string;
  options: IOptionSelect[];
  activeOption: IOptionSelect;
  setOption: SetOptionSelect;
  headLabelclassName?: string;
  headLabel?: string;
}

export const SelectDropdownList: FC<Props> = ({
  className,
  options,
  activeOption,
  setOption,
  headLabelclassName,
  headLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const headDropdownLabel = (
    <div
      className={cn(
        "flex items-center gap-4 rounded-xl border border-gray-soft bg-white-base px-3.5 py-2 text-xs",
        headLabelclassName
      )}
    >
      <p className="flex gap-1">
        {headLabel && <span className="text-gray-medium">{headLabel}</span>}

        <span className="font-semibold text-black-ligth">
          {activeOption?.label}
        </span>
      </p>

      <ArrowBottomIcon
        className={cn("transition-all duration-200", {
          "rotate-180": isOpen,
        })}
      />
    </div>
  );

  const filteredOptions = activeOption
    ? options.filter(({ value }) => value !== activeOption.value)
    : options;

  const setActiveOption = (option: IOptionSelect) => {
    setOption(option);
    setIsOpen(false);
  };

  return (
    <Dropdown
      className={className}
      head={headDropdownLabel}
      bodyClassName="bg-white-base w-full top-10 z-10 rounded-xl"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <ul>
        {filteredOptions.map((option) => (
          <SortOption
            key={option.value}
            option={option}
            setOption={setActiveOption}
          />
        ))}
      </ul>
    </Dropdown>
  );
};
