import React, { FC } from "react";
import cn from "classnames";
import { ReactComponent as SearchIcon } from "src/assets/icons/search.svg";
import { TEXT_INPUT_STYLE_VARIANTS } from "../FormField/constants";

interface Props {
  className?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const Search: FC<Props> = ({ className, value, onChange }) => (
  <div className="relative">
    <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2" />
''''
    <input
      className={cn(TEXT_INPUT_STYLE_VARIANTS.primary, className, "pl-10")}
      placeholder="Search"
      value={value}
      onChange={onChange}
    />
  </div>
);
