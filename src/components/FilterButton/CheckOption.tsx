import { FC } from "react";
import cn from "classnames";
import { useQueryParams } from "src/hooks/useQueryParams";
import { QUERY_PARAM_KEYS } from "src/constants/queryParams";
import { ReactComponent as CheckIcon } from "src/assets/icons/check.svg";
import { Button } from "../Button";

interface Props {
  name: string;
}

export const CheckOption: FC<Props> = ({ name }) => {
  const { getQueryParam, addToQueryParamArray, removeFromQueryParamArray } =
    useQueryParams();

  const activeCategories = (getQueryParam(QUERY_PARAM_KEYS.CATEGORIES)?.split(
    ","
  ) || []) as string[];

  const isCheck = activeCategories.includes(name);

  const onClick = () => {
    if (isCheck) {
      removeFromQueryParamArray(QUERY_PARAM_KEYS.CATEGORIES, name);
    } else {
      addToQueryParamArray(QUERY_PARAM_KEYS.CATEGORIES, name);
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
        {name}
      </p>
    </li>
  );
};
