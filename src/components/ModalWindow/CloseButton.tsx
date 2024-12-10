import React, { FC } from "react";
import cn from "classnames";
import { ReactComponent as CloseIcon } from "src/assets/icons/close-circle.svg";

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
  <button type="button" onClick={onClose}>
    <CloseIcon
      className={cn("visible opacity-50", className, {
        "group-hover:opacity-100": isActiveDefaultHoverEffect,
      })}
    />
  </button>
);
