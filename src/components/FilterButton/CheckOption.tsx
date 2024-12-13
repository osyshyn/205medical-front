import { FC } from "react";
import cn from "classnames";
import { useQueryParams } from "src/hooks/useQueryParams";
import { ReactComponent as CheckIcon } from "src/assets/icons/check.svg";
import { Button } from "../Button";

interface Props {
  isActive: boolean;
  value: string;
  queryKey: string;
}

export const CheckOption: FC<Props> = ({ isActive, value, queryKey }) => {
  const { addToQueryParamArray, removeFromQueryParamArray } = useQueryParams();

  const onClick = () => {
    if (isActive) {
      removeFromQueryParamArray(queryKey, value);
    } else {
      addToQueryParamArray(queryKey, value);
    }
  };

  return (
    <li className="flex items-center gap-3.5">
      <Button
        className={cn(
          "flex h-3.5 w-3.5 cursor-pointer items-center justify-center rounded-sm border",
          { "border-black-base": isActive }
        )}
        onClick={onClick}
      >
        {isActive && <CheckIcon className="pointer-events-none" />}
      </Button>

      <p className="cursor-pointer" onClick={onClick}>
        {value}
      </p>
    </li>
  );
};
