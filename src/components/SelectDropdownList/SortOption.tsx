import React, { FC } from "react";
import { IOptionSelect, SetOptionSelect } from "src/@types/form";

interface Props {
  option: IOptionSelect;
  setOption: SetOptionSelect;
}

export const SortOption: FC<Props> = ({ option, setOption }) => {
  const onClick = () => setOption(option);

  return (
    <li
      className="cursor-pointer rounded-xl px-2 py-2 text-xs text-black-ligth hover:bg-gray-soft"
      onClick={onClick}
    >
      {option.label}
    </li>
  );
};
