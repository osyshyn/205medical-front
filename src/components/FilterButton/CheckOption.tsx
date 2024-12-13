import { FC } from "react";
import cn from "classnames";
import { useQueryParams } from "src/hooks/useQueryParams";
import { ReactComponent as CheckIcon } from "src/assets/icons/check.svg";
import { IOptionSelect } from "src/@types/form";
import { Button } from "../Button";

interface Props {
  queryKey: string;
  option: IOptionSelect;
}

export const CheckOption: FC<Props> = ({
  queryKey,
  option: { label, value },
}) => {
  const { getQueryParam, addToQueryParamArray, removeFromQueryParamArray } =
    useQueryParams();

  const valueToString = value.toString();

  const activeCategories = getQueryParam(queryKey)?.split(",") || [];

  const isCheck = activeCategories.includes(valueToString);

  const onClick = () => {
    if (isCheck) {
      removeFromQueryParamArray(queryKey, valueToString);
    } else {
      addToQueryParamArray(queryKey, valueToString);
    }
  };

  return (
    <li className="flex items-center gap-3.5">
      <Button
        className={cn(
          "flex h-3.5 w-3.5 cursor-pointer items-center justify-center rounded-sm border",
          { "border-black-base": isCheck }
        )}
        onClick={onClick}
      >
        {isCheck && <CheckIcon className="pointer-events-none" />}
      </Button>

      <p className="cursor-pointer" onClick={onClick}>
        {label}
      </p>
    </li>
  );
};
