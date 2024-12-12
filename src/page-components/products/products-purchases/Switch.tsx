import React, { FC, useState } from "react";
import cn from "classnames";

interface Props {
  onClick: VoidFunction;
}

export const Switch: FC<Props> = ({ onClick }) => {
  const [isSelected, setIsSelected] = useState(true);

  const handleClick = () => {
    setIsSelected(!isSelected);
    onClick();
  };

  const containerClass =
    "relative select-none flex h-max w-14 cursor-pointer rounded-full p-0.5 transition-all duration-300";
  const labelClass =
    "absolute top-1/2 -translate-y-1/2 text-xs transition-all duration-300";
  const indicatorClass =
    "relative h-5 w-5 rounded-full shadow-lg transition-all duration-300";
  const innerTextClass =
    "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs transition-all duration-300";

  return (
    <div
      onClick={handleClick}
      className={cn(containerClass, "bg-gray-regular", {
        "!bg-purple-base": isSelected,
      })}
    >
      <span
        className={cn(labelClass, "left-1 text-white-base", {
          "opacity-0": !isSelected,
        })}
      >
        QTY
      </span>

      <span
        className={cn(labelClass, "right-2 text-purple-base", {
          "opacity-0": isSelected,
        })}
      >
        $
      </span>

      <span
        className={cn(indicatorClass, "bg-white-base", {
          "ml-8": isSelected,
        })}
      >
        <span
          className={cn(innerTextClass, "text-purple-base", {
            "opacity-0": isSelected,
          })}
        >
          Q
        </span>

        <span
          className={cn(innerTextClass, "text-purple-base", {
            "opacity-0": !isSelected,
          })}
        >
          $
        </span>
      </span>
    </div>
  );
};
