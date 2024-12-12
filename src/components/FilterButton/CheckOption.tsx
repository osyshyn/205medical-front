import { FC, useState } from "react";
import cn from "classnames";
import { ReactComponent as CheckIcon } from "src/assets/icons/check.svg";
import { Button } from "../Button";

interface Props {
  name: string;
}

export const CheckOption: FC<Props> = ({ name }) => {
  const [isCheck, setIsCheck] = useState(true);

  const onClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsCheck(!isCheck);
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

      <p>{name}</p>
    </li>
  );
};
