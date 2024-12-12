import { FC, useState } from "react";
import cn from "classnames";
import { ReactComponent as CheckIcon } from "src/assets/icons/check.svg";

interface Props {
  name: string;
}

export const CheckOption: FC<Props> = ({ name }) => {
  const [isCheck, setIsCheck] = useState(false);

  const onClick = () => {
    setIsCheck(!isCheck);
  };

  return (
    <li className="flex items-center gap-3.5">
      <div
        onClick={onClick}
        className={cn(
          "flex h-3.5 w-3.5 cursor-pointer items-center justify-center rounded-sm border",
          { "border-black-base": isCheck }
        )}
      >
        {isCheck && <CheckIcon />}
      </div>

      <p>{name}</p>
    </li>
  );
};
