import React, { FC } from "react";
import cn from "classnames";
import { ReactComponent as CloseIcon } from "src/assets/icons/close.svg";

interface Props {
  className?: string;
  isActiveDefaultHoverEffect?: boolean;
  onClose: VoidFunction;
}

export const CloseButton: FC<Props> = ({
  className,
  isActiveDefaultHoverEffect = true,
  onClose,
}) => (
  <button onClick={onClose}>
    <CloseIcon
      className={cn("visible h-full w-full opacity-50", {
        "group-hover:opacity-100": isActiveDefaultHoverEffect,
      })}
    />
  </button>
);
