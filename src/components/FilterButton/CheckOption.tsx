import { FC } from "react";
import cn from "classnames";
import { useQueryParams } from "src/hooks/useQueryParams";
import { QUERY_PARAM_KEYS } from "src/constants/queryParams";
import { ReactComponent as CheckIcon } from "src/assets/icons/check.svg";
import { IOptionSelect } from "src/@types/form";
import { Button } from "../Button";

export const CheckOption: FC<IOptionSelect> = ({ label, value }) => {
  const { getQueryParam, addToQueryParamArray, removeFromQueryParamArray } =
    useQueryParams();

  const valueToString = value.toString();

  const activeCategories =
    getQueryParam(QUERY_PARAM_KEYS.CATEGORIES)?.split(",") || [];

  const isCheck = activeCategories.includes(valueToString);

  const onClick = () => {
    if (isCheck) {
      removeFromQueryParamArray(QUERY_PARAM_KEYS.CATEGORIES, valueToString);
    } else {
      addToQueryParamArray(QUERY_PARAM_KEYS.CATEGORIES, valueToString);
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
